import type { Post } from "./index";
import yardHero from "../../assets/posts/yard-speaker-project/hero.jpg";
import yardElectronics from "../../assets/posts/yard-speaker-project/electronics.jpg";
import yardElectronicsFull from "../../assets/posts/yard-speaker-project/electronics-hires.jpg";
import yardDesign from "../../assets/posts/yard-speaker-project/design.jpg";
import yardDesignFull from "../../assets/posts/yard-speaker-project/design-hires.jpg";
import yardBase from "../../assets/posts/yard-speaker-project/base.jpg";
import yardBaseFull from "../../assets/posts/yard-speaker-project/base-hires.jpg";
import yardUnstained from "../../assets/posts/yard-speaker-project/unstained.jpg";
import yardUnstainedFull from "../../assets/posts/yard-speaker-project/unstained-hires.jpg";
import yardStained from "../../assets/posts/yard-speaker-project/stained.jpg";
import yardStainedFull from "../../assets/posts/yard-speaker-project/stained-hires.jpg";
import yardInstall from "../../assets/posts/yard-speaker-project/install.jpg";
import yardInstallFull from "../../assets/posts/yard-speaker-project/install-hires.jpg";
import yardFinished from "../../assets/posts/yard-speaker-project/finished.jpg";
import yardFinishedFull from "../../assets/posts/yard-speaker-project/finished-hires.jpg";
import yardSpotify from "../../assets/posts/yard-speaker-project/spotify.jpg";

