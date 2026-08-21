export interface Patent {
  number: string;
  title: string;
  url: string;
}

export const patents: Patent[] = [
  {
    number: "9,684,579",
    title: "Test device selection using multi-pass scoring",
    url: "https://patents.google.com/patent/US9684579",
  },
  {
    number: "9,513,762",
    title: "Static content updates",
    url: "https://patents.google.com/patent/US9513762",
  },
  {
    number: "8,930,575",
    title:
      "Service for automatically converting content submissions to submission formats used by content marketplaces",
    url: "https://patents.google.com/patent/US8930575",
  },
];
