import type { IconType } from "react-icons";
import { SiGithub, SiInstagram, SiYoutube, SiBambulab } from "react-icons/si";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

export interface SocialLink {
  label: string;
  /**
   * An `http(s):` profile or a `mailto:`. `Header` opens only the
   * former in a new tab — a `mailto:` with `target="_blank"` leaves a
   * blank tab behind once the mail client takes over.
   */
  url: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/jaisor", icon: SiGithub },
  {
    label: "Makerworld",
    url: "https://makerworld.com/en/@jaisor",
    icon: SiBambulab,
  },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/jaisor", icon: FaLinkedin },
  {
    label: "YouTube",
    url: "https://www.youtube.com/channel/UCVHbnEiLt9DymbX9XdnYadQ",
    icon: SiYoutube,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/jaisorbl/",
    icon: SiInstagram,
  },
  { label: "Email", url: "mailto:jaisor@gmail.com", icon: FaEnvelope },
];
