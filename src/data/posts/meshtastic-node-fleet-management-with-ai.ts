import type { Post } from "./index";
import meshHero from "../../assets/posts/meshtastic-node-fleet-management-with-ai/hero.svg";
import meshArchitecture from "../../assets/posts/meshtastic-node-fleet-management-with-ai/architecture.svg";

const post: Post = {
  slug: "meshtastic-node-fleet-management-with-ai",
  title: "AI-managed Meshtastic Node Fleet",
  date: "2026-08-20",
  excerpt:
    "A single USB-connected admin node and an LLM session using meshtastic-python provide discovery, remote administration, and fleet status reporting for a multi-node Meshtastic mesh, driven by natural-language prompts.",
  tags: ["software-engineering"],
  image: meshHero,
  body: [
    { kind: "heading", text: "Problem" },
    "Remote administration provides reachability but not operational aggregation. Each administrative action requires a separate command specifying the port, destination node ID, and relevant flags. Failure modes are not surfaced explicitly: an omitted `--dest` flag reconfigures the local admin node instead of the target; an incorrect node ID causes the command to wait the full 300-second default timeout; an acknowledgment (ACK) confirms only that a packet was relayed, not that the change was applied. Firmware version, battery level, and uptime are queried per node and require manual aggregation across the fleet.",
    {
      kind: "code",
      label: "Shell · meshtastic CLI",
      code: [
        "meshtastic --port /dev/ttyACM0 --dest '!abcd1234' --device-metadata",
        "",
        "meshtastic --port /dev/ttyACM0 --dest '!abcd1234' \\",
        '  --set-owner "MyMesh - Parents" --set-owner-short mmpa \\',
        "  --set lora.hop_limit 5 --set device.rebroadcast_mode LOCAL_ONLY",
      ].join("\n"),
    },

    { kind: "heading", text: "Approach" },
    "One node is designated as the fleet administrator and connected over USB to a workstation. This node's public key is added to every other node's `security.admin_key` list. Claude Code translates natural-language prompts into `meshtastic-python` API calls or CLI invocations, using node IDs and flags stored in a project context file rather than entered manually, and aggregates the results into a report.",
    {
      kind: "image",
      src: meshArchitecture,
      alt: "Diagram: plain-language prompts go to Claude Code on a workstation, which expands them into meshtastic-python or CLI commands; the workstation is wired over USB to an admin node, which reaches three field nodes over LoRa. A dashed return path carries telemetry, ACKs and metadata back for a collated fleet report.",
      caption:
        "Natural-language prompts are translated into commands; telemetry and acknowledgments return over the same path.",
    },

    { kind: "heading", text: "Prerequisites" },
    "A dedicated admin node, a workstation with Python 3.11+ and `meshtastic-python`, and a Claude Code session. The admin node must be listed in every fleet member's `security.admin_key` list, or remote-admin requests from the admin node will not succeed.",

    { kind: "heading", text: "Building the console" },
    "Five steps establish the fleet console. The first three are one-time setup steps performed once per fleet. The last two are performed by Claude Code during initial fleet discovery.",
    {
      kind: "steps",
      items: [
        {
          title: "Provision the admin node",
          text: "Designate one node as the management station and connect it via USB to the workstation running Claude Code. The USB connection remains attached for the duration of the setup. Any `CLIENT`-class role works: admin capability comes from being listed in `security.admin_key`, not from the node's role. `CLIENT_MUTE` suits a node dedicated solely to administration, since it stays off the channel except when issuing a command; a node already doing other work — for example, bridging to an MQTT broker — can serve as the admin station under a plain `CLIENT` role with no reconfiguration needed.",
        },
        {
          title: "Stand up the Python environment",
          text: "The only dependency is a local virtual environment with the official `meshtastic` client library installed.",
        },
        {
          title: "Authorize the admin node on every fleet member",
          text: "This step establishes the trust root for all subsequent operations and cannot be delegated to Claude Code. On each fleet node, add the admin node's public key under Security → Admin Key. Firmware versions older than 2.5 use a shared admin channel instead of per-key trust; this is functional but grants admin rights to any node on that channel, and migration to per-key trust is recommended.",
        },
        {
          title: "Map the trust graph",
          text: "With the environment configured, the first prompt to Claude Code performs discovery: enumerate the fleet and determine which nodes accept the configured admin key.",
        },
        {
          title: "Record fleet state for session continuity",
          text: "A fleet's state persists beyond any single session. Claude Code maintains a context file recording the admin node's identity, the members that currently trust it, any background processes holding the serial port, and a note that private keys and PSKs in exported configs are sensitive. Subsequent sessions read this file first rather than rediscovering fleet state.",
        },
      ],
    },
    {
      kind: "code",
      label: "Shell",
      code: [
        "python3 -m venv .venv",
        "source .venv/bin/activate",
        "pip install meshtastic",
        "",
        "meshtastic --info   # confirms the USB node answers",
      ].join("\n"),
    },

    { kind: "heading", text: "Checking for new devices" },
    "If a background listener process is already monitoring the channel and logging received messages, the required information is available directly from its log, without accessing the serial port. Otherwise, Claude Code opens the interface directly and compares `interface.nodes` (keyed by node ID, each entry containing `user`, `lastHeard`, and `isFavorite`) against the state previously recorded in the context file.",
    "Favoriting a node marks it as known-good. `node.setFavorite(node_id)` requires no admin trust: it sets a local flag in the admin node's own database and does not modify the remote node.",

    { kind: "heading", text: "Verifying remote-admin trust" },
    "A device-metadata request provides an unambiguous trust signal. It requires an authorized admin session to succeed and does not modify state on the target node.",
    {
      kind: "code",
      label: "Python · meshtastic-python",
      code: [
        "iface = meshtastic.serial_interface.SerialInterface(PORT, timeout=30)",
        "iface._timeout.expireTimeout = 20      # don't wait the 300s default per node",
        "",
        "node = iface.getNode(target_id, False)",
        "node.getMetadata()                     # firmware_version, hw_model, hasPKC...",
      ].join("\n"),
    },
    "A successful response confirms that the target node's `admin_key` list includes this station and returns valid firmware metadata. A timeout (a `MeshInterfaceError` raised after the configured timeout elapses) or an explicit `PKI_SEND_FAIL_PUBLIC_KEY` response both indicate the same condition: this station is not yet trusted by the target node.",
    {
      kind: "note",
      label: "Reliability note",
      text: "A timeout is not a permanent result. LoRa admin handshakes depend on the current routing path; a node that fails to respond in one probe may respond successfully in a subsequent attempt under different routing conditions. A single failed probe should be interpreted as unconfirmed, not as a negative result.",
    },

    { kind: "heading", text: "Pulling a fleet status report" },
    "Battery level and uptime require no additional query: they are received via periodic `TELEMETRY_APP` broadcasts and cached in `deviceMetrics` for every node the admin station has received a broadcast from. No admin session is required for these fields. Firmware version requires the metadata probe described above, executed once per node.",
    {
      kind: "table",
      head: ["Node", "Name", "Firmware", "Voltage", "Batt.", "Uptime"],
      rows: [
        ["!<redacted>", "MyMesh – Home", "2.7.26.54e0d8d", "4.18V", "99%", "1d 3h 44m"],
        ["!<redacted>", "MyMesh – Muzi", "2.7.26.54e0d8d", "4.06V", "100%", "1h 36m"],
        ["!<redacted>", "MyMesh – Parents", "2.7.26.54e0d8d", "3.53V", "30%", "1m"],
        ["!<redacted>", "MyMesh – T114", "2.7.26.54e0d8d", "3.98V", "79%", "1d 2h 23m"],
      ],
      caption:
        "A node with one minute of uptime has recently rebooted. A battery reading at or near 100% reflects normal telemetry rounding for a fully charged cell, not a measurement error.",
    },

    { kind: "heading", text: "Renaming a node remotely" },
    {
      kind: "code",
      label: "Python · meshtastic-python",
      code: [
        "node = iface.getNode(target_id, False)",
        'node.setOwner(long_name="MyMesh - Jordan", short_name="mmjo")',
        "iface.waitForAckNak()",
      ].join("\n"),
    },
    {
      kind: "warn",
      label: "Caveat",
      text: "An acknowledgment (ACK) confirms that a hop relayed the packet; it does not confirm that the target node applied the change. The local node database will not reflect the new name until the remote node's next NodeInfo broadcast, which occurs on its own schedule. Confirm a rename by re-querying after a delay rather than relying on the ACK.",
    },
    "The same pattern (`getNode(id, False)`, an admin call, then `waitForAckNak()`) applies to the remaining admin operations: `reboot()`, `setFixedPosition()`, `factoryReset()`. Destructive operations require explicit confirmation before execution. A rename can be executed directly on request; a factory reset requires confirmation.",

    { kind: "heading", text: "Coexisting with a background listener" },
    "A listener process that monitors a channel and reacts to messages (for example, automatically favoriting nodes that post on the primary channel) holds the serial connection open indefinitely, and with it the exclusive lock on the port. An admin probe requires the listener to release the port first.",
    {
      kind: "code",
      label: "Shell",
      code: [
        "PID=$(pgrep -f listener_script.py)",
        'kill "$PID"                      # releases the flock on /dev/ttyACM0',
        "",
        "python3 admin_probe.py           # do the actual work",
        "",
        "nohup python3 listener_script.py >> listener.log 2>&1 &",
        "disown                           # back to watching the channel",
      ].join("\n"),
    },
    "This sequence can be expressed as a single prompt instructing Claude Code to pause the listener if necessary. Stopping a running service is a destructive-adjacent action and should require explicit confirmation rather than being executed automatically.",

    { kind: "heading", text: "Field notes" },
    "Observations that otherwise present as defects.",
    {
      kind: "list",
      items: [
        "Admin handshake success is probabilistic, not binary. The same node can time out on one probe and respond successfully thirty seconds later. This is a routing artifact of the mesh, not a change in trust state.",
        "Reported battery percentage can exceed 100%. Firmware applies an approximate voltage-to-percentage curve near full charge; values from 95–101% indicate a fully charged cell, not a measurement fault.",
        "The CLI default timeout does not scale to batch operations. `meshtastic --device-metadata` waits up to 300 seconds per node by default. This is acceptable for a single node but impractical across a fleet; set `SerialInterface(timeout=...)` before iterating over multiple nodes.",
        "Exported configuration files contain secrets. A node's YAML export includes its LoRa private key and any WiFi PSK in plaintext. Exported configs require the same handling as private key material, not as ordinary settings files.",
      ],
    },
  ],
};

export default post;
