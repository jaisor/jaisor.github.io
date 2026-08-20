import type { IconType } from "react-icons";
import { SiGithub, SiInstagram, SiYoutube, SiFacebook } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export interface SocialLink {
  label: string;
  url: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/jaisor", icon: SiGithub },
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
  { label: "LinkedIn", url: "https://www.linkedin.com/in/jaisor", icon: FaLinkedin },
  {
    label: "Facebook",
    url: "https://www.facebook.com/jordan.marinov.7",
    icon: SiFacebook,
  },
];
