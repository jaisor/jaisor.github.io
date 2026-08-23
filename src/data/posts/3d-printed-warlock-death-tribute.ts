import type { Post } from "./index";
import warlockHero from "../../assets/posts/3d-printed-warlock-death-tribute/hero.jpg";
import warlockDryfit from "../../assets/posts/3d-printed-warlock-death-tribute/dryfit.jpg";
import warlockDryfitFull from "../../assets/posts/3d-printed-warlock-death-tribute/dryfit-hires.jpg";
import warlockParts from "../../assets/posts/3d-printed-warlock-death-tribute/parts.jpg";
import warlockPartsFull from "../../assets/posts/3d-printed-warlock-death-tribute/parts-hires.jpg";
import warlockFrets from "../../assets/posts/3d-printed-warlock-death-tribute/frets.jpg";
import warlockFretsFull from "../../assets/posts/3d-printed-warlock-death-tribute/frets-hires.jpg";
import warlockPrimer from "../../assets/posts/3d-printed-warlock-death-tribute/primer.jpg";
import warlockPrimerFull from "../../assets/posts/3d-printed-warlock-death-tribute/primer-hires.jpg";
import warlockDetail from "../../assets/posts/3d-printed-warlock-death-tribute/detail.jpg";
import warlockDetailFull from "../../assets/posts/3d-printed-warlock-death-tribute/detail-hires.jpg";
import warlockBack from "../../assets/posts/3d-printed-warlock-death-tribute/back.jpg";
import warlockBackFull from "../../assets/posts/3d-printed-warlock-death-tribute/back-hires.jpg";
import warlockFinished from "../../assets/posts/3d-printed-warlock-death-tribute/finished.jpg";
import warlockFinishedFull from "../../assets/posts/3d-printed-warlock-death-tribute/finished-hires.jpg";

const post: Post = {
  slug: "3d-printed-warlock-death-tribute",
  title: "A 3D-printed Warlock, splattered in blood",
  date: "2026-07-30",
  excerpt:
    "A B.C. Rich Warlock body printed in sections, bonded, filled and primed, then finished in House of Kolor candy red — a Death tribute built as a gift for a family friend's son, an honorary nephew of mine.",
  tags: ["guitars", "3d-printing"],
  image: warlockHero,
  body: [
    "The kid (teenager actually) is a huge Death fan, and somewhere between \"I could probably print that\" and \"This will never work\", it turned into a full build.",
    "The body is [this B.C. Rich Warlock model](https://makerworld.com/en/models/701362-bc-rich-warlock-a1-mini-guitar-body-single-pickup#profileId-630884) from MakerWorld — single-pickup version. It comes split into sections to be printed separately depending on the available print volume. Everything else is off-the-shelf guitar parts: a bought neck, a double-locking tremolo, and tuners.",
    {
      kind: "image",
      src: warlockDryfit,
      full: warlockDryfitFull,
      alt: "The raw white printed guitar body on a workbench with the neck, bridge and a pickup dry-fitted in place.",
      caption:
        "Dry fit first. Insurance before glue and paint.",
    },
    { kind: "heading", text: "Printing and bonding" },
    "Printing a body in sections means the real work starts after the printer stops. I glued the pieces with J-B Weld Plastic Bonder, which is the part of the build with no undo button — the seams have to line up, because a guitar body out of alignment at the neck pocket is firewood. This one would not even qualify for that because it is made out of plastic.",
    "The honeycomb interior is part of the model, not a slicer setting, and it stays open by design. It keeps the body light and it looks deliberate once the paint is on.",
    {
      kind: "image",
      src: warlockParts,
      full: warlockPartsFull,
      alt: "Printed body sections laid out on a workbench, showing the open honeycomb interior, next to a can of J-B Weld Plastic Bonder, filler primer and a sanding block.",
      caption: "The whole supporting cast: bonder, filler primer, sanding block.",
    },
    { kind: "heading", text: "Making printed parts not look printed" },
    "This is the unglamorous majority of the project. Rustoleum filler primer, sand, look at it under a light, find every layer line you missed, primer again. Repeat until the surface reads as a solid object instead of a stack of extrusions.",
    {
      kind: "note",
      label: "What actually matters",
      text: "Nobody will ever notice the hours of sanding. They will notice the one layer line you left under a gloss coat.",
    },
    {
      kind: "image",
      src: warlockPrimer,
      full: warlockPrimerFull,
      alt: "The guitar body hanging in a spray booth, coated in gray filler primer, with the neck masked off.",
      caption: "Gray primer is the honest coat — it shows you everything you skipped.",
    },
    "The neck got a proper fret job, as every fret was masked off individually, then leveled, crowned, rounded and polished. The fretboard was scrubbed with 0000 steel wool and conditioned with F-One oil.",
    {
      kind: "image",
      src: warlockFrets,
      full: warlockFretsFull,
      alt: "A guitar fretboard with blue and yellow masking tape applied between every fret, exposing only the fret wire.",
      caption: "Twenty-four frets, forty-eight pieces of tape, and a can of elbow grease.",
    },
    { kind: "heading", text: "The blood" },
    "White base coat, then Apple Red Kandy from House of Kolor for the blood. Candy is the right choice here as it stacks on itself. Every pass over the same spot goes deeper and darker, so a single color gives you thin arterial spray and thick pooling clots without ever mixing a second red. The Apple Red also happens to land almost exactly on the color of the real thing.",
    "There is no clever technique for the pattern. We loaded brushes and flicked and splattered the paint at the body by hand, which is enormously satisfying and completely uncontrollable. My garage woodshop looked like a murder scene by the end of it.",
    "Check out my attempts at making a [horror flick](https://www.youtube.com/shorts/S2uFrwL09KM) before cleaning up the mess.",
    {
      kind: "image",
      src: warlockDetail,
      full: warlockDetailFull,
      alt: "Close-up of the finished guitar body: white with heavy red splatter across the honeycomb cutouts, a white pickup and a black tremolo bridge.",
      caption:
        "The final result came together beautifully, paired with a matching red knob and killswitch, and a Death logo sticker.",
    },
    { kind: "heading", text: "The pickup" },
    "The last piece was the one that makes it a Death guitar. We splurged on a white DiMarzio X2N — the same pickup the late Chuck Schuldiner, Death's guitarist and vocalist, ran in his iconic B.C. Rich.",
    "The result was exactly what we were aiming for. The build was fun and creative, pushing me into a new area of guitar making and dealing with a 3D-printed plastic body for the first time.",
    {
      kind: "image",
      src: warlockBack,
      full: warlockBackFull,
      alt: "The back of the finished guitar, showing splatter running the full length of the neck and the Death logo on the lower body.",
      caption: "The splatter carries over the back and up the neck.",
    },
    {
      kind: "image",
      src: warlockFinished,
      full: warlockFinishedFull,
      alt: "The finished guitar standing on a stand: white blood-splattered Warlock body, skull-and-crossbones fret markers and black hardware.",
      caption: "Delivered.",
    },
  ],
};

export default post;
