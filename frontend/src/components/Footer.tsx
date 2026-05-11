import Link from "next/link";

export default function Footer() {
  const footerSections = [
    {
      title: "Core",
      links: [
        { label: "News", href: "/news" },
        { label: "Matches", href: "/matches" },
        { label: "Results", href: "/results" },
        { label: "Events", href: "/events" },
      ],
    },
    {
      title: "Database",
      links: [
        { label: "Players", href: "/rankings/players" },
        { label: "Rankings", href: "/rankings" },
        { label: "Galleries", href: "/galleries" },
        { label: "Highlights", href: "/highlights" },
        { label: "Maps", href: "/maps" },
        { label: "Hall of Fame", href: "/hall-of-fame" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Forums", href: "/forums" },
        { label: "Academy", href: "/academy" },
        { label: "Fantasy", href: "/fantasy" },
        { label: "Games", href: "/games" },
        { label: "Betting", href: "/betting" },
      ],
    },
  ];

  return (
    <footer className="mt-16 border-t border-border bg-bg-surface">
      <div className="mx-auto max-w-[1460px] px-4 sm:px-5 pb-6 pt-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-3 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M6 8h5v16H6zM13 14h5v10h-5zM20 10h5v14h-5z" fill="#2563eb" />
              </svg>
              <span className="text-base font-bold">HLTV.org</span>
            </Link>
            <p className="text-sm leading-relaxed text-text-muted">
              The leading CS2 news and coverage site in the world, providing depth and passion to esports since 2002.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">
                {section.title}
              </h4>
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-muted transition-colors hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-5 text-xs text-text-muted">
          <span>&copy; 2026 HLTV.org. All rights reserved. Professional Counter-Strike coverage.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-text-secondary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-text-secondary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
