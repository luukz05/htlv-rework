export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 pb-6 pt-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {/* Brand */}
          <div>
            <a href="#" className="mb-3 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M6 8h5v16H6zM13 14h5v10h-5zM20 10h5v14h-5z" fill="#2563eb"/>
              </svg>
              <span className="text-base font-bold">HLTV.org</span>
            </a>
            <p className="text-sm leading-relaxed text-text-muted">
              The leading CS2 news and coverage site in the world, providing depth and passion to esports since 2002.
            </p>
          </div>

          {[
            { title: "Core", links: ["News", "Matches", "Results", "Events"] },
            { title: "Database", links: ["Stats", "Rankings", "Galleries", "Videos"] },
            { title: "Community", links: ["Forums", "Betting", "Support", "Jobs"] },
          ].map((col) => (
            <div key={col.title} className="flex flex-col gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">
                {col.title}
              </h4>
              {col.links.map((link) => (
                <a key={link} href="#" className="text-sm text-text-muted transition-colors hover:text-text-primary">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-5 text-xs text-text-muted">
          <span>&copy; 2026 HLTV.org. All rights reserved. Professional Counter-Strike coverage.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text-secondary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
