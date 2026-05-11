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
        { label: "Rankings", href: "/rankings/teams" },
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
    <footer className="mt-10 border-t border-border bg-bg-surface sm:mt-16">
      <div className="mx-auto max-w-[1460px] px-4 pb-5 pt-6 sm:px-5 sm:pb-6 sm:pt-10">
        <div className="mb-6 grid grid-cols-3 gap-x-3 gap-y-5 sm:mb-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-3 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-2 flex items-center gap-2 sm:mb-3">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M6 8h5v16H6zM13 14h5v10h-5zM20 10h5v14h-5z" fill="#2563eb" />
              </svg>
              <span className="text-base font-bold">HLTV.org</span>
            </Link>
            <p className="text-[13px] leading-snug text-text-muted sm:text-sm sm:leading-relaxed">
              The leading CS2 news and coverage site in the world, providing depth and passion to esports since 2002.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-1.5 sm:gap-2">
              <h4 className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary sm:mb-1 sm:text-xs">
                {section.title}
              </h4>
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] text-text-muted transition-colors hover:text-text-primary sm:text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-4 text-center text-[11px] text-text-muted sm:flex-row sm:gap-3 sm:pt-5 sm:text-left sm:text-xs">
          <span>&copy; 2026 HLTV.org. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
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
