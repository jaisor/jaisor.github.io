import type { TagId } from "./tags";
import warlockHero from "../assets/posts/3d-printed-warlock-death-tribute/hero.jpg";
import warlockDryfit from "../assets/posts/3d-printed-warlock-death-tribute/dryfit.jpg";
import warlockParts from "../assets/posts/3d-printed-warlock-death-tribute/parts.jpg";
import warlockFrets from "../assets/posts/3d-printed-warlock-death-tribute/frets.jpg";
import warlockPrimer from "../assets/posts/3d-printed-warlock-death-tribute/primer.jpg";
import warlockDetail from "../assets/posts/3d-printed-warlock-death-tribute/detail.jpg";
import warlockBack from "../assets/posts/3d-printed-warlock-death-tribute/back.jpg";
import warlockFinished from "../assets/posts/3d-printed-warlock-death-tribute/finished.jpg";
import warlockDryfitFull from "../assets/posts/3d-printed-warlock-death-tribute/dryfit-hires.jpg";
import warlockPartsFull from "../assets/posts/3d-printed-warlock-death-tribute/parts-hires.jpg";
import warlockFretsFull from "../assets/posts/3d-printed-warlock-death-tribute/frets-hires.jpg";
import warlockPrimerFull from "../assets/posts/3d-printed-warlock-death-tribute/primer-hires.jpg";
import warlockDetailFull from "../assets/posts/3d-printed-warlock-death-tribute/detail-hires.jpg";
import warlockBackFull from "../assets/posts/3d-printed-warlock-death-tribute/back-hires.jpg";
import warlockFinishedFull from "../assets/posts/3d-printed-warlock-death-tribute/finished-hires.jpg";
import xracerHero from "../assets/posts/building-an-x-racer/hero.jpg";
import xracerArms from "../assets/posts/building-an-x-racer/arms.jpg";
import xracerArmsFull from "../assets/posts/building-an-x-racer/arms-hires.jpg";
import xracerCage from "../assets/posts/building-an-x-racer/cage.jpg";
import xracerCageFull from "../assets/posts/building-an-x-racer/cage-hires.jpg";
import xracerStack from "../assets/posts/building-an-x-racer/stack.jpg";
import xracerStackFull from "../assets/posts/building-an-x-racer/stack-hires.jpg";
import xracerFinished from "../assets/posts/building-an-x-racer/finished.jpg";
import xracerFinishedFull from "../assets/posts/building-an-x-racer/finished-hires.jpg";
import xracerLow from "../assets/posts/building-an-x-racer/low.jpg";
import xracerLowFull from "../assets/posts/building-an-x-racer/low-hires.jpg";
import xracerHand from "../assets/posts/building-an-x-racer/hand.jpg";
import xracerHandFull from "../assets/posts/building-an-x-racer/hand-hires.jpg";

/**
 * A body block. A bare string is a paragraph — the common case — so
 * simple posts stay readable as a plain list of strings.
 *
 * Inline `backticks` render as inline code and [label](href) as a link
 * inside any text field. That is the only markup: everything else is
 * plain text that React escapes, so there is still no unescaped-HTML
 * surface anywhere on the site.
 *
 * An `image` block's `src` is an imported asset, same as `Post.image`,
 * so Vite fingerprints it. `alt` is required — write what the photo
 * shows; `caption` is the visible line under it. Add `full` (a second,
 * larger import) to make the photo open full-screen when clicked.
 */
export type Block =
  | string
  | { kind: "heading"; text: string }
  | { kind: "code"; label?: string; code: string }
  | { kind: "list"; items: string[] }
  | { kind: "note" | "warn"; label: string; text: string }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
      /** Hi-res version; when present the image opens in a Lightbox. */
      full?: string;
    }
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
   * `import hero from "../assets/posts/<slug>/hero.jpg"` — each post
   * keeps its photos in its own folder. Cards and post
   * pages fall back to a generated placeholder when this is absent.
   */
  image?: string;
  /** Body content. Bare strings are paragraphs; see `Block`. */
  body: Block[];
}

