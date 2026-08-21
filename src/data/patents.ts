export interface Patent {
  number: string;
  title: string;
  description: string;
  url: string;
}

export const patents: Patent[] = [
  {
    number: "9,684,579",
    title: "Test device selection using multi-pass scoring",
    description:
      "A method for automatically picking the best available device to run a software test across a large device farm — filtering candidates by the test's requirements, then scoring them on live state (idle vs. busy, pending backlog, time since last use) to route each test to whichever device gets it done fastest.",
    url: "https://patents.google.com/patent/US9684579",
  },
  {
    number: "9,513,762",
    title: "Static content updates",
    description:
      "A way to push updated content — UI assets, images, translations — into an already-installed app without shipping a whole new build. Updates are verified against a manifest and integrity checks before being applied, with an automatic fallback to the original content if anything doesn't check out.",
    url: "https://patents.google.com/patent/US9513762",
  },
  {
    number: "8,930,575",
    title:
      "Service for automatically converting content submissions to submission formats used by content marketplaces",
    description:
      "A broker service that takes one standardized content submission from a creator and automatically reformats it to match the different file, metadata, and packaging requirements of each app store or content marketplace it gets published to.",
    url: "https://patents.google.com/patent/US8930575",
  },
];
