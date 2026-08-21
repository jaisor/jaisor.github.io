import type { LucideIcon } from "lucide-react";
import { Code2, Box, CircuitBoard, Bike, Guitar } from "lucide-react";
import { Drone } from "lucide-react";

export type BucketId =
  | "software-engineering"
  | "electronics"
  | "3d-printing"
  | "fpv-drones"
  | "motorcycles"
  | "guitars";

export interface Bucket {
  id: BucketId;
  label: string;
  icon: LucideIcon;
  description: string;
  link?: string;
  linkLabel?: string;
}

export const buckets: Bucket[] = [
  {
    id: "software-engineering",
    label: "Software Engineering",
    icon: Code2,
    description:
      "A way to stay current and keep my hands on real code. Most of the projects are paired with some kind of hardware component or ways to visualize data to satisdy my need for eye-candy dashboards. ",
    link: "https://github.com/jaisor?tab=repositories",
    linkLabel: "GitHub repos →",
  },
  {
    id: "electronics",
    label: "Electronics",
    icon: CircuitBoard,
    description:
      "ESP32s show up in most of my builds: a Smart Pool Thermometer reporting to Prometheus and Grafana, a yard speaker rebuilt around a Raspberry Pi and a proper amp, and various sensor and lighting controllers scattered around the house. I like the loop of embedded hardware talking to software I also wrote.",
  },
  {
    id: "3d-printing",
    label: "3D Printing",
    icon: Box,
    description:
      "An Ender 3 has been running reliably since I got it dialed in — bed leveling, extruder tuning, and enough troubleshooting to feel like a hobby on its own. Most prints feed straight back into the other hobbies here: camera mounts and canopies for the drones, enclosures for electronics builds, and the occasional replacement part around the house.",
  },
  {
    id: "fpv-drones",
    label: "FPV Drones",
    icon: Drone,
    description:
      "A string of custom FPV quads going back to 2015 — Zax, Tangra, an X-frame racer, SiganX, KISS X210/QAV210, and Shrieka 130 — each one an excuse to try a new frame, stack, or motor combo. Along the way that meant flight-controller tuning on Cleanflight/Betaflight, bench-testing motor and ESC combos, and eventually getting FCC-licensed (Technician class, callsign KK6VYN) to legally run higher-power video gear.",
  },
  {
    id: "motorcycles",
    label: "Motorcycles",
    icon: Bike,
    description:
      "One of my newer hobbies — still early days, learning the ropes on riding and maintenance. More to come here as the garage fills in.",
  },
  {
    id: "guitars",
    label: "Guitars",
    icon: Guitar,
    description:
      "A hobby that's still taking shape — details on gear and playing coming soon.",
  },
];

export interface Project {
  title: string;
  bucket: BucketId;
  description: string;
  link?: string;
}

export const projects: Project[] = [
  // FPV drones
  {
    title: "Custom FPV quad builds",
    bucket: "fpv-drones",
    description:
      "A string of ground-up FPV quads going back to 2015 — Zax, Tangra, an X-frame racer, SiganX, KISS X210/QAV210, and Shrieka 130 — each one a fresh excuse to try a new frame, stack, or motor combo.",
  },
  {
    title: "Flight-controller tuning",
    bucket: "fpv-drones",
    description:
      "PID tuning and filter setup on Cleanflight and Betaflight across builds, chasing cleaner, snappier flight characteristics.",
  },
  {
    title: "Motor & ESC thrust testing",
    bucket: "fpv-drones",
    description:
      "Bench thrust testing of motor/ESC/prop combos to pick hardware by data instead of forum folklore.",
  },
  {
    title: "Amateur radio license (KK6VYN)",
    bucket: "fpv-drones",
    description:
      "Got FCC-licensed (Technician class, callsign KK6VYN) to legally run higher-power FPV video transmitters.",
  },

  // 3D printing
  {
    title: "Ender 3 setup & tuning",
    bucket: "3d-printing",
    description:
      "Got an Ender 3 running reliably — bed leveling, extruder tuning, and enough troubleshooting to feed parts straight back into the drone and electronics builds.",
  },
  {
    title: "Printed drone parts",
    bucket: "3d-printing",
    description:
      "Custom camera mounts, canopies, and frame parts designed and printed for the FPV builds above.",
  },

  // Electronics
  {
    title: "Smart Pool Thermometer",
    bucket: "electronics",
    description:
      "ESP32-based pool temperature sensor with Prometheus + Grafana for remote monitoring and history.",
  },
  {
    title: "Yard speaker rebuild",
    bucket: "electronics",
    description:
      "Raspberry Pi, Bluetooth, a proper amp, and a Fusion 360-designed enclosure — rebuilt from the ground up.",
  },
  {
    title: "ESP32 sensor & lighting controllers",
    bucket: "electronics",
    description:
      "Small embedded/IoT controllers for home sensors and lighting, mostly ESP32-based.",
  },

  // Software engineering
  {
    title: "Home-monitoring dashboards",
    bucket: "software-engineering",
    description:
      "Dashboards tying together the ESP32 sensors and home projects above into one place to check on things.",
  },
  {
    title: "IT & backend career",
    bucket: "software-engineering",
    description:
      "Building, managing, and leading software teams across backend systems, cloud computing, big data, DevOps, remote fleet administration, and mobile applications — with stops at PayPal, Honey, Atom Tickets, Amazon, and OvernightPrints.com. Holder of three U.S. patents in device testing and content management.",
  },

  // Motorcycles
  {
    title: "Coming soon",
    bucket: "motorcycles",
    description: "This section is still under construction.",
  },

  // Guitars
  {
    title: "Coming soon",
    bucket: "guitars",
    description: "This section is still under construction.",
  },
];
