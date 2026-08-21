import { ChevronDown } from "lucide-react";
import profile from "../assets/profile.jpg";
import { socialLinks } from "../data/social";

export function Header() {
  return (
    <header
      id="home"
      className="relative flex min-h-screen snap-start flex-col items-center justify-center gap-6 px-6 text-center lg:gap-8"
    >
      <img
        src={profile}
        alt="Jordan Marinov"
        width={128}
        height={128}
        className="h-32 w-32 rounded-full object-cover ring-4 ring-amber-500/30 shadow-lg shadow-black/40 lg:h-40 lg:w-40"
      />

      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Jordan Marinov
        </h1>
        <div className="mt-3 max-w-xl space-y-4 text-neutral-400 lg:mt-5 lg:max-w-2xl lg:text-lg">
          <p className="text-balance">
            I am a technology executive with decades of experience building large-scale backend systems, hybrid cloud 
            infrastructure, remote fleet management, web and mobile applications. I love elegant simplicity, proof 
            through data, scaling smart, and moving fast.
          </p>
          <p className="text-balance">
            Currently, I am an Engineering Director at PayPal, responsible for the Promotions Platform powering incentive 
            campaigns and rewards across PayPal and Venmo. Previously, I led core technology teams at Honey, 
            Atom Tickets, and Amazon.
          </p>
          <p className="text-balance">
            Personally, I continue to build and explore the latest tech. tools. I am fascinatged by the intersection of 
            software and hardware, and I enjoy tinkering with IoT devices, robotics, and embedded systems. The current AI 
            revolution is particularly exciting, with its potential to accelerate and transform innovation.
          </p>
        </div>
      </div>

      <nav
        className="flex items-center gap-4 lg:gap-6"
        aria-label="Social links"
      >
        {socialLinks.map(({ label, url, icon: Icon }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noreferrer"
            title={label}
            className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-900 hover:text-amber-400 lg:p-3"
          >
            <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="sr-only">{label}</span>
          </a>
        ))}
      </nav>

      <ChevronDown
        aria-hidden
        className="absolute bottom-10 h-6 w-6 animate-bounce text-neutral-600 lg:h-7 lg:w-7"
      />
    </header>
  );
}
