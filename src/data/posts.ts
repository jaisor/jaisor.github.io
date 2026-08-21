import type { TagId } from "./tags";

/**
 * A body block. A bare string is a paragraph — the common case — so
 * simple posts stay readable as a plain list of strings.
 *
 * Inline `backticks` inside any text field render as inline code. That
 * is the only markup: everything is plain text that React escapes, so
 * there is still no unescaped-HTML surface anywhere on the site.
 */
export type Block =
  | string
  | { kind: "heading"; text: string }
  | { kind: "code"; label?: string; code: string }
  | { kind: "list"; items: string[] }
  | { kind: "note" | "warn"; label: string; text: string }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | { kind: "table"; caption?: string; head: string[]; rows: string[][] };

export interface Post {
  /** URL segment. The dedicated page is served at /posts/<slug>/. */
  slug: string;
  title: string;
  /** ISO date, used for sorting and rendered via toLocaleDateString. */
  date: string;
  /** One or two sentences. Shown on the card and as the page's lede. */
  excerpt: string;
  tags: TagId[];
  /**
   * Main photo. Import the asset so Vite fingerprints it, e.g.
   * `import hero from "../assets/posts/my-post.jpg"`. Cards and post
   * pages fall back to a generated placeholder when this is absent.
   */
  image?: string;
  /** Body content. Bare strings are paragraphs; see `Block`. */
  body: Block[];
}

/**
 * Every entry below is placeholder content, one per tag, so the section
 * and the per-post pages have something to render. Replace the copy;
 * keep the shape.
 *
 * Adding a post takes two steps:
 *   1. append here with a unique `slug`
 *   2. create `posts/<slug>/index.html` (copy an existing one, update
 *      the title, description and data-slug)
 * Vite picks the new HTML file up as a build entry automatically.
 */
