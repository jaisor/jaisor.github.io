import type { Post } from "./index";
import dashboard from "../../assets/posts/air-quality-assurance/dashboard.jpg";
import dashboardFull from "../../assets/posts/air-quality-assurance/dashboard-hires.jpg";

const post: Post = {
  slug: "air-quality-assurance",
  title: "Air Quality Assurance",
  date: "2026-09-05",
  excerpt:
    "Adding BME688 gas sensing and a BSEC-style IAQ estimator to a WiFi climate sensor, then building a Grafana dashboard for it, to verify office air filtration before moving from PLA/PETG to more aggressive filaments.",
  tags: ["electronics", "software-engineering"],
  image: dashboard,
  body: [
    { kind: "heading", text: "Problem" },
    "My home office  doubles as my maker space. I 3D print, solder electronics and occasionally glue and paint miniatures. Filament in regular use is PLA and PETG, both low-emission at typical nozzle temperatures. Moving to more aggressive materials (ABS, ASA, nylon, and similar) raises VOC and ultrafine-particle output during printing. The room has carbon and HEPA filtration installed, but its effectiveness had never been measured, only assumed from the filter's rated specifications.",
    "The requirement was a continuous, quantified air-quality reading in the room, so filtration performance can be verified before more aggressive filaments are introduced, and any degradation over a filter's service life is visible before it becomes a problem.",
    { kind: "heading", text: "Approach" },
    "An existing project of mine, [wifi-climate-sensor](https://github.com/jaisor/wifi-climate-sensor), already covers temperature and humidity: ESP8266/ESP32 firmware with a built-in web UI, MQTT publishing, including Home Assistant auto-discovery, across AHT20, BME280, DHT22, and DS18B20 sensors. None of those expose gas resistance, so none can drive an air-quality metric. I had to add BME688 support first.",
    "The BME688 and BME680 answer on the same I2C address and share a chip ID; a repeated-start read of the variant register is what tells them apart. Detection is automatic at boot, alongside the existing sensor autodetection, and the result is persisted so a restart does not repeat the I2C probe.",
    {
      kind: "table",
      caption: "Fields the BME688 path adds over the temperature/humidity-only sensors.",
      head: ["Field", "Source", "Notes"],
      rows: [
        ["temperature, humidity", "BME688 compensated read", "same as the other supported sensors"],
        ["baro_pressure", "BME688 compensated read", "not sea-level corrected"],
        ["gas_resistance", "BME688 gas heater", "raw ohms; heated plate resistance, falls as VOC concentration rises"],
      ],
    },
    "The gas heater takes on the order of a few hundred milliseconds to settle, so a reading is split into `beginReading()` and a later `endReading()` poll rather than blocking the sensor loop for that duration.",
    { kind: "heading", text: "Estimating IAQ" },
    {
      kind: "note",
      label: "Not Bosch BSEC",
      text: "Bosch's BSEC library computes IAQ from the same BME688 gas signal but ships as a closed-source binary under its own license, and its exact algorithm is not published. The estimator built for this firmware targets the same quantity, on the same 0-500 scale with the same accuracy semantics, but the two are not numerically interchangeable.",
    },
    "Raw gas resistance falls with rising humidity independent of air quality, so the first step compensates it against absolute humidity rather than relative humidity, since gas resistance tracks water vapor content directly:",
    {
      kind: "code",
      label: "humidity compensation",
      code: `pSat   = 6.112 * exp(17.67 * T / (T + 243.5))     // hPa, Magnus formula
absHum = 216.7 * (RH / 100 * pSat) / (273.15 + T)  // g/m3, ideal gas law
compGas = gasResistanceOhms * exp(0.03 * absHum)`,
    },
    "The compensated reading is then scored against a clean-air baseline, tracked as an asymmetric exponential moving average: it rises toward cleaner air on a roughly 5-minute time constant, but falls toward dirtier air over roughly a day. A fast fall would let a sustained pollution event get quietly adopted as the new baseline, defeating the point of measuring it.",
    {
      kind: "code",
      label: "baseline and score",
      code: `tau   = compGas > baseline ? 300 : 86400            // seconds, rise vs. fall
alpha = 1 - exp(-dt / tau)
baseline += (compGas - baseline) * alpha

gasRatio = clamp(compGas / baseline, 0, 1)
gasScore = gasRatio * 0.75 * 100                    // gas: 75% of score
humScore = triangular(humidity, optimal=40%) * 0.25 * 100  // humidity: 25%

score = humScore + gasScore
iaq   = (100 - score) * 5                           // 0-500, lower is cleaner`,
    },
    "The humidity term peaks at 40% relative humidity and tapers linearly to zero at 0% and 100%, on the premise that very dry or very humid indoor air is itself a discomfort factor independent of VOC load.",
    "Accuracy is not a measurement of the current reading; it reflects how long the baseline has had to settle, tracked in accumulated seconds rather than wall-clock time since boot, so a restart does not discard a baseline that had already converged. A deep-sleep interval is credited to the same counter, since the baseline decays on elapsed time whether the device is awake to observe it or not.",
    {
      kind: "table",
      caption: "Accuracy state, by accumulated tracked seconds.",
      head: ["Value", "State", "Threshold"],
      rows: [
        ["0", "Stabilizing", "heater burn-in not yet complete"],
        ["1", "Uncertain", "< 10 minutes tracked"],
        ["2", "Calibrating", "10-30 minutes tracked"],
        ["3", "Calibrated", "> 30 minutes tracked"],
      ],
    },
    {
      kind: "table",
      caption: "IAQ rating bands, matching Bosch's published BSEC scale.",
      head: ["Range", "Rating"],
      rows: [
        ["0-50", "Excellent"],
        ["51-100", "Good"],
        ["101-150", "Lightly polluted"],
        ["151-200", "Moderately polluted"],
        ["201-250", "Heavily polluted"],
        ["251-350", "Severely polluted"],
        ["351-500", "Extremely polluted"],
      ],
    },
    { kind: "heading", text: "Publishing and display" },
    "The MQTT JSON payload gains `gas_resistance_ohms`, `iaq`, `iaq_rating`, `iaq_accuracy`, and `iaq_accuracy_text` alongside the existing temperature and humidity fields, published on the same topic and interval as before. Home Assistant MQTT auto-discovery adds two entities: an `iaq` sensor with `rating` and `accuracy` carried as JSON attributes on the same state topic, and a separate `iaq_accuracy` sensor for the raw 0-3 value, so either can drive an automation or a dashboard card directly without a template sensor.",
    "The device's own web UI gained a gas-sensor panel: the live IAQ value, its rating and accuracy text, tracked time, compensated gas resistance, and baseline, plus a rolling sparkline of IAQ and baseline over the last 12 hours, sampled every 15 minutes and held in RAM rather than flash to avoid wearing it at that write cadence.",
    { kind: "heading", text: "Dashboard" },
    "The existing MQTT-to-Grafana pipeline (a Mosquitto broker, a JSON-to-Prometheus exporter, and Grafana, described in an [earlier post](/posts/mqtt-to-grafana-dashboards/)) already scrapes this device's topic, so the new fields were available as Prometheus series without further plumbing. The dashboard itself was built by giving an AI assistant a sample MQTT payload from the device plus a couple of existing dashboards in this Grafana instance as a style reference, then iterating on panel choice and threshold coloring.",
    {
      kind: "code",
      label: "IAQ gauge query",
      code: `iaq{job="mqtt_json", device="$device", location="$location"}`,
    },
    "Panels are grouped into five rows: Air Quality (an IAQ gauge, a rating stat, a calibration-state stat, and an IAQ trend line, each colored on the same thresholds as the rating table above), Climate (temperature and humidity gauges and trends), Pressure & Gas (barometric pressure and raw gas resistance, since a rising resistance trend confirms filtration is working independent of the derived IAQ number), 24-hour Ranges (min/max stats for a quick check without opening the trend panels), and Debug (WiFi signal, uptime, and raw ADC/voltage telemetry for the device itself).",
    {
      kind: "image",
      src: dashboard,
      full: dashboardFull,
      alt: "Grafana \"Office Air Quality\" dashboard showing an IAQ gauge reading 106, an Air Quality Rating stat, a Calibrated accuracy panel, an IAQ trend chart, temperature and humidity gauges and trends, barometric pressure and gas-resistance panels, 24-hour min/max ranges, and device debug panels for WiFi signal, RSSI, and uptime.",
      caption:
        "IAQ and calibration state at the top, climate and raw gas-resistance readings in the middle, 24-hour ranges and device debug telemetry below.",
    },
    { kind: "heading", text: "Conclusion" },
    "At the time of writing the sensor reports an IAQ of 106 (lightly polluted) fully Calibrated, with the accuracy state held at Calibrated for 57% of the preceding 24 hours; the remainder corresponds to a device restart re-running its burn-in. Gas resistance sits at 58.9 kΩ and has been trending upward, which corroborates the IAQ reading independent of the derived index.",
    "With continuous measurement in place, the next step is a controlled comparison: run a print in a more aggressive filament with the filtration active, and confirm the IAQ trend does not sustain a worse band than the current PLA/PETG baseline for longer than the filtration's rated clearance time.",
    "A [HEPA H13 and activated-carbon filtration unit](https://www.amazon.com/dp/B0GH6FBWK1) is on order for this: relatively low-cost, triple-layer filtration rated for the VOCs and ultrafine particles ABS/ASA printing adds over PLA/PETG. It mounts to the H2D through a printed adapter, still to be designed and printed. Once it is installed, a handful of more aggressive filaments go through it, starting with ASA. A follow-up post will publish the dashboard metrics from that run.",
  ],
};

export default post;
