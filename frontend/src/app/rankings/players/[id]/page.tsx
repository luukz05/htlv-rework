import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import PlayerDetailClient from "./PlayerDetailClient";
import { api } from "@/services/api";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const playerProfiles = await api.players();
  const player = playerProfiles.find((pl) => pl.id.toString() === id);

  return {
    title: player ? `${player.nickname} (${player.team}) - Rating ${player.rating2.toFixed(2)}` : "Player not found",
    description: player?.bio,
  };
}

export default async function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { playerProfiles } = await resolvePageData({
    playerProfiles: api.players(),
  });

  const { id } = await params;
  const p = playerProfiles.find((pl) => pl.id.toString() === id);

  if (!p) {
    return (<><Header /><main className="mx-auto max-w-[800px] px-5 py-16 text-center"><h1 className="text-2xl font-bold mb-4">Player not found</h1><Link href="/rankings/players" className="text-blue-light">Back to Players</Link></main><Footer /></>);
  }

  return (
    <>
      <PlayerDetailClient player={p} />
    </>
  );
}

async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(Object.entries(promises).map(async ([key, promise]) => [key, await promise]));
  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
}