const post: Post = {
  slug: "yard-speaker-project",
  title: "Yard speaker project",
  date: "2020-05-04",
  excerpt:
    "The backyard speakers were still running off the TV, which meant no sound unless the TV was on. I gave them a dedicated amp instead — a Bluetooth board, a Raspberry Pi streaming Spotify over WiFi, and a 3D-printed, wood-finished enclosure to hold it all.",
  tags: ["electronics", "3d-printing"],
  image: yardHero,
  body: [
    "The yard speakers came with us from the old house, but they were still wired into the TV's sound system — which meant no music unless the TV was on, and \"too much a bother\" most of the time. Three things I wanted out of a proper fix:",
    {
      kind: "list",
      items: [
        "a dedicated amplifier, not a repurposed TV output",
        "Bluetooth support",
        "Spotify streaming from anywhere on the WiFi, not just in Bluetooth range",
      ],
    },
    "For the amp I picked a Wuzhi board with built-in Bluetooth and a regular 3.5mm input as a fallback. It takes anywhere from 5 to 27V, claims a lot of output for its size, and was well reviewed. For Spotify, Raspotify on a spare Raspberry Pi — it turns the Pi into a Spotify Connect speaker, so any phone on the network can just pick it from the list and start playing.",
    {
      kind: "image",
      src: yardElectronics,
      full: yardElectronicsFull,
      alt: "The Wuzhi amplifier board wired to a Raspberry Pi 3B+ and a small Matek BEC on a desk, next to a yellow multimeter and two white 3D-printed enclosure panels.",
      caption: "Bench test: amp, Pi and BEC wired up, enclosure panels drying in the background.",
    },
    "First power-on surprised me — clean, powerful sound that fills the backyard without trying. What started as \"wire an amp to some speakers\" turned into a proper little project: drilling, soldering, 3D modeling and printing, surface finishing, and enough Linux config to make Spotify behave.",
    { kind: "heading", text: "Powering the Pi" },
    "A Raspberry Pi needs 5V, either through its USB port or its GPIO pins. I went with GPIO — a slimmer connection that keeps the whole thing feeling embedded rather than bolted together. Stepping down from a 20V 3A laptop supply, I reused a part I already trust: the Matek micro BEC from my FPV drone builds. Cheap, reliable, and small enough to disappear inside the enclosure.",
    "The Pi itself runs a standard headless Raspbian install — any model should work, I used a 3B+. Raspotify installs in a few commands and there are plenty of good tutorials for it, so I won't repeat the steps here. What's worth repeating are the things that cost me time finding out the hard way:",
    {
      kind: "list",
      items: [
        "the BEC has to supply enough current — 2A is a safe guide — without heating up",
        "insulate every wire and pad, especially the input voltage side: heat-shrink, electrical tape, whatever it takes",
        "enable the 3.5mm audio output in `raspi-config`",
        "check the volume is actually turned up, both in `alsamixer` and system-wide",
        "confirm the WiFi signal is solid at the install location, and note the Pi's IP address before you seal the box up",
      ],
    },
    { kind: "heading", text: "Enclosure box" },
    "I wanted the box simple to service: a cover that comes off without tools, but stays put during normal use. I'd seen a design elsewhere using flexible push-tabs that snap into slots, and this was a good excuse to try the technique myself. A few revisions later — mostly getting the tab flex and the slot depth to agree with each other — I had a base and cover that seated cleanly and held.",
    {
      kind: "image",
      src: yardDesign,
      full: yardDesignFull,
      alt: "A Fusion 360 render of the finished enclosure: a wood-textured cover with an ornate scrollwork vent cutout sitting on a white printed base, with a port opening in the side.",
      caption: "The final design in Fusion 360 — slots for the speaker leads, power input and volume knob.",
    },
    "I left cutouts for the speaker cables, the power input, and the volume knob, and modeled the whole thing in Fusion 360 (the f3d and STL files are on Thingiverse). The base is PETG, for the extra durability of a part that's going to sit outside and take the weight of everything screwed into it.",
    {
      kind: "image",
      src: yardBase,
      full: yardBaseFull,
      alt: "The Wuzhi amp and Raspberry Pi mounted inside the white 3D-printed PETG base, wired together with the volume knob and connectors accessible through the case cutouts.",
      caption: "Both boards seated in the printed base, wired and ready to close up.",
    },
    { kind: "heading", text: "Finish" },
    "The cover is a different material for a different reason: Hatchbox wood-fill PLA, sanded, stained, and finished with a shellac spray, so it reads as a small wooden box rather than obviously-printed plastic. Sanding brought out the layer-line grain enough that the stain took to it convincingly.",
    {
      kind: "image",
      src: yardUnstained,
      full: yardUnstainedFull,
      alt: "The wood-fill PLA cover fresh off the printer, unstained and pale, held up in direct sunlight to show the scrollwork vent cutouts.",
      caption: "Straight off the printer, before sanding and staining.",
    },
    {
      kind: "image",
      src: yardStained,
      full: yardStainedFull,
      alt: "The same cover after sanding, staining and a shellac finish, now a warm reddish-brown, held in a gloved hand outdoors.",
      caption: "After stain and shellac — the same piece, a different material entirely.",
    },
    "The last fiddly part was the audio cable out of the amp's 3.5mm jack: it needed a slim right-angle plug on both ends to fit the box without forcing the cover, and most of what's sold under that description isn't actually slim enough. A short one, a foot or so, with low-profile 90-degree connectors on both ends is what the box wants.",
    { kind: "heading", text: "Speaker installation" },
    "The speakers themselves are Yamaha NS-AW350B, bought years ago and still going strong — no noticeable weather damage after years outside at the old house. Mounting was straightforward: stucco anchors for both the speakers and the enclosure, 100 feet of 16-gauge speaker wire run along the patio, and a cord-mate raceway kit to keep it all off the wall instead of stapled to it.",
    {
      kind: "image",
      src: yardInstall,
      full: yardInstallFull,
      alt: "Two black Yamaha outdoor speakers mounted under a patio cover on either side of a sliding door, with a bare Raspberry Pi board screwed to the wall on a small bracket, wired but not yet enclosed.",
      caption: "Speakers up and wired in, the Pi still bare on the wall — the box came later.",
    },
    { kind: "heading", text: "Finishing touches" },
    {
      kind: "image",
      src: yardFinished,
      full: yardFinishedFull,
      alt: "The finished wood-stained enclosure mounted on the stucco wall under the patio cover, volume knob visible on its edge, speaker wire routed into a white cord-mate raceway above it.",
      caption: "Mounted, wired, and looking more like furniture than electronics.",
    },
    "It's been running for a week or two now, through several 90-plus-degree days, without the Pi so much as getting warm. It's reliable, responsive, and streaming over WiFi is a genuine upgrade over Bluetooth — no cutting out the moment I wander past the yard's edge, no keeping a phone parked nearby to hold the connection.",
    {
      kind: "image",
      src: yardSpotify,
      alt: "A phone screen showing Spotify playing Muse's Unnatural Selection, connected to a Spotify Connect device named Yard Speakers.",
      caption: "The whole point of the exercise: pick \"Yard Speakers\" from any phone on the network and go.",
    },
    "I was a little worried the Pi's own audio output would sound cheap, but for backyard listening and Spotify's own bitrate it's entirely adequate. If that ever changes there are plenty of USB sound boards with Pi support to drop in — I just don't see the need yet.",
  ],
};

export default post;
