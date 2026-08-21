import type { LucideIcon } from "lucide-react";
import { Code2, Box, CircuitBoard, Bike, Guitar, Sparkles } from "lucide-react";
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
  /** Taxonomy name — drives the Posts filter pill and the chips on a post. */
  label: string;
  icon: LucideIcon;
  /**
   * Hobby-card overrides, for when the card's framing has drifted from
   * the tag's. `motorcycles` is the case: the card is a catch-all for
   * everything not worth its own tag, but the tag still labels a post.
   */
  cardLabel?: string;
  cardIcon?: LucideIcon;
  /**
   * Hobby-card copy. Not shown on post tag chips. Supports the same
   * inline markup as post bodies: `code` and [label](href).
   */
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
      "I built my first FPV drone in 2015 and am addicted to flying and building ever since. The hobby is vast, allowing me to exercise my coding, electronics, mechanical design, and 3D printing skills — and enjoy a substantial adrenaline rush. I took a short stab at [FPV racing](https://www.youtube.com/watch?v=TdSUKtazEAY) but have since settled into a calmer, [cinematic](https://www.youtube.com/watch?v=u_-RXqDzlsU) style of flying.",
  },
  {
    id: "guitars",
    label: "Guitars",
    icon: Guitar,
    description:
      "I always regretted not knowing how to play an instrument. During the pandemic, I jokingly offered to trade some of my drones for a few guitars from a good musician and RC buddy of mine. A few years of practice later, I would never claim mastery, but I have learned a thing or two and managed to write [50+ riff compositions](https://www.youtube.com/playlist?list=PLNeTetmujscX1pmeKIlLjW0Eo5L0S5yWF) based on Ola Englund's riff challenge.",
  },
  {
    id: "motorcycles",
    label: "Motorcycles",
    icon: Bike,
    cardLabel: "More to come...",
    cardIcon: Sparkles,
    description:
      "My list of hobbies continues to grow. It also includes woodworking, RV camping, motorcycles, mountain bikes, and more. I've been called a Renaissance man by my friends, and I take it as the highest form of compliment.",
  },
];

/** Lookup for rendering a post's tag chips by id. */
export const tagById = new Map<TagId, Tag>(tags.map((t) => [t.id, t]));
