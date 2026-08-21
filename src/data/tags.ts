import type { LucideIcon } from "lucide-react";
import { Code2, Box, CircuitBoard, Bike, Guitar } from "lucide-react";
import { Drone } from "lucide-react";

export type TagId =
  | "software-engineering"
  | "electronics"
  | "3d-printing"
  | "fpv-drones"
  | "motorcycles"
  | "guitars";

/**
 * A topic. Tags do double duty: each one renders as a card in
 * Hobbies & Interests (using the copy below) and as a filter pill /
 * chip on Posts. Adding one here adds it in both places.
 */
export interface Tag {
  id: TagId;
  label: string;
  icon: LucideIcon;
  /** Hobby-card copy. Not shown on post tag chips. */
  description: string;
  link?: string;
  linkLabel?: string;
  /** Extra links under the description — repos, videos, whatever fits. */
  links?: { label: string; href: string }[];
}

export const tags: Tag[] = [
  {
    id: "software-engineering",
    label: "Software Engineering",
    icon: Code2,
    description:
      "A way to stay current and keep my hands on actual code. Most of the projects are paired with some kind of hardware component or ways to visualize data to satisfy my need for eye-candy dashboards. ",
    link: "https://github.com/jaisor?tab=repositories",
    linkLabel: "GitHub repos →",
  },
  {
    id: "electronics",
    label: "Electronics",
    icon: CircuitBoard,
    description:
      "I have been interested in electronics and schematics since childhood. I love the capabilities microcontrollers like Arduino and ESP provide in the areas of IoT and home automation. I have used this rich palette of tech to create projects like:",
    links: [
      {
        label: "WiFi Climate Sensor",
        href: "https://github.com/jaisor/wifi-climate-sensor",
      },
      {
        label: "Smart Pool Thermometer",
        href: "https://github.com/jaisor/SmartPoolThermometer",
      },
      {
        label: "ESP LED Controller",
        href: "https://github.com/jaisor/ESP_LED_Controller",
      },
      {
        label: "Mitsubishi AC WiFi Controller",
        href: "https://github.com/jaisor/mitsubishi_ac_wifi_controller",
      },
    ],
  },
  {
    id: "3d-printing",
    label: "3D Printing",
    icon: Box,
    description:
      "It started as an extension of my FPV drone obsession. Over the years it has grown into multiple printers, modded and upgraded along the way, with a Bambu H2D as the main workhorse today. The modeling side grew with it: I started out in Blender and now do fully parametric CAD designs in Autodesk Fusion.",
    link: "https://makerworld.com/en/@jaisor/upload",
    linkLabel: "MakerWorld profile →",
  },
  {
    id: "fpv-drones",
    label: "FPV Drones",
    icon: Drone,
    description:
      "I built my first FPV drone in 2015 and have been addicted to flying — and building — ever since. It is a vast hobby that exercises just about everything I enjoy: coding and flight-controller tuning, electronics and soldering, mechanical and aero design, 3D printing for frames and mounts, and an adrenaline rush at the end of it. A long string of custom quads followed — Zax, Tangra, an X-frame racer, SiganX, KISS X210/QAV210, Shrieka 130 — each one an excuse to try a new frame, stack, or motor combo. I took a short stint into FPV racing, but have since settled into a calmer, cinematic style of flying:",
    links: [
      {
        label: "Racing — Hesperia",
        href: "https://www.youtube.com/watch?v=TdSUKtazEAY",
      },
      {
        label: "Cinematic — Ocotillo Wells",
        href: "https://www.youtube.com/watch?v=u_-RXqDzlsU",
      },
    ],
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


/** Lookup for rendering a post's tag chips by id. */
export const tagById = new Map<TagId, Tag>(tags.map((t) => [t.id, t]));