/**
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
    slug: "3d-printed-warlock-death-tribute",
    title: "A 3D-printed Warlock, splattered in blood",
    date: "2026-07-30",
    excerpt:
      "A B.C. Rich Warlock body printed in sections, bonded, filled and primed, then finished in House of Kolor candy red — a Death tribute built as a gift for my son's friend.",
    tags: ["guitars", "3d-printing"],
    image: warlockHero,
    body: [
      "My son has a friend who is a huge Death fan, and somewhere between \"I could probably print that\" and \"This will never work\", it turned into a full build.",
      "The body is [this B.C. Rich Warlock model](https://makerworld.com/en/models/701362-bc-rich-warlock-a1-mini-guitar-body-single-pickup#profileId-630884) from MakerWorld - single-pickup version. It comes split into sections to be printed separately depending on the available print volume. Everything else is off-the-shelf guitar parts: a bought neck, a double-locking tremolo, and tuners.",
      {
        kind: "image",
        src: warlockDryfit,
        full: warlockDryfitFull,
        alt: "The raw white printed guitar body on a workbench with the neck, bridge and a pickup dry-fitted in place.",
        caption:
          "Dry fit first. Insurance before glue and paint.",
      },
      { kind: "heading", text: "Printing and bonding" },
      "Printing a body in sections means the real work starts after the printer stops. I glued the pieces with J-B Weld Plastic Bonder, which is the part of the build with no undo button — the seams have to line up, because a guitar body out of alignment at the neck pocket is firewood. This one would not even qualify for that because it is made out of plastic.",
      "The honeycomb interior is part of the model, not a slicer setting, and it stays open by design. It keeps the body light and it looks deliberate once the paint is on.",
      {
        kind: "image",
        src: warlockParts,
        full: warlockPartsFull,
        alt: "Printed body sections laid out on a workbench, showing the open honeycomb interior, next to a can of J-B Weld Plastic Bonder, filler primer and a sanding block.",
        caption: "The whole supporting cast: bonder, filler primer, sanding block.",
      },
      { kind: "heading", text: "Making printed parts not look printed" },
      "This is the unglamorous majority of the project. Rustoleum filler primer, sand, look at it under a light, find every layer line you missed, primer again. Repeat until the surface is as a solid object instead a stack of extrusions.",
      {
        kind: "note",
        label: "What actually matters",
        text: "Nobody will ever notice the hours of sanding. They will notice the one layer line you left under a gloss coat.",
      },
      {
        kind: "image",
        src: warlockPrimer,
        full: warlockPrimerFull,
        alt: "The guitar body hanging in a spray booth, coated in gray filler primer, with the neck masked off.",
        caption: "Gray primer is the honest coat — it shows you everything you skipped.",
      },
      "The neck got a proper fretjob. As every fret was masked off individually, then leveled, crowned, rounded and polished. The fretboard was scrubbed with 0000 steel wool and conditioned with F-One oil.",
      {
        kind: "image",
        src: warlockFrets,
        full: warlockFretsFull,
        alt: "A guitar fretboard with blue and yellow masking tape applied between every fret, exposing only the fret wire.",
        caption: "Twenty-four frets, forty-eight pieces of tape, and a can of elbow grease.",
      },
      { kind: "heading", text: "The blood" },
      "White base coat, then Apple Red Kandy from House of Kolor for the blood. Candy is the right choice here as it stacks on itself. Every pass over the same spot goes deeper and darker, so a single color gives you thin arterial spray and thick pooling clots without ever mixing a second red. The Apple Red also happens to land almost exactly on the color of the real thing.",
      "There is no clever technique for the pattern. We loaded brushes and flicked and splattered the paint at the body by hand, which is enormously satisfying and completely uncontrollable. My garage woodshop looked like a murder scene by the end of it.",
      "Check out my attempts at making a [horror flick](https://www.youtube.com/shorts/S2uFrwL09KM) before cleaning up the mess.",
      {
        kind: "image",
        src: warlockDetail,
        full: warlockDetailFull,
        alt: "Close-up of the finished guitar body: white with heavy red splatter across the honeycomb cutouts, a white pickup and a black tremolo bridge.",
        caption:
          "The final result came together beautifully, paired with matching red knob, killswitch, and a Death logo sticker.",
      },
      { kind: "heading", text: "The pickup" },
      "The last piece was the one that makes it a Death guitar. We splurged on a white DiMarzio X2N — the same pickup the late Chuck Schuldiner, Death's guitarist and vocalist, ran in his iconic B.C. Rich.",
      "The result was exactly what we were aiming for. The build was fun and creative, pushing me into a new area of guitar making and dealing with a 3D printed plastic body.",
      {
        kind: "image",
        src: warlockBack,
        full: warlockBackFull,
        alt: "The back of the finished guitar, showing splatter running the full length of the neck and the Death logo on the lower body.",
        caption: "The splatter carries over the back and up the neck.",
      },
      {
        kind: "image",
        src: warlockFinished,
        full: warlockFinishedFull,
        alt: "The finished guitar standing on a stand: white blood-splattered Warlock body, skull-and-crossbones fret markers and black hardware.",
        caption: "Delivered.",
      },
    ],
  },
  {
    slug: "building-an-x-racer",
    title: "Building an X racer",
    date: "2016-03-19",
    excerpt:
      "Build #6, and the first proper racer — a SpaceOne Formula One 220 X with EMAX 2205s, packed into a cage with no room to spare. 411 grams, and one flight controller that had to go.",
    tags: ["fpv-drones"],
    image: xracerHero,
    body: [
      "At this point I was turning out roughly one build a month. For number six I wanted a proper racer, built on the X frames everyone had started shouting about.",
      {
        kind: "table",
        caption: "The parts list.",
        head: ["Part", "What went in"],
        rows: [
          ["Frame", "SpaceOne FPV Formula One 220 X Edition"],
          ["Motors", "EMAX RS2205 2600KV"],
          ["ESCs", "DYS XM30A — BLHeli, Oneshot125, damped light"],
          ["FC", "SP Racing F3 Mini, Betaflight 2.5.3"],
          ["PDB", "Birdseye Mini, no step-down"],
          ["Radio", "FrSky X4R-SB (SBUS)"],
          ["VTX", "Cricket 600mW"],
          ["Camera", "Pyro Drone 1/3\" Sony Super HAD II CCD, 650 TVL, 2.1mm"],
        ],
      },
      {
        kind: "image",
        src: xracerArms,
        full: xracerArmsFull,
        alt: "The half-built quad on a green cutting mat, arms fitted with black DYS BLHeli 30A ESCs and EMAX RS2205 motors, wiring loom loose, tools scattered around.",
        caption: "Arms and ESCs on, wiring still loose.",
      },
      { kind: "heading", text: "Assembly" },
      "The frame is a uni-body with a 4.5mm bottom plate, which should make it close to indestructible. The arms finish in wide motor pads with real protection, even for 22xx motors.",
      "The cage, on the other hand, is small. The rear is slightly wider, which raises hopes it does not deliver on — there is barely enough room for the PDB, FC and radio gear, and the Cricket VTX ended up poking out the back.",
      "There is around 70mm of usable arm space, which was just right for the rather long XM30A ESCs with their capacitors. Anything of that size or smaller will mount without a fight.",
      {
        kind: "image",
        src: xracerCage,
        full: xracerCageFull,
        alt: "Side-on view at bench level showing the tightly packed frame cage, the flight controller stack between the plates and wiring threaded around it.",
        caption: "\"Room to spare\" was not the phrase.",
      },
      "There is nothing mini about the SP Racing F3 Mini. It is the standard 36x36mm, a little longer with the LED strip at the back, and it carries:",
      {
        kind: "list",
        items: [
          "direct LiPo voltage input",
          "a built-in 5V 1A regulator",
          "a lap timer transponder",
          "an SD card slot for blackbox logging",
          "three UARTs",
        ],
      },
      "I ran the FC's own 5V regulator and skipped the PDB's step-down entirely, which cut the wiring between the two down to a single cable. Space was tight enough that I soldered directly onto the flight controller — a first for me — while still keeping at least one end of every cable on a connector, so nothing was permanently married to anything else.",
      {
        kind: "image",
        src: xracerStack,
        full: xracerStackFull,
        alt: "Another bench-level view of the frame cage from the front, showing the flight controller's USB port and LED between the carbon plates.",
        caption: "One cable from the PDB, and everything else soldered in place.",
      },
      "Final weight, with props and antenna but no battery: 411 grams.",
      {
        kind: "note",
        label: "Update, 3/27",
        text: "Flight controller swap. There were gyro spikes in yaw during flight — audible, and enough to make the quad jerk slightly. After some debugging it turned out to be the Mini. I put a regular SP Racing F3 in its place, running Betaflight 2.1.6. A shame, because I was starting to like how much the Mini packed in.",
      },
      { kind: "heading", text: "Glamour shots" },
      {
        kind: "image",
        src: xracerFinished,
        full: xracerFinishedFull,
        alt: "The finished quad on a wooden table, front three-quarter view, with the FPV camera visible in the carbon cage and a battery strap over the top plate.",
        caption: "Finished, and lighter than it looks.",
      },
      {
        kind: "image",
        src: xracerLow,
        full: xracerLowFull,
        alt: "Low side-on view of the finished quad on a wooden table, showing the EMAX motors with red bells, the ESCs taped to the arms and the video antenna curving up over the back.",
        caption: "The VTX antenna had to live out the back.",
      },
      {
        kind: "image",
        src: xracerHand,
        full: xracerHandFull,
        alt: "The quad held up in one hand outdoors in bright sun, with a blue cloverleaf video antenna, garden and trees blurred behind.",
        caption: "Out for the maiden flight.",
      },
      "The yard maiden went well. She felt fast, and a bit twitchy on Betaflight 2.5.3. Tuning and proper test flights next.",
      "Cross-posted to the [IntoFPV forum](https://intofpv.com/t-building-an-x-racer).",
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
