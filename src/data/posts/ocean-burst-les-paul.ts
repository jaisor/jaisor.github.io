import type { Post } from "./index";
import oceanHero from "../../assets/posts/ocean-burst-les-paul/hero.jpg";
import oceanProblem from "../../assets/posts/ocean-burst-les-paul/problem.jpg";
import oceanProblemFull from "../../assets/posts/ocean-burst-les-paul/problem-hires.jpg";
import oceanPaints from "../../assets/posts/ocean-burst-les-paul/paints.jpg";
import oceanPaintsFull from "../../assets/posts/ocean-burst-les-paul/paints-hires.jpg";
import oceanAirbrushing from "../../assets/posts/ocean-burst-les-paul/airbrushing.jpg";
import oceanAirbrushingFull from "../../assets/posts/ocean-burst-les-paul/airbrushing-hires.jpg";
import oceanBurst from "../../assets/posts/ocean-burst-les-paul/burst.jpg";
import oceanBurstFull from "../../assets/posts/ocean-burst-les-paul/burst-hires.jpg";
import oceanFrets from "../../assets/posts/ocean-burst-les-paul/frets.jpg";
import oceanFretsFull from "../../assets/posts/ocean-burst-les-paul/frets-hires.jpg";
import oceanWiring from "../../assets/posts/ocean-burst-les-paul/wiring.jpg";
import oceanWiringFull from "../../assets/posts/ocean-burst-les-paul/wiring-hires.jpg";
import oceanGloss from "../../assets/posts/ocean-burst-les-paul/gloss.jpg";
import oceanGlossFull from "../../assets/posts/ocean-burst-les-paul/gloss-hires.jpg";
import oceanHeadstock from "../../assets/posts/ocean-burst-les-paul/headstock.jpg";
import oceanHeadstockFull from "../../assets/posts/ocean-burst-les-paul/headstock-hires.jpg";
import oceanNeckColor from "../../assets/posts/ocean-burst-les-paul/neck-color.jpg";
import oceanNeckColorFull from "../../assets/posts/ocean-burst-les-paul/neck-color-hires.jpg";
import oceanNeckBack from "../../assets/posts/ocean-burst-les-paul/neck-back.jpg";
import oceanNeckBackFull from "../../assets/posts/ocean-burst-les-paul/neck-back-hires.jpg";
import oceanBurstFullShot from "../../assets/posts/ocean-burst-les-paul/burst-full.jpg";
import oceanBurstFullShotFull from "../../assets/posts/ocean-burst-les-paul/burst-full-hires.jpg";
import oceanProfile from "../../assets/posts/ocean-burst-les-paul/profile.jpg";
import oceanProfileFull from "../../assets/posts/ocean-burst-les-paul/profile-hires.jpg";
import oceanStudio from "../../assets/posts/ocean-burst-les-paul/studio.jpg";
import oceanStudioFull from "../../assets/posts/ocean-burst-les-paul/studio-hires.jpg";
import oceanIndoors from "../../assets/posts/ocean-burst-les-paul/indoors.jpg";
import oceanIndoorsFull from "../../assets/posts/ocean-burst-les-paul/indoors-hires.jpg";
import oceanDelivered from "../../assets/posts/ocean-burst-les-paul/delivered.jpg";
import oceanDeliveredFull from "../../assets/posts/ocean-burst-les-paul/delivered-hires.jpg";

