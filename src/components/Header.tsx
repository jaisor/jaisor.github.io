import profile from "../assets/profile.jpg";
import { socialLinks } from "../data/social";
import { ScrollCue } from "./ScrollCue";

export function Header() {
  return (
    <header
      id="home"
      className="flex min-h-screen snap-start flex-col items-center justify-center gap-6 px-6 text-center lg:gap-8"
    >
      <img
        src={profile}
        alt="Jordan Marinov"
        width={152}
        height={152}
        className="h-38 w-38 rounded-full object-cover ring-4 ring-amber-500/30 shadow-lg shadow-black/40 lg:h-48 lg:w-48"
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

      <ScrollCue targetId="about" label="About Me" />
    </header>
  );
}
