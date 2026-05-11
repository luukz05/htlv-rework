import PlayerDetailClient from "./PlayerDetailClient";
import { api } from "@/services/api";
import { resolvePageData } from "@/lib/resolve-page-data";
import { notFound } from "next/navigation";

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
    notFound();
  }

  return (
    <>
      <PlayerDetailClient player={p} />
    </>
  );
}