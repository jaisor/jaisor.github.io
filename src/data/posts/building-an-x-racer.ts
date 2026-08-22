import type { Post } from "./index";
import xracerHero from "../../assets/posts/building-an-x-racer/hero.jpg";
import xracerArms from "../../assets/posts/building-an-x-racer/arms.jpg";
import xracerArmsFull from "../../assets/posts/building-an-x-racer/arms-hires.jpg";
import xracerCage from "../../assets/posts/building-an-x-racer/cage.jpg";
import xracerCageFull from "../../assets/posts/building-an-x-racer/cage-hires.jpg";
import xracerStack from "../../assets/posts/building-an-x-racer/stack.jpg";
import xracerStackFull from "../../assets/posts/building-an-x-racer/stack-hires.jpg";
import xracerFinished from "../../assets/posts/building-an-x-racer/finished.jpg";
import xracerFinishedFull from "../../assets/posts/building-an-x-racer/finished-hires.jpg";
import xracerLow from "../../assets/posts/building-an-x-racer/low.jpg";
import xracerLowFull from "../../assets/posts/building-an-x-racer/low-hires.jpg";
import xracerHand from "../../assets/posts/building-an-x-racer/hand.jpg";
import xracerHandFull from "../../assets/posts/building-an-x-racer/hand-hires.jpg";

const post: Post = {
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
    "The yard maiden flight went well. She felt fast, and a bit twitchy on Betaflight 2.5.3. Tuning and proper test flights next.",
    "Cross-posted to the [IntoFPV forum](https://intofpv.com/t-building-an-x-racer).",
  ],
};

export default post;
