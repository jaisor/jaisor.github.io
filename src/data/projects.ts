import type { LucideIcon } from "lucide-react";
import { Code2, Box, CircuitBoard, Bike, Guitar } from "lucide-react";
import { Drone } from "lucide-react";

export type BucketId =
  | "software-engineering"
  | "3d-printing"
  | "electronics"
  | "fpv-drones"
  | "motorcycles"
  | "guitars";

export interface Bucket {
  id: BucketId;
  label: string;
  icon: LucideIcon;
}

export const buckets: Bucket[] = [
  { id: "software-engineering", label: "Software Engineering", icon: Code2 },
  { id: "3d-printing", label: "3D Printing", icon: Box },
  { id: "electronics", label: "Electronics", icon: CircuitBoard },
  { id: "fpv-drones", label: "FPV Drones", icon: Drone },
  { id: "motorcycles", label: "Motorcycles", icon: Bike },
  { id: "guitars", label: "Guitars", icon: Guitar },
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