const post: Post = {
  slug: "ocean-burst-les-paul",
  title: "A Les Paul that looks like the ocean",
  date: "2023-09-04",
  excerpt:
    "My third guitar kit build, made as a gift for a friend who wanted something that \"looks like the ocean.\" A botched dye job pushed me into learning to airbrush for the first time — the finish came out better than anything I'd built before it.",
  tags: ["guitars"],
  image: oceanHero,
  body: [
    "This was my third guitar kit build, made as a gift for a good friend from work. His main request going in was that it should \"look like the ocean or the beach\" — vague enough to give me some creative buffer to absorb any mishaps along the way.",
    { kind: "heading", text: "A rough start" },
    "The kit's body showed up in worse shape than usual — patched and marked up under the veneer, with many flaws. I mixed a green and blue TransTint dye, hoping it would hide the problems, but instead it accented them.",
    {
      kind: "image",
      src: oceanProblem,
      full: oceanProblemFull,
      alt: "The guitar body early in the dye process, showing blotchy areas and glued-over parts of the veneer.",
      caption: "The wood came patched and marked up, and the first dye pass didn't hide any of it.",
    },
    "The color went on blotchy and uneven, showing every defect in the veneer. I sanded the middle back toward bare wood, then reapplied a lighter pass of the same green dye there, letting some of the natural mahogany show through the center. It helped, but I now had a body that was dyed, sanded, half-dyed again, and still not right.",
    { kind: "heading", text: "Learning to airbrush" },
    "I'd never touched an airbrush before this build. Frustrated, I picked up an airbrush set and some acrylics and started layering color on top of the dye, learning as I went.",
    {
      kind: "image",
      src: oceanPaints,
      full: oceanPaintsFull,
      alt: "Three bottles of ARTME airbrush paint on a plastic-covered workbench, labeled Black, Leaf Green, and Prussian Blue.",
      caption: "The palette: leaf green fading into Prussian blue, with black to hide the rest.",
    },
    "Leaf green into Prussian blue, then black around the edges — partly to build the burst, partly to bury the last of the patch marks I hadn't sanded out.",
    {
      kind: "image",
      src: oceanAirbrushing,
      full: oceanAirbrushingFull,
      alt: "A hand holding an airbrush, spraying blue-green paint onto the guitar body, the color gradient already visible across the surface.",
      caption: "My first time ever holding an airbrush.",
    },
    "I was realistically expecting the body to end up as firewood, but the airbrush really saved it. The layering over the stain actually looked like a shallow lagoon surrounded by deepening ocean.",
    {
      kind: "image",
      src: oceanBurst,
      full: oceanBurstFull,
      alt: "The guitar body held up poolside, showing a deep blue-to-green burst with wood grain still visible underneath the color.",
      caption: "Once the burst settled in, it actually looked the part.",
    },
    "The neck got the same layered treatment, fading green into blue along the back of it.",
    {
      kind: "image",
      src: oceanNeckColor,
      full: oceanNeckColorFull,
      alt: "The back of the guitar neck freshly airbrushed in a green-to-blue burst, propped up to dry next to the airbrush and paint bottles.",
      caption: "The back of the neck, fresh off the airbrush.",
    },
    { kind: "heading", text: "The rest fell into place" },
    "Once the body worked, everything else was just execution. Every fret got masked off individually for a proper level, crown and polish.",
    {
      kind: "image",
      src: oceanFrets,
      full: oceanFretsFull,
      alt: "A guitar neck with blue and yellow masking tape applied between every fret, exposing only the fret wire for leveling and polishing.",
      caption: "Every fret masked off individually for the level, crown and polish.",
    },
    {
      kind: "list",
      items: [
        "locking tuners in place of the stock hardware, for tuning stability",
        "a Graphtech nut swapped in for the stock plastic one",
        "copper foil shielding lining every cavity, to kill noise",
        "a Seymour Duncan Seth Lover humbucker set",
      ],
    },
    "The Seth Lover set was the splurge. It's a faithful PAF reissue, wound on Seymour Duncan's original 1950s coil winder with unpotted coils, which gives it a clear, articulate voice and a warm midrange rather than a scooped, modern one.",
    {
      kind: "image",
      src: oceanWiring,
      full: oceanWiringFull,
      alt: "A collage of four photos: a Seymour Duncan Seth Lover humbucker set box next to the neck with copper foil lining both pickup routes, the mahogany back with a wire threaded through it, a close-up of the copper-shielded cavity, and the finished neck and body laid side by side.",
      caption: "Copper shielding in every cavity, and a Seymour Duncan Seth Lover set going in.",
    },
    { kind: "heading", text: "The finish" },
    "I wanted a clear coat deep enough to match the color underneath, and started with Solarez ICBINL — a UV-cure resin that hardens rock solid in about a minute under direct sun. It's forgiving in some ways and maddening in others: fisheye, orange peel, and after level sanding I could still see every layer underneath, which I now think came from silicone residue off the microfiber towels I was wiping it down with between coats.",
    {
      kind: "warn",
      label: "SprayMax 2K Clear Glamour",
      text: "I never fully solved the Solarez issues, so I finished the job with SprayMax 2K instead. It lays down beautifully, but it's genuinely toxic — full respirator, gloves and a protective suit, and I sprayed it outdoors on the street rather than anywhere near the garage.",
    },
    "It blended cleanly with the Solarez layers underneath and finally gave me a surface I could level sand without seeing through it.",
    {
      kind: "image",
      src: oceanGloss,
      full: oceanGlossFull,
      alt: "The guitar body and neck dry-fitted together on a workbench, the clear coat now glass-glossy and throwing sharp reflections.",
      caption: "Buffed out, and finally looking like glass instead of plastic wrap.",
    },
    {
      kind: "image",
      src: oceanNeckBack,
      full: oceanNeckBackFull,
      alt: "The back of the finished neck and body, plain mahogany fading into the green-blue burst partway up the neck, a purple neck plate and back cover visible.",
      caption: "The back stayed plain mahogany, with the burst carrying up the neck.",
    },
    "The neck and headstock were finished with the same colors and a bit of a burst there too, complimenting the marine look. I added my 'logo', which originally started as a joke but has become a signature of sorts.",
    {
      kind: "image",
      src: oceanHeadstock,
      full: oceanHeadstockFull,
      alt: "Close-up of the headstock, showing the blue-to-green burst finish and the JAISOR logo in black against a jade plant background.",
      caption: "The JAISOR logo — every build gets one.",
    },
    { kind: "heading", text: "Conclusion" },
    "My friend picked it up a few days later, and from what I could tell, entirely approved. If I'm honest, I credit a fair amount of this build to luck rather than skill — a bad dye job, an airbrush I'd never held before, a clear coat that fought me the whole way. But I'd rather be lucky than good, and this one came out better than anything I'd built before it.",
    "A few more shots of it finished, before it left my garage for good:",
    {
      kind: "image",
      src: oceanBurstFullShot,
      full: oceanBurstFullShotFull,
      alt: "Three-quarter view of the finished guitar body outdoors, showing the full blue-to-green burst top with pickups, bridge and gold knobs.",
      caption: "The full burst, in the sun.",
    },
    {
      kind: "image",
      src: oceanProfile,
      full: oceanProfileFull,
      alt: "The finished guitar tilted on its stand outdoors, headstock at the top and the burst body filling the bottom of the frame, greenery in the background.",
      caption: "Neck to body, one continuous burst.",
    },
    {
      kind: "image",
      src: oceanStudio,
      full: oceanStudioFull,
      alt: "The finished guitar laid diagonally across a wrinkled fabric backdrop, headstock at the top left and body at the bottom right.",
      caption: "Off the stand, for once.",
    },
    {
      kind: "image",
      src: oceanIndoors,
      full: oceanIndoorsFull,
      alt: "The finished guitar leaning against a wooden dresser in a room lit with purple light, an amp behind it.",
      caption: "Back home, waiting to be picked up.",
    },
    {
      kind: "image",
      src: oceanDelivered,
      full: oceanDeliveredFull,
      alt: "A man sitting and playing the finished guitar in a room lit with purple light, a pink guitar strap slung over a stand behind him.",
      caption: "Delivered, and immediately put to work.",
    },
  ],
};

export default post;
