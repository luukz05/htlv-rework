/* eslint-disable @next/next/no-img-element */
import Sidebar from "@/components/Sidebar";
import { api } from "@/services/api";
import { resolvePageData } from "@/lib/resolve-page-data";
import StatsClient from "./StatsClient";
import RankingsNavTabs from "../NavTabs";

export const metadata = {
  title: "Players - Stats and Profiles | WikiHowl",
  description: "Comprehensive performance data for professional CS2 players",
};

export default async function PlayersPage() {
  const { topPlayers } = await resolvePageData({
    topPlayers: api.topPlayers(),
  });

  return (
    <main className="min-h-screen bg-bg-dark text-text-primary font-sans selection:bg-blue/30">
      <div className="mx-auto max-w-[1380px] px-4 py-8">
        {/* Breadcrumb - Standardized */}
        <div className="mb-6 text-sm text-text-muted animate-fade-in">
          <a href="/" className="hover:text-text-secondary transition-colors">Home</a>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary font-medium">Rankings</span>
        </div>

        {/* Title - Standardized */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold">Player Global Ranking</h1>
            <p className="text-sm text-text-muted">Top CS2 players by performance</p>
          </div>
        </div>

        <RankingsNavTabs />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <StatsClient initialPlayers={topPlayers} />
          </div>

          <aside className="w-full lg:w-[350px] space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}