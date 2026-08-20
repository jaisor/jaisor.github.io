import { ChevronDown } from "lucide-react";
import profile from "../assets/profile.jpg";
import { socialLinks } from "../data/social";

export function Header() {
  return (
    <header
      id="home"
      className="relative flex min-h-screen snap-start flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <img
        src={profile}
        alt="Jordan Marinov"
        width={128}
        height={128}
        className="h-32 w-32 rounded-full object-cover ring-4 ring-amber-500/30 shadow-lg shadow-black/40"
      />

      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Jordan Marinov
        </h1>
        <p className="mt-3 max-w-xl text-balance text-neutral-400">
          IT professional building, managing, and leading software teams
          across backend systems, cloud computing, big data, DevOps, remote
          fleet administration, and mobile applications. Previously at
          PayPal, Honey, Atom Tickets, Amazon, and OvernightPrints.com.
          Holder of three U.S. patents in device testing and content
          management. Educated in California and Bulgaria.
        </p>
      </div>

      <nav className="flex items-center gap-4" aria-label="Social links">
        {socialLinks.map(({ label, url, icon: Icon }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noreferrer"
            title={label}
            className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-900 hover:text-amber-400"
          >
            <Icon size={20} />
            <span className="sr-only">{label}</span>
          </a>
        ))}
      </nav>

      <ChevronDown
        aria-hidden
        className="absolute bottom-10 h-6 w-6 animate-bounce text-neutral-600"
      />
    </header>
  );
}
