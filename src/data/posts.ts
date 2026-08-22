import type { TagId } from "./tags";
import meshHero from "../assets/posts/meshtastic-node-fleet-management-with-ai/hero.svg";
import meshArchitecture from "../assets/posts/meshtastic-node-fleet-management-with-ai/architecture.svg";
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
import standHero from "../assets/posts/over-engineered-headphone-stand/hero.jpg";
import standInUse from "../assets/posts/over-engineered-headphone-stand/in-use.jpg";
import standInUseFull from "../assets/posts/over-engineered-headphone-stand/in-use-hires.jpg";
import standWebUi from "../assets/posts/over-engineered-headphone-stand/webui.png";
import standElectronics from "../assets/posts/over-engineered-headphone-stand/electronics.jpg";
import standElectronicsFull from "../assets/posts/over-engineered-headphone-stand/electronics-hires.jpg";
import standFirstLight from "../assets/posts/over-engineered-headphone-stand/first-light.jpg";
import standFirstLightFull from "../assets/posts/over-engineered-headphone-stand/first-light-hires.jpg";
import standAssembled from "../assets/posts/over-engineered-headphone-stand/assembled.jpg";
import standAssembledFull from "../assets/posts/over-engineered-headphone-stand/assembled-hires.jpg";
import standMagnets from "../assets/posts/over-engineered-headphone-stand/magnets.jpg";
import standMagnetsFull from "../assets/posts/over-engineered-headphone-stand/magnets-hires.jpg";
import standFinished from "../assets/posts/over-engineered-headphone-stand/finished.jpg";
import standFinishedFull from "../assets/posts/over-engineered-headphone-stand/finished-hires.jpg";
import mqttDashboards from "../assets/posts/mqtt-to-grafana-dashboards/dashboards.jpg";
import mqttDashboardsFull from "../assets/posts/mqtt-to-grafana-dashboards/dashboards-hires.jpg";

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
        label: "Shell \u00b7 meshtastic CLI",
        code: [
          "meshtastic --port /dev/ttyACM0 --dest '!a1b2c3d4' --device-metadata",
          "",
          "meshtastic --port /dev/ttyACM0 --dest '!a1b2c3d4' \\",
          '  --set-owner "MyMesh - Parents" --set-owner-short mmpa \\',
          "  --set lora.hop_limit 5 --set device.rebroadcast_mode LOCAL_ONLY",
        ].join("\n"),
      },

      { kind: "heading", text: "Approach" },
      "One node is designated as the fleet administrator, configured in `CLIENT_MUTE` role and connected over USB to a workstation. This node's public key is added to every other node's `security.admin_key` list. Claude Code translates natural-language prompts into `meshtastic-python` API calls or CLI invocations, using node IDs and flags stored in a project context file rather than entered manually, and aggregates the results into a report.",
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
            text: "Designate one node as the management station and connect it via USB to the workstation running Claude Code. The USB connection remains attached for the duration of the setup. `CLIENT_MUTE` role is recommended: the node transmits only when performing an administrative action, avoiding additional traffic on the channel it manages.",
          },
          {
            title: "Stand up the Python environment",
            text: "The only dependency is a local virtual environment with the official `meshtastic` client library installed.",
          },
          {
            title: "Authorize the admin node on every fleet member",
            text: "This step establishes the trust root for all subsequent operations and cannot be delegated to Claude Code. On each fleet node, add the admin node's public key under Security \u2192 Admin Key. Firmware versions older than 2.5 use a shared admin channel instead of per-key trust; this is functional but grants admin rights to any node on that channel, and migration to per-key trust is recommended.",
          },
          {
            title: "Map the trust graph",
            text: "With the environment configured, the first prompt to Claude Code performs discovery: enumerate the fleet and determine which nodes accept the configured admin key.",
          },
          {
            title: "Record fleet state for session continuity",
            text: "A fleet's state persists beyond any single session. Claude Code maintains a context file recording the admin node identity, which members currently trust it, any background processes holding the serial port, and a note that private keys and PSKs in exported configs are sensitive. Subsequent sessions read this file first rather than rediscovering fleet state.",
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
        label: "Python \u00b7 meshtastic-python",
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
          ["!<redacted>", "MyMesh \u2013 Home", "2.7.26.54e0d8d", "4.18V", "99%", "1d 3h 44m"],
          ["!<redacted>", "MyMesh \u2013 Muzi", "2.7.26.54e0d8d", "4.06V", "100%", "1h 36m"],
          ["!<redacted>", "MyMesh \u2013 Parents", "2.7.26.54e0d8d", "3.53V", "30%", "1m"],
          ["!<redacted>", "MyMesh \u2013 T114", "2.7.26.54e0d8d", "3.98V", "79%", "1d 2h 23m"],
        ],
        caption:
          "A node with one minute of uptime has recently rebooted. A battery reading at or near 100% reflects normal telemetry rounding for a fully charged cell, not a measurement error.",
      },

      { kind: "heading", text: "Renaming a node remotely" },
      {
        kind: "code",
        label: "Python \u00b7 meshtastic-python",
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
          "Reported battery percentage can exceed 100%. Firmware applies an approximate voltage-to-percentage curve near full charge; values from 95\u2013101% indicate a fully charged cell, not a measurement fault.",
          "The CLI default timeout does not scale to batch operations. `meshtastic --device-metadata` waits up to 300 seconds per node by default. This is acceptable for a single node but impractical across a fleet; set `SerialInterface(timeout=...)` before iterating over multiple nodes.",
          "Exported configuration files contain secrets. A node's YAML export includes its LoRa private key and any WiFi PSK in plaintext. Exported configs require the same handling as private key material, not as ordinary settings files.",
        ],
      },
    ],
  },
  {
    slug: "mqtt-to-grafana-dashboards",
    title: "From MQTT messages to Grafana dashboards",
    date: "2026-08-22",
    excerpt:
      "A four-container Docker stack that stores and visualizes MQTT metrics using Prometheus and Grafana, including alerting, at no licensing cost.",
    tags: ["software-engineering"],
    body: [
      { kind: "heading", text: "Problem" },
      "Many IoT devices publish metrics over MQTT. A typical device wakes on a timer, publishes a JSON payload, and returns to sleep. Extracting the data is straightforward. Visualizing it effectively is not.",
      "My goal is a self-hosted visualization system with no recurring cost and no external service dependency. Prometheus and Grafana satisfy this. Both are open source, run on modest hardware, and support alerting in addition to graphing: a threshold breach can trigger a notification rather than requiring manual inspection of a chart.",
      "Prometheus uses a pull model: it scrapes an HTTP endpoint at a fixed interval. MQTT uses a push model: devices publish to a broker, which exposes no HTTP endpoint. A bridge component is required to subscribe to MQTT topics, retain the last value of each field, and expose the result at `/metrics`.",
      { kind: "heading", text: "Approach" },
      "The system consists of four containers running on a single Linux host on the local network. Each container runs with `--restart unless-stopped` and persists state to a mounted volume. This configuration restores the full stack after a host reboot without manual intervention.",
      {
        kind: "table",
        caption: "Container roles and published ports. Port numbers are configurable; the values below are used in this deployment.",
        head: ["Service", "Image", "Port", "Role"],
        rows: [
          ["Broker", "eclipse-mosquitto", "1883", "receives MQTT messages from publishing devices"],
          ["Exporter", "jaisor/mqtt-json-prometheus-exporter", "9324", "subscribes to MQTT topics, parses JSON, exposes metrics via HTTP"],
          ["Prometheus", "prom/prometheus", "9090", "scrapes the exporter's endpoint, stores time-series data"],
          ["Grafana", "grafana/grafana", "3000", "queries Prometheus, renders dashboards"],
        ],
      },
      {
        kind: "note",
        label: "Scope",
        text: "This configuration targets a local network deployment: a desktop, a Raspberry Pi, or a home server. No TLS or authentication is configured. Any component exposed to the public internet requires additional security configuration not covered here.",
      },
      { kind: "heading", text: "Broker" },
      "Eclipse Mosquitto is a lightweight, open-source MQTT broker. It implements the full MQTT protocol with a minimal resource footprint, making it suitable for both embedded devices and server deployments.",
      {
        kind: "code",
        label: "mosquitto",
        code: `docker run -dit --name mosquitto --restart unless-stopped \\
  -p 1883:1883 \\
  -v "$VAR_PATH/mosquitto:/mosquitto" \\
  eclipse-mosquitto:latest`,
      },
      { kind: "heading", text: "Bridge" },
      "The [mqtt-json-prometheus-exporter](https://github.com/jaisor/mqtt-json-prometheus-exporter) I wrote, is lightweight yet flexible. It subscribes to a configured list of MQTT topic patterns, parses each payload, and exposes numeric fields as Prometheus gauges. Configuration is defined in a single mounted `config.yaml` file.",
      {
        kind: "code",
        label: "exporter",
        code: `docker run -dit --name mqtt-json-prometheus-exporter --restart unless-stopped \\
  -v "$VAR_PATH/mqtt_json:/config" -p 9324:8080 \\
  jaisor/mqtt-json-prometheus-exporter:latest`,
      },
      "The container listens on port 8080 internally. `CONFIG_PATH`, `LOG_LEVEL`, and `PORT` are configurable via environment variables.",
      { kind: "heading", text: "Metric mapping" },
      "Each configured pattern defines an MQTT topic subscription and a set of parsing rules. The `+` wildcard matches a single topic level. A named wildcard segment, such as `+device`, is added as a label on every metric derived from that topic.",
      {
        kind: "code",
        label: "config.yaml: basic pattern",
        code: `mqtt:
  url: mqtt://server.lan:1883
global:
  prefix: mqtt_exporter_    # prepended to every metric
  labels:                   # attached to every metric
    app: mqtt-json-prometheus-exporter
patterns:
  - pattern: home/+device/json
    format: json            # the default; 'val' for a bare scalar
    labels:
      location: home`,
      },
      "For payload `{\"temp\": 22.5, \"battery\": 3.9}` on topic `home/pool/json`, the exporter produces metrics `mqtt_exporter_temp` and `mqtt_exporter_battery`, each labeled `device=\"pool\"`, `location=\"home\"`, and the global `app` label.",
      { kind: "heading", text: "Scalar payloads and value maps" },
      "Not all topics carry JSON. If the payload is a scalar variable, `format: val` can be used to extract the value. If the value is not numeric, `value-map` converts string values to the numeric values Prometheus requires.",
      {
        kind: "code",
        label: "availability from an LWT topic",
        code: `  - pattern: tele/+device/LWT
    prefix: tms_
    format: val
    value-default: 0        # anything not in the map
    value-map:
      Online: 1`,
      },
      "`value-default` specifies the value assigned when the payload matches no key in `value-map`. In this configuration, `Offline` or any unmapped string is assigned 0 rather than causing the sample to be dropped. `value-map` applies equally to string fields inside a JSON payload:",
      {
        kind: "code",
        label: "mapping a string field",
        code: `  - pattern: home/+device/status
    format: json
    value-map:
      active: 1
      inactive: 0`,
      },
      { kind: "heading", text: "Nested payloads" },
      "Some devices, including those running Tasmota firmware, publish nested JSON objects. `recursive: Yes` traverses nested objects and flattens the field path into the metric name:",
      {
        kind: "code",
        label: "recursive parsing",
        code: `  - pattern: tele/+device/SENSOR
    prefix: tm_
    recursive: Yes`,
      },
      { kind: "heading", text: "Label fields" },
      "Some payload fields identify the data source rather than represent a measurement (for example, a sensor ID). Exporting such a field as a metric produces a low-value gauge; exporting it as a label enables grouping and filtering. `label-fields` reassigns specified fields from metrics to labels.",
      {
        kind: "code",
        label: "flat label-fields",
        code: `  - pattern: home/+device/json
    label-fields: [sensor_id, room]`,
      },
      "For payload `{\"temp\": 22.5, \"humidity\": 60, \"sensor_id\": \"abc\", \"room\": \"kitchen\"}`, the remaining fields are exported as metrics, each carrying both labels:",
      {
        kind: "code",
        code: `mqtt_exporter_temp{device="...", sensor_id="abc", room="kitchen"} 22.5
mqtt_exporter_humidity{device="...", sensor_id="abc", room="kitchen"} 60`,
      },
      "For nested fields, the path is specified using arrow (`\u2192`) notation. The resulting label name is the full path with segments joined by underscores:",
      {
        kind: "code",
        label: "nested label-fields",
        code: `  - pattern: tele/+device/SENSOR
    recursive: Yes
    label-fields:
      - telemetry\u2192sender`,
      },
      {
        kind: "code",
        code: `tm_temp{device="...", telemetry_sender="device_01"} 22.5
tm_telemetry_rssi{device="...", telemetry_sender="device_01"} -45`,
      },
      "The two forms differ in scope:",
      {
        kind: "list",
        items: [
          "A flat entry propagates into nested objects when `recursive: Yes` is set; the label is applied to metrics at every level.",
          "An arrow-notation path extracts only from the specified path; sibling fields are unaffected.",
        ],
      },
      "`value-map` also applies to label values. With `label-fields: [mode]` and a value map containing `active: 1`, payload `{\"mode\": \"active\"}` produces label `mode=\"1\"`.",
      { kind: "heading", text: "Prometheus" },
      {
        kind: "code",
        label: "config.yml",
        code: `scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 30s
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'mqtt_json'
    scrape_interval: 30s
    static_configs:
      - targets: ['server.lan:9324']`,
      },
      {
        kind: "code",
        code: `docker run -dit --name prometheus --restart unless-stopped -p 9090:9090 \\
  -v "$VAR_PATH/prometheus:/data" \\
  prom/prometheus:latest \\
  --config.file="/data/config.yml" \\
  --storage.tsdb.path="/data/prometheus"`,
      },
      {
        kind: "warn",
        label: "Scrape interval is not sample interval",
        text: "The exporter returns the last received value on every scrape request. A device publishing at 15-minute intervals, scraped every 30 seconds, produces approximately 30 identical samples per publication. This does not affect gauge display but invalidates rate() calculations over the affected series.",
      },
      { kind: "heading", text: "Grafana" },
      {
        kind: "code",
        code: `docker run -dit --name grafana --restart unless-stopped -p 3000:3000 \\
  -v "$VAR_PATH/grafana:/var/lib/grafana" \\
  grafana/grafana:latest`,
      },
      "Configure Prometheus as a Grafana data source at `http://server.lan:9090`. Metrics are then queryable by name and filterable by the labels defined in the exporter configuration.",
      { kind: "heading", text: "Conclusion" },
      "The resulting stack requires no manual intervention after initial deployment and persists across host reboots. Devices publish independently; the exporter maintains current values; Prometheus accumulates historical data; Grafana provides query and visualization.",
      {
        kind: "image",
        src: mqttDashboards,
        full: mqttDashboardsFull,
        alt: "Four Grafana dashboards: per-room HVAC control with gauges and time series, indoor and outdoor temperature and humidity, solar charging and battery status, and Meshtastic node telemetry.",
        caption:
          "The same pattern applied to different data: HVAC control, climate sensors, solar and battery, and mesh-radio telemetry.",
      },
      {
        kind: "steps",
        items: [
          {
            title: "Process metrics share the global prefix",
            text: "The exporter publishes Node.js process metrics (heap, CPU, event loop) under the same global prefix as MQTT-derived metrics. This is useful for monitoring the exporter itself but increases the number of series returned by metric-name queries.",
          },
          {
            title: "Metric names are derived from JSON field names",
            text: "Renaming a field in device firmware creates a new metric series rather than continuing the existing one.",
          },
        ],
      },
      "The complete configuration reference is available in the [exporter repository](https://github.com/jaisor/mqtt-json-prometheus-exporter).",
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
    slug: "over-engineered-headphone-stand",
    title: "An over-engineered headphone stand",
    date: "2026-02-16",
    excerpt:
      "I wanted a headphone stand. I also wanted a better wireless charger. And I will take any excuse to add addressable LEDs to something \u2014 so all three became one object, with an ESP32-C3 and a web UI.",
    tags: ["3d-printing", "electronics"],
    image: standHero,
    body: [
      "I have a weakness for neon lighting, and an ongoing habit of putting addressable LEDs on things that did not ask for them. I also genuinely needed two boring objects: somewhere to hang my headphones, and a wireless charger with more power than the one I had.",
      "Rather than buy two things, I designed one. The name is not ironic \u2014 it really is over-engineered, and that was the point.",
      { kind: "heading", text: "What it ended up doing" },
      {
        kind: "list",
        items: [
          "holds a pair of over-ear headphones",
          "charges a phone wirelessly, with MagSafe magnets in the pad",
          "lights up with 103 addressable LEDs across four separate segments",
          "runs a web UI for modes, brightness and scheduling",
          "tells the time",
        ],
      },
      { kind: "heading", text: "The electronics" },
      "An ESP32-C3 drives everything. The LEDs are WS2812B, split into a bottom ring, a wall ring, the vertical arm and the top arm \u2014 the firmware treats them as four segments of one virtual strip, so an animation runs across the whole object instead of restarting at each piece. FastLED does the heavy lifting.",
      {
        kind: "table",
        caption: "The parts that matter.",
        head: ["Part", "What it is"],
        rows: [
          ["Controller", "ESP32-C3 with a small onboard OLED"],
          ["LEDs", "WS2812B strip plus a ring, 103 total"],
          ["Charging", "Qi wireless module with MagSafe magnets"],
          ["Power", "5V step-down, one input for the whole thing"],
          ["Printed", "Base, arms and a base cover, in PLA"],
        ],
      },
      {
        kind: "image",
        src: standElectronics,
        full: standElectronicsFull,
        alt: "The open printed base on a workbench with the flat Qi charging coil seated in its recess and the ESP32-C3 board wired in below it.",
        caption:
          "The Qi coil drops into its own recess; the ESP32-C3 sits under it.",
      },
      {
        kind: "image",
        src: standFirstLight,
        full: standFirstLightFull,
        alt: "The LED ring lit warm white and pink inside the octagonal base, next to the ESP32-C3 board with its small OLED showing text, still tethered by a USB cable.",
        caption: "First light, still on the bench and still tethered by USB.",
      },
      { kind: "heading", text: "The OLED became a clock" },
      "The ESP32-C3 board came with a small OLED, which I added to show the device's IP address once it joins WiFi. It still does that \u2014 for about ten seconds after connecting.",
      "After that it had nothing to display, which felt like a waste. So it now syncs over NTP and sits there as a digital watch: hours and minutes in a large font with AM/PM beside them, redrawn once a minute, falling back to a polite `Time N/A` when it cannot reach a time server. An accidental clock is my favorite part of the whole build.",
      { kind: "heading", text: "Controlling it" },
      "Everything is configurable over WiFi from a small web UI \u2014 LED type, mode, brightness, frame delay, strip length, and how often to cycle between modes. There are around a dozen animations, mostly FastLED palettes: party colors, rainbow, heat, ocean, forest, lava, and a plain white light for when I want a desk lamp instead of a light show.",
      {
        kind: "image",
        src: standWebUi,
        alt: "Screenshot of the dark-themed web UI showing LED strip length, LED type, mode, a brightness slider, frame delay and power-save hour settings.",
        caption: "The whole control surface, served off the ESP32-C3.",
      },
      "A few conveniences that turned out to matter more than the animations:",
      {
        kind: "list",
        items: [
          "Power-save schedule \u2014 dim the LEDs between set hours, so it stops lighting the room overnight. This is what made the NTP sync and timezone handling necessary in the first place.",
          "Soft AP setup \u2014 on first boot it advertises its own network and takes your WiFi credentials through a form. They go to EEPROM, and it falls back to the AP if it ever cannot reconnect.",
          "OTA updates \u2014 firmware goes on over the network, so the thing never has to come apart again.",
          "Factory reset by power-cycling it three times within two seconds \u2014 no buttons to hide in the enclosure, which keeps the outside clean.",
        ],
      },
      { kind: "heading", text: "Charging mode" },
      "The one piece of real integration between the two halves: a GPIO senses when the charger is active and fires a callback that hands the strip to a dedicated animation. It runs a red-to-yellow gradient blending toward green over a twenty-second cycle, with a green pixel bouncing along a section of the arm \u2014 an ambient charging indicator you can read from across the room, with no numbers anywhere.",
      "The MagSafe magnets live in the top piece of the charging pad \u2014 the part the phone actually rests on. They get glued in as a ring first, sitting concentric with the coil underneath, and only once that has set does the whole piece get glued down onto the base.",
      {
        kind: "image",
        src: standMagnets,
        full: standMagnetsFull,
        alt: "The printed top piece of the wireless charging pad on a cutting mat, its circular recess filled with a ring of small magnets bedded in glue, with a bottle of Starbond cyanoacrylate behind it.",
        caption:
          "Magnets going into the charger's top piece, before that piece goes onto the base.",
      },
      { kind: "heading", text: "Putting it together" },
      "Almost none of it is permanent. Hex bolts hold the ESP32-C3 and the stand's arm \u2014 the two things most likely to need attention later \u2014 and everything else is only lightly glued, enough to stay put. If something inside ever needs repairing, it comes apart again without a fight.",
      {
        kind: "image",
        src: standAssembled,
        full: standAssembledFull,
        alt: "The base with its LED ring and charging coil installed and the vertical arm mounted, a spring clamp gripping the joint, on a workbench with a solder spool and hand tools around it.",
        caption: "Bolts where it matters, a light touch of glue everywhere else.",
      },
      {
        kind: "image",
        src: standInUse,
        full: standInUseFull,
        alt: "The finished stand on a workbench, lit pink and orange, with headphones hanging on the top arm and a phone charging flat on the base.",
        caption: "Doing both of its jobs at once.",
      },
      {
        kind: "image",
        src: standFinished,
        full: standFinishedFull,
        alt: "The finished stand with headphones hanging on it, the arm glowing warm white and pink and the base lit purple around the charging pad.",
        caption: "Where it lives now.",
      },
      "The model is on [MakerWorld](https://makerworld.com/en/models/2347791-over-engineered-headphone-stand-and-phone-charger), and the firmware lives on the [led_headphone_stand branch](https://github.com/jaisor/ESP_LED_Controller/tree/led_headphone_stand) of my ESP LED Controller repo \u2014 the same codebase I keep reusing for every LED project I start.",
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
