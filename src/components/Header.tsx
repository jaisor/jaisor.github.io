import profile from "../assets/profile.jpg";
import { socialLinks } from "../data/social";

export function Header() {
  return (
    <header className="flex flex-col items-center gap-6 text-center">
      <img
        src={profile}
        alt="Jordan Marinov"
        width={128}
        height={128}
        className="h-32 w-32 rounded-full object-cover ring-4 ring-white shadow-lg dark:ring-slate-800"
      />

      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Jordan Marinov
        </h1>
        <p className="mt-3 max-w-xl text-balance text-slate-600 dark:text-slate-400">
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
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Icon size={20} />
            <span className="sr-only">{label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
