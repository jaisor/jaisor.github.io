#!/usr/bin/env bash
# Runs rsync entirely inside WSL so SSH prompts (key passphrase, password,
# host-key confirmation) go to a real controlling terminal instead of
# hanging on a pipe. See deploy.ps1 for why.
set -euo pipefail

dist_source="$1"      # WSL path to dist/, trailing slash
ssh_source_dir="$2"   # WSL path to the Windows user's .ssh dir (read-only source)
remote_target="$3"    # e.g. user@host:dist/
private_key_source="$4" # WSL path to the private key to authenticate with

# /mnt/c is DrvFs: it can't hold real Unix permission bits, so OpenSSH's
# private-key permission check will reject keys read straight from there.
# Copy into a native (ext4) temp dir, fix permissions there, and clean up
# on exit no matter how the script ends.
tmphome="$(mktemp -d)"
trap 'rm -rf "$tmphome"' EXIT

mkdir -p "$tmphome/.ssh"
cp -a "$ssh_source_dir"/. "$tmphome/.ssh/"
# Copy the requested key in explicitly too, in case it isn't a
# conventionally-named default (ssh's automatic identity discovery only
# tries id_rsa/id_ecdsa/id_ed25519/etc., and config-file tilde expansion
# for IdentityFile resolves against the real system home directory, not
# an overridden $HOME, so relying on either one silently picks the wrong
# key or none at all).
cp -a "$private_key_source" "$tmphome/.ssh/"
chmod -R go-rwx "$tmphome/.ssh"
find "$tmphome/.ssh" -type f -name '*.pub' -exec chmod go+r {} \;

identity_path="$tmphome/.ssh/$(basename "$private_key_source")"

# Keep known_hosts pointed at the real Windows file so a host key trusted
# once (or already trusted) doesn't need re-confirming on every deploy.
# IdentitiesOnly restricts auth to exactly the key we specified, rather
# than also offering whatever default-named keys happen to be present.
ssh_opts=(-i "$identity_path" -o IdentitiesOnly=yes -o "UserKnownHostsFile=$ssh_source_dir/known_hosts")

# This target is served live straight out of the synced directory (no
# build/release staging on the remote end), so a single rsync pass is not
# safe: rsync gives no ordering guarantee between overwriting an HTML
# entry file and finishing the upload of the content-hashed JS/CSS assets
# it references, nor between deleting an orphaned old asset and finishing
# the new HTML that stops referencing it. A visitor hitting the site
# mid-sync can land on a brand-new index.html whose bundle hasn't
# arrived yet (or was just deleted), get Apache's text/html 404 for it,
# and the browser rejects it with "Expected a JavaScript-or-Wasm module
# script but the server responded with a MIME type of text/html".
#
# Fix: push every non-HTML file first, with no deletion -- so every
# asset a new HTML page could reference is already in place -- then push
# everything (HTML included) with --delete last, so no HTML file goes
# live before its assets exist, and stale assets are only removed once
# nothing new needs them.
HOME="$tmphome" rsync -avz --exclude='*.html' \
    -e "ssh ${ssh_opts[*]}" \
    "$dist_source" "$remote_target"

HOME="$tmphome" rsync -avz --delete \
    -e "ssh ${ssh_opts[*]}" \
    "$dist_source" "$remote_target"
