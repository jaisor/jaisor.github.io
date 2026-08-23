import type { Post } from "./index";
import solarHero from "../../assets/posts/rv-solar-battery-inverter/hero.jpg";
import solarJunction from "../../assets/posts/rv-solar-battery-inverter/junction.jpg";
import solarJunctionFull from "../../assets/posts/rv-solar-battery-inverter/junction-hires.jpg";
import solarBattery from "../../assets/posts/rv-solar-battery-inverter/battery.jpg";
import solarBatteryFull from "../../assets/posts/rv-solar-battery-inverter/battery-hires.jpg";
import solarAssembled from "../../assets/posts/rv-solar-battery-inverter/assembled.jpg";
import solarAssembledFull from "../../assets/posts/rv-solar-battery-inverter/assembled-hires.jpg";
import solarRemotePanel from "../../assets/posts/rv-solar-battery-inverter/remote-panel.jpg";
import solarRemotePanelFull from "../../assets/posts/rv-solar-battery-inverter/remote-panel-hires.jpg";
import solarPrintedParts from "../../assets/posts/rv-solar-battery-inverter/printed-parts.jpg";
import solarPrintedPartsFull from "../../assets/posts/rv-solar-battery-inverter/printed-parts-hires.jpg";
import solarInstalled from "../../assets/posts/rv-solar-battery-inverter/installed.jpg";
import solarBench from "../../assets/posts/rv-solar-battery-inverter/bench.jpg";
import solarBenchFull from "../../assets/posts/rv-solar-battery-inverter/bench-hires.jpg";
import solarDashboardMount from "../../assets/posts/rv-solar-battery-inverter/dashboard-mount.jpg";
import solarDashboardMountFull from "../../assets/posts/rv-solar-battery-inverter/dashboard-mount-hires.jpg";
import solarGrafana from "../../assets/posts/rv-solar-battery-inverter/grafana.png";