export const posts: Post[] = [
  {
    slug: "meshtastic-node-fleet-management-with-ai",
    title: "Meshtastic Node Fleet Management with AI",
    date: "2026-08-20",
    excerpt:
      "Running a multi-node Meshtastic mesh from one USB-connected admin radio and a Claude Code session that speaks meshtastic-python — discovery, remote admin, and fleet reporting from plain-language prompts.",
    tags: ["software-engineering"],
    body: [
      "One physical node does double duty as the fleet's administrator: it stays plugged into the machine running Claude Code over USB, and every other node has been told, once, to trust its public key. From then on, managing the fleet is a conversation — Claude turns plain requests into `meshtastic-python` calls, waits out the radio, and reports back.",
      "This isn't a GUI, and it isn't a bespoke script per task. It's a general-purpose radio operator that happens to read Python and remember what happened last session. Ask it to check for new nodes, confirm which ones actually grant it admin, pull a battery-and-firmware report, or rename a node, and it reaches for the same small set of primitives every time — `getNode().getMetadata()`, `setOwner()`, the cached `deviceMetrics` in the node database — instead of a new one-off tool per question.",
      "Two things shape every workflow below. First, trust is per-node and explicit: a node only accepts admin commands from a station whose public key is in its `security.admin_key` list, so the admin node's authority has to be granted, not assumed. Second, the serial port is exclusive: `meshtastic-python` locks the USB device for the duration of a session, so anything else already talking to the radio — commonly a background listener script — has to step aside first.",

      { kind: "heading", text: "Building the console" },
      "Five one-time steps turn a spare node and a terminal into a fleet console. The first three happen once per fleet; the last two are what you ask Claude to do the first time it meets the mesh.",
      {
        kind: "steps",
        items: [
          {
            title: "Provision the admin node",
            text: "Pick one node to be the management station and plug it into the machine that will run Claude Code — USB stays attached for the life of the setup. A quiet role fits well: `CLIENT_MUTE` keeps it off the airwaves except when it is actually administering something, so it doesn't add chatter to the channel it is meant to be managing.",
          },
          {
            title: "Stand up the Python environment",
            text: "A local virtualenv with the official client library is the whole dependency list.",
          },
          {
            title: "Authorize the admin node on every fleet member",
            text: "This is the one step that can't be delegated to a prompt, because it is the trust root everything else relies on. On each fleet node, add the admin node's public key under Security → Admin Key. Nodes on firmware older than 2.5 fall back to a shared admin channel instead of per-key trust — workable, but worth migrating away from, since anyone on that channel gets admin rights.",
          },
          {
            title: "Let Claude map the trust graph",
            text: "With the environment in place, the first real prompt is a discovery one: enumerate the fleet and probe which nodes actually honor the admin key you just configured.",
          },
          {
            title: "Give the session something to resume from",
            text: "A mesh fleet outlives any single chat. Have Claude keep a short context file in the project — which node is the admin station, which members currently trust it, what background processes hold the serial port, and a reminder that private keys and PSKs in any config file are secrets. Each new session reads that first instead of rediscovering the fleet from scratch.",
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
      "If a background listener is already watching the channel and logging what it hears, the fast answer lives in its log — no need to touch the serial port at all. Without one, Claude opens the interface directly and diffs `interface.nodes` (keyed by node ID, each entry carrying `user`, `lastHeard`, and `isFavorite`) against what the context file last recorded.",
      "Favoriting is the cheap way to mark a node known-good: `node.setFavorite(node_id)` needs no admin trust at all — it is a local bookkeeping flag on the admin node's own database, not a change pushed to the remote node.",

      { kind: "heading", text: "Verifying remote-admin trust" },
      "The cleanest yes/no signal is a device-metadata request. It requires an admin session to succeed but changes nothing on the far end.",
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
      "A response means the node's `admin_key` list includes this station, and you are looking at real firmware info. Silence — a raised `MeshInterfaceError` once the timeout elapses — or an explicit `PKI_SEND_FAIL_PUBLIC_KEY` both mean the same thing in practice: no admin trust yet, from this station.",
      {
        kind: "note",
        label: "Worth knowing",
        text: "A timeout today isn't a permanent verdict. LoRa admin handshakes are route-dependent, so a node that stays silent this round can answer cleanly the next time conditions or hop paths line up. Treat one failed probe as not-confirmed, not denied.",
      },

      { kind: "heading", text: "Pulling a fleet status report" },
      "Battery and uptime come for free — they ride in on regular `TELEMETRY_APP` broadcasts and sit cached in `deviceMetrics` for every node the admin station has ever heard, no admin session required. Firmware version is the one field that needs the metadata probe above, run once per node.",
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
          "Read it like a spec sheet, not a snapshot: a node at one minute of uptime just rebooted, and a battery figure hovering at 100% is normal telemetry rounding on a topped-off cell.",
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
        text: "An implicit ACK only means a hop relayed the packet, not that the target applied it. The local node database won't show the new name until the remote node's next NodeInfo broadcast, which runs on its own schedule — confirm a rename by re-querying a few minutes later, not by trusting the send.",
      },
      "The same shape — `getNode(id, False)`, one admin call, then `waitForAckNak()` — covers the rest of the admin surface: `reboot()`, `setFixedPosition()`, `factoryReset()`. Anything destructive deserves an explicit confirmation before Claude sends it. A rename is low-stakes enough to run on request; a factory reset is not.",

      { kind: "heading", text: "Coexisting with a background listener" },
      "A listener that watches a channel and reacts — auto-favoriting whoever posts on the primary channel is a common one — holds the serial connection open indefinitely, which means it holds the exclusive lock indefinitely too. Any admin probe has to ask it to stand down first.",
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
      "Framed as a prompt this is just asking it to pause the listener if it needs to — but it is worth being deliberate about, since stopping a running service is exactly the kind of action to confirm rather than assume the first time it comes up.",

      { kind: "heading", text: "Field notes" },
      "Small, specific things that will otherwise look like bugs.",
      {
        kind: "list",
        items: [
          "Admin handshakes are flaky, not binary. The same node can time out on one probe and answer cleanly thirty seconds later. It is a routing artifact of the mesh, not a trust state that flipped.",
          "Battery percentage can read past 100%. Firmware rounds voltage-to-percent curves loosely near a full charge; treat anything from 95–101% as topped off, not a sensor fault.",
          "A CLI default timeout is a batch-job problem. `meshtastic --device-metadata` waits up to 300 seconds per node by default. Fine for one node, painful across a fleet — drop `SerialInterface(timeout=…)` before looping.",
          "Config files carry secrets. A node's YAML export includes its LoRa private key and any WiFi PSK in plaintext. Treat exported configs the way you would treat an SSH key, not a settings file.",
        ],
      },
    ],
  },
  {
    slug: "esp32-climate-sensor",
    title: "A WiFi climate sensor that actually stays online",
    date: "2026-07-14",
    excerpt:
      "Placeholder post. What it took to get a battery-powered ESP32 reporting temperature and humidity for months at a time instead of days.",
    tags: ["electronics", "software-engineering"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
      "Add as many paragraphs as the post needs; the page layout handles the rest.",
    ],
  },
  {
    slug: "bambu-h2d-first-month",
    title: "First month with the Bambu H2D",
    date: "2026-06-02",
    excerpt:
      "Placeholder post. Moving from a heavily modded Ender 3 to a machine that mostly just works, and what I stopped having to think about.",
    tags: ["3d-printing"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
    ],
  },
  {
    slug: "fpv-build-log-shrieka-130",
    title: "Build log: Shrieka 130",
    date: "2026-04-28",
    excerpt:
      "Placeholder post. Frame, stack and motor choices for a small quad, and the bench numbers behind each of them.",
    tags: ["fpv-drones", "3d-printing"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
    ],
  },
  {
    slug: "parametric-cad-for-enclosures",
    title: "Parametric CAD is worth the learning curve",
    date: "2026-03-11",
    excerpt:
      "Placeholder post. Why I stopped modelling enclosures in Blender and moved the whole workflow to Autodesk Fusion.",
    tags: ["software-engineering", "3d-printing"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
    ],
  },
  {
    slug: "first-season-on-two-wheels",
    title: "First season on two wheels",
    date: "2026-02-19",
    excerpt:
      "Placeholder post. Notes from a beginner rider — the gear that mattered, the habits that stuck, and the maintenance I learned to do myself.",
    tags: ["motorcycles"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
    ],
  },
  {
    slug: "practising-with-a-metronome",
    title: "The metronome is not optional",
    date: "2026-01-23",
    excerpt:
      "Placeholder post. A few months of deliberate practice, and what finally made timing click.",
    tags: ["guitars"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
    ],
  },
];

/** Newest first. */
export const postsByDate = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const postBySlug = new Map(posts.map((p) => [p.slug, p]));

export function postHref(slug: string) {
  return `/posts/${slug}/`;
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
