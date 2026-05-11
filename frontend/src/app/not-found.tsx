import Link from "next/link";
import { CalendarDays, Home, Newspaper, Trophy } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Matches", href: "/matches", icon: CalendarDays },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Rankings", href: "/rankings/players", icon: Trophy },
];

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[68vh] max-w-[1380px] flex-col px-4 py-8">
      <nav className="mb-6 text-sm text-text-muted">
        <Link href="/" className="transition-colors hover:text-text-secondary">
          Home
        </Link>
        <span className="mx-2">&rsaquo;</span>
        <span className="font-medium text-text-primary">Page not found</span>
      </nav>

      <section className="flex flex-1 flex-col justify-center py-12">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-text-muted">
          404 / Not found
        </p>
        <h1 className="max-w-3xl text-3xl font-black tracking-tight text-text-primary md:text-5xl">
          The requested page could not be found.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-text-secondary md:text-base">
          This route does not exist, has been moved, or is not available in this build.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 text-sm font-bold text-text-secondary transition-colors hover:text-blue-light"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
