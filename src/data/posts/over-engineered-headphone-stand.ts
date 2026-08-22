import type { Post } from "./index";
import standHero from "../../assets/posts/over-engineered-headphone-stand/hero.jpg";
import standInUse from "../../assets/posts/over-engineered-headphone-stand/in-use.jpg";
import standInUseFull from "../../assets/posts/over-engineered-headphone-stand/in-use-hires.jpg";
import standWebUi from "../../assets/posts/over-engineered-headphone-stand/webui.png";
import standElectronics from "../../assets/posts/over-engineered-headphone-stand/electronics.jpg";
import standElectronicsFull from "../../assets/posts/over-engineered-headphone-stand/electronics-hires.jpg";
import standFirstLight from "../../assets/posts/over-engineered-headphone-stand/first-light.jpg";
import standFirstLightFull from "../../assets/posts/over-engineered-headphone-stand/first-light-hires.jpg";
import standAssembled from "../../assets/posts/over-engineered-headphone-stand/assembled.jpg";
import standAssembledFull from "../../assets/posts/over-engineered-headphone-stand/assembled-hires.jpg";
import standMagnets from "../../assets/posts/over-engineered-headphone-stand/magnets.jpg";
import standMagnetsFull from "../../assets/posts/over-engineered-headphone-stand/magnets-hires.jpg";
import standFinished from "../../assets/posts/over-engineered-headphone-stand/finished.jpg";
import standFinishedFull from "../../assets/posts/over-engineered-headphone-stand/finished-hires.jpg";

const post: Post = {
  slug: "over-engineered-headphone-stand",
  title: "An over-engineered headphone stand",
  date: "2026-02-16",
  excerpt:
    "I wanted a headphone stand. I also wanted a better wireless charger. And I will take any excuse to add addressable LEDs to something — so all three became one object, with an ESP32-C3 and a web UI.",
  tags: ["3d-printing", "electronics"],
  image: standHero,
  body: [
    "I have a weakness for neon lighting, and an ongoing habit of putting addressable LEDs on things that did not ask for them. I also genuinely needed two boring objects: somewhere to hang my headphones, and a wireless charger with more power than the one I had.",
    "Rather than buy two things, I designed one. The name is not ironic — it really is over-engineered, and that was the point.",
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
    "An ESP32-C3 drives everything. The LEDs are WS2812B, split into a bottom ring, a wall ring, the vertical arm and the top arm — the firmware treats them as four segments of one virtual strip, so an animation runs across the whole object instead of restarting at each piece. FastLED does the heavy lifting.",
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
    "The ESP32-C3 board came with a small OLED, which I added to show the device's IP address once it joins WiFi. It still does that — for about ten seconds after connecting.",
    "After that it had nothing to display, which felt like a waste. So it now syncs over NTP and sits there as a digital watch: hours and minutes in a large font with AM/PM beside them, redrawn once a minute, falling back to a polite `Time N/A` when it cannot reach a time server. An accidental clock is my favorite part of the whole build.",
    { kind: "heading", text: "Controlling it" },
    "Everything is configurable over WiFi from a small web UI — LED type, mode, brightness, frame delay, strip length, and how often to cycle between modes. There are around a dozen animations, mostly FastLED palettes: party colors, rainbow, heat, ocean, forest, lava, and a plain white light for when I want a desk lamp instead of a light show.",
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
        "Power-save schedule — dim the LEDs between set hours, so it stops lighting the room overnight. This is what made the NTP sync and timezone handling necessary in the first place.",
        "Soft AP setup — on first boot it advertises its own network and takes your WiFi credentials through a form. They go to EEPROM, and it falls back to the AP if it ever cannot reconnect.",
        "OTA updates — firmware goes on over the network, so the thing never has to come apart again.",
        "Factory reset by power-cycling it three times within two seconds — no buttons to hide in the enclosure, which keeps the outside clean.",
      ],
    },
    { kind: "heading", text: "Charging mode" },
    "The one piece of real integration between the two halves: a GPIO senses when the charger is active and fires a callback that hands the strip to a dedicated animation. It runs a red-to-yellow gradient blending toward green over a twenty-second cycle, with a green pixel bouncing along a section of the arm — an ambient charging indicator you can read from across the room, with no numbers anywhere.",
    "The MagSafe magnets live in the top piece of the charging pad — the part the phone actually rests on. They get glued in as a ring first, sitting concentric with the coil underneath, and only once that has set does the whole piece get glued down onto the base.",
    {
      kind: "image",
      src: standMagnets,
      full: standMagnetsFull,
      alt: "The printed top piece of the wireless charging pad on a cutting mat, its circular recess filled with a ring of small magnets bedded in glue, with a bottle of Starbond cyanoacrylate behind it.",
      caption:
        "Magnets going into the charger's top piece, before that piece goes onto the base.",
    },
    { kind: "heading", text: "Putting it together" },
    "Almost none of it is permanent. Hex bolts hold the ESP32-C3 and the stand's arm — the two things most likely to need attention later — and everything else is only lightly glued, enough to stay put. If something inside ever needs repairing, it comes apart again without a fight.",
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
    "The model is on [MakerWorld](https://makerworld.com/en/models/2347791-over-engineered-headphone-stand-and-phone-charger), and the firmware lives on the [led_headphone_stand branch](https://github.com/jaisor/ESP_LED_Controller/tree/led_headphone_stand) of my ESP LED Controller repo — the same codebase I keep reusing for every LED project I start.",
  ],
};

export default post;
