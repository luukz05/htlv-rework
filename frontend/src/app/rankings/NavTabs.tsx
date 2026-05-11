"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RankingsNavTabs() {
  const pathname = usePathname() || "";

  const tabs = [
    { label: "Teams", href: "/rankings/teams" },
    { label: "Players", href: "/rankings/players" },
  ];

  return (
    <div className="flex gap-0 mb-8 border-b border-border overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center ${
              isActive ? "text-blue-light" : "text-text-muted hover:text-text-primary"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-light rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
