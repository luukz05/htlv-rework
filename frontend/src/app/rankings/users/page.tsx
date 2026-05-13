import Sidebar from "@/components/Sidebar";
import { api } from "@/services/api";
import { resolvePageData } from "@/lib/resolve-page-data";
import UsersClient from "./UsersClient";
import RankingsNavTabs from "../NavTabs";

export const metadata = {
  title: "Users - XP Leaderboard | WikiHowl",
  description: "Top WikiHowl players ranked by XP and level across all minigames.",
};

export default async function UsersRankingPage() {
  const { leaderboard } = await resolvePageData({
    leaderboard: api.usersLeaderboard(100),
  });

  return (
    <main className="min-h-screen bg-bg-dark text-text-primary font-sans selection:bg-blue/30">
      <div className="mx-auto max-w-[1380px] px-4 py-8">
        <div className="mb-6 text-sm text-text-muted animate-fade-in">
          <a href="/" className="hover:text-text-secondary transition-colors">Home</a>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary font-medium">Rankings</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold">Users XP Leaderboard</h1>
            <p className="text-sm text-text-muted">Top WikiHowl players by total XP earned across minigames</p>
          </div>
        </div>

        <RankingsNavTabs />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <UsersClient initialUsers={leaderboard} />
          </div>

          <aside className="w-full lg:w-[350px] space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}
