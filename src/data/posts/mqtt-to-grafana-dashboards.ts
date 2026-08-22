import type { Post } from "./index";
import mqttHero from "../../assets/posts/mqtt-to-grafana-dashboards/hero.jpg";
import mqttDashboards from "../../assets/posts/mqtt-to-grafana-dashboards/dashboards.jpg";
import mqttDashboardsFull from "../../assets/posts/mqtt-to-grafana-dashboards/dashboards-hires.jpg";

const post: Post = {
  slug: "mqtt-to-grafana-dashboards",
  title: "From MQTT messages to Grafana dashboards",
  date: "2026-02-18",
  excerpt:
    "A four-container Docker stack that stores and visualizes MQTT metrics using Prometheus and Grafana, including alerting, at no licensing cost.",
  tags: ["software-engineering"],
  image: mqttHero,
  body: [
    { kind: "heading", text: "Problem" },
    "Many IoT devices publish metrics over MQTT using JSON message payloads. Visualizing the data and monitoring it effectively can be challenging. There are solutions like Home Assistant. This is an alternative dashboard-first approach.",
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
    "I could not find a fitting MQTT exporter. The solutions were either too limited or too complex. So I wrote my own — [mqtt-json-prometheus-exporter](https://github.com/jaisor/mqtt-json-prometheus-exporter), lightweight yet flexible. It subscribes to a configured list of MQTT topic patterns, parses each payload, and exposes numeric fields as Prometheus gauges. Configuration is defined in a single mounted `config.yaml` file.",
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
    "For nested fields, the path is specified using arrow (`→`) notation. The resulting label name is the full path with segments joined by underscores:",
    {
      kind: "code",
      label: "nested label-fields",
      code: `  - pattern: tele/+device/SENSOR
    recursive: Yes
    label-fields:
      - telemetry→sender`,
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
    "Two final points to highlight:",
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
  ],
};

export default post;