const post: Post = {
  slug: "rv-solar-battery-inverter",
  title: "Solar, battery and inverter for the RV trailer",
  date: "2024-02-21",
  excerpt:
    "A 600 W flexible-panel array, a 24 V LiFePO4 bank, and an inverter big enough to run the microwave and practically everything else — zero generator use on the first real trip. Plus a Grafana dashboard and telemetry stack that went well past what the job needed, purely because I could.",
  tags: ["electronics", "3d-printing"],
  image: solarInstalled,
  body: [
    "Our RV trailer came with the usual setup: a single lead-acid battery, no real solar, and a generator for anything beyond a weekend of light use. That's fine until you actually want to camp somewhere quiet for a week — running a generator every afternoon to keep the fridge cold gets old fast. So over a winter of driveway weekends I built a proper power system: a flexible solar array, a lithium bank, and an inverter sized for real appliances, not just phone chargers.",
    "I'll admit I went further than the job needed on the monitoring side. What started as \"it would be nice to see the battery voltage from inside\" turned into a full Grafana dashboard and telemetry stack. The first real trip out ran the microwave and practically everything else on solar with zero generator use — and as a bonus, the same box that runs the dashboard also gives us WiFi and internet at the campsite.",
    { kind: "heading", text: "The array" },
    "600 W total, split 400 W on the roof and 200 W on the front cap: BougeRV Yuma CIGS thin-film flexible panels, two 200 W and two 100 W. They're adhesive-mounted with no roof penetrations, and there's still room up there for more if I ever want it. Every panel run lands in one junction box, wired with 8 AWG down to the charge controller — heavier gauge than the load strictly needs, but it makes rearranging or adding panels later a non-issue instead of a rewire.",
    {
      kind: "image",
      src: solarHero,
      alt: "Two roof-mounted flexible solar panels on the RV trailer's roof, one on either side of the roof-mounted AC unit and an antenna.",
      caption: "The roof array, adhesive-mounted on either side of the AC unit — no penetrations.",
    },
    {
      kind: "image",
      src: solarJunction,
      full: solarJunctionFull,
      alt: "A white junction box on the RV roof with multiple red and black panel leads bussed together on copper terminals, sealed around the edges with silicone.",
      caption: "Every panel run lands here before the 8 AWG drop to the charge controller.",
    },
    { kind: "heading", text: "Storage" },
    "24 V, 100 Ah LiFePO4 — noticeably lighter in the hand than the equivalent lead-acid would have been, which matters on a trailer where every pound is towing weight. It's on a quick-disconnect with a 100 A breaker between it and the rest of the system, and I kept the trailer's original 12 V lead-acid battery in place rather than removing it.",
    {
      kind: "image",
      src: solarBattery,
      full: solarBatteryFull,
      alt: "A black 24V 100Ah LiFePO4 battery on a workbench with a quick-disconnect connector and inline 100A breaker wired to its terminals, a Victron MPPT charge controller visible behind it.",
      caption: "24 V 100 Ah LiFePO4, with the quick-disconnect and 100 A breaker that isolate it from everything else.",
    },
    { kind: "heading", text: "Power electronics" },
    "The inverter went through a revision. I started with a Victron Phoenix 1200 VA, which turned out to not be enough for the trailer's larger appliances — it ran the essentials fine but choked on anything with real startup draw. It got replaced with a WZRELB 3 kW unit, which has had no trouble since. Charging is a Victron MPPT SmartSolar controller, and I added a Victron SmartShunt battery monitor later, which turned out to be a bigger upgrade than expected: it covers the lead-acid battery too, and single-handedly accounts for most of the telemetry the dashboard shows.",
    "The stock 12 V lead-acid battery still needed charging from the 24 V system, and that took a few tries to get right. I ran a spare solar charge controller as an improvised DC-DC charger first, then tried a cheap PWM controller for the same job — both blew fuses under real use. A Victron Orion-Tr Smart 24/12 finally did the job properly and hasn't given trouble since. The inverter's remote head is mounted inside the trailer, and shore power is retained: the inverter feeds a standard TT-30R outlet, so the same AC cable plugs into either the inverter or a shore power pedestal, whichever is available. At home, it's shore power.",
    {
      kind: "image",
      src: solarAssembled,
      full: solarAssembledFull,
      alt: "The fully assembled power system on the workbench, stacked on top of the LiFePO4 battery: the WZRELB inverter, Victron MPPT charge controller, and a custom telemetry board, all wired together before installation.",
      caption: "Inverter, charge controller and telemetry board, wired up and tested on the bench before it went anywhere near the trailer.",
    },
    {
      kind: "image",
      src: solarRemotePanel,
      full: solarRemotePanelFull,
      alt: "A finished cabinet cutout with a black inverter on/off switch panel and a GFCI-protected AC outlet mounted flush next to each other in cream-colored cabinetry.",
      caption: "The inverter remote and a GFCI outlet, finished flush into the cabinetry — no more exposed cutout.",
    },
    { kind: "heading", text: "Printed parts" },
    "3D printing shows up all over this build, from small brackets for cleaning up the wiring, protective boxes for the electronics, a strap-style clip that keeps the TT-30R shore power cable secured, a battery strap holder, and the cover panel for the LCD dashboard described below.",
    {
      kind: "image",
      src: solarPrintedParts,
      full: solarPrintedPartsFull,
      alt: "A Fusion 360 render showing four 3D-printed parts: an LCD cover panel with a rectangular cutout, a box for the telemetry modules, a green strap-shaped clip for the TT-30R AC power cable, and a small battery strap holder.",
      caption: "The printed parts, labeled: LCD cover, telemetry box, cable strap, battery strap holder.",
    },
    { kind: "heading", text: "Getting it installed" },
    "Everything mounts on a single plywood panel — battery, inverter, charge controller, telemetry board — built and wired on the bench, then dropped into the trailer's storage bay as one unit and strapped down. That makes installing and removing the unit for future service easy.",
    "A couple of things got fixed after the fact based on feedback once I posted the build online. The car-audio fuses I'd used on the battery leads are known to melt under sustained DIY solar loads, so those came out in favor of proper ANL fuses and DC thermal-magnetic breakers — a PV disconnect breaker and a DC-rated breaker for the inverter. Worth doing even though nothing had failed yet.",
    { kind: "heading", text: "Monitoring stack" },
    "This is the part that takes the most explaining, so here's the chain end to end:",
    {
      kind: "steps",
      items: [
        {
          title: "VE.Direct",
          text: "The Victron MPPT charge controller and SmartShunt both expose their data over built-in VE.Direct serial ports.",
        },
        {
          title: "Two Arduino boards",
          text: "A pair of Seeed Xiao SAMD21 boards read and parse the VE.Direct streams.",
        },
        {
          title: "Radio to gateway",
          text: "That data goes out over short-range radio to a gateway board, which converts it into MQTT messages and puts them on WiFi.",
        },
        {
          title: "Pi 5, broker and dashboard",
          text: "A Raspberry Pi 5 — sitting next to a Pepwave access point with a cellular connection — runs the MQTT broker, a custom MQTT-to-Prometheus exporter, Prometheus itself, and Grafana.",
        },
      ],
    },
    {
      kind: "image",
      src: solarBench,
      full: solarBenchFull,
      alt: "A cluttered workbench with the Raspberry Pi, Pepwave access point, custom Arduino gateway boards, a small LCD readout, and a laptop, mid-development of the telemetry stack.",
      caption: "The telemetry stack under development — Pepwave, Pi, and two generations of gateway board.",
    },
    "The dashboard also tracks indoor and outdoor temperature and humidity, and the whole thing is readable on a 3D-printed LCD panel mounted flush in the cabinetry, right next to the stereo.",
    {
      kind: "image",
      src: solarDashboardMount,
      full: solarDashboardMountFull,
      alt: "The Grafana dashboard on a flush-mounted LCD panel inside the trailer's cabinetry, next to a car stereo, with the cabinet door open to show the Raspberry Pi, Pepwave router and gateway boards behind it.",
      caption: "Flush-mounted next to the stereo, with the Pi and Pepwave living in the cabinet behind it.",
    },
    {
      kind: "image",
      src: solarGrafana,
      alt: "A Grafana dashboard showing indoor and outdoor temperature and humidity, LiFePO4 and lead-acid battery voltage, battery power charging and discharging, solar charging power, solar yield today, and inverter and charge controller state.",
      caption: "The dashboard itself — everything the telemetry chain collects, in one screen.",
    },
    "Everything here is open source:",
    {
      kind: "list",
      items: [
        "[mqtt-json-prometheus-exporter](https://github.com/jaisor/mqtt-json-prometheus-exporter) — turns the MQTT telemetry into Prometheus metrics",
        "[stus-rf24-wifi-gw](https://github.com/jaisor/stus-rf24-wifi-gw) — the radio-to-WiFi gateway firmware",
        "[stus-ve.direct](https://github.com/jaisor/stus-ve.direct) — the Arduino firmware that parses VE.Direct",
      ],
    },
    "None of this is necessary, to be clear. Victron's own app talks to the MPPT controller and SmartShunt directly over Bluetooth and is genuinely sufficient on its own — the Pi, Prometheus and Grafana layer is tinkering for its own sake, done because I wanted a dashboard I could glance at from across the room and because the Pepwave box needed to be there for internet anyway.",
    { kind: "heading", text: "Cost" },
    "Roughly $2,300 all in — panels, electronics, dashboard hardware, tools, cables and consumables. The flexible CIGS panels were the expensive choice on the array side. Every part of the monitoring stack beyond the Victron app itself is optional. Cut both if optimizing for cost.",
    { kind: "heading", text: "Measured performance" },
    "Numbers from a Southern California heatwave, after several full charge and discharge cycles:",
    {
      kind: "table",
      caption: "Measured during a SoCal heatwave, panels roughly nine months old at the time.",
      head: ["Metric", "Value"],
      rows: [
        ["Daily solar production", "~3.5 kWh"],
        ["Battery throughput", "95 Ah in and out"],
        ["Inverter / charge controller peak temp", "~115 °F"],
        ["Panel failures to date", "none"],
      ],
    },
    {
      kind: "note",
      label: "Update — an AC soft-start",
      text: "Since the original build, I added a soft-start module to the RV's AC compressor. Compressor startup draws a big inrush current — enough that even a 3 kW inverter running off the battery would brown out or trip trying to start it cold. The soft-start ramps the motor up instead of slamming it on, which keeps that inrush within what the inverter and battery bank can deliver. On an especially hot camping day, that closes the one gap the original system had: the AC can now run off solar and battery too, not just shore power or a generator.",
    },
    "Asked afterward what I'd do differently, the honest answer is not much — the build evolved through trial and error, and every real problem got fixed as it showed up: the inverter swap, the SmartShunt, the Orion-Tr, the fuses. The one genuine fork in the road was flexible adhesive CIGS panels versus cheaper rigid frame-mounted ones that would have meant drilling the roof for more total capacity. I'd make the same call again — no penetrations, no brackets, and so far, no regrets.",
  ],
};

export default post;
