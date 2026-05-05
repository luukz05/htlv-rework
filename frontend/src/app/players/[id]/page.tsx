import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { playerProfiles } from "@/data/mock";
import PlayerDetailClient from "./PlayerDetailClient";

export function generateStaticParams() {
  return playerProfiles.map((p) => ({ id: p.id.toString() }));
}

export default async function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = playerProfiles.find((pl) => pl.id.toString() === id);

  if (!p) {
    return (<><Header /><main className="mx-auto max-w-[800px] px-5 py-16 text-center"><h1 className="text-2xl font-bold mb-4">Player not found</h1><Link href="/players" className="text-blue-light">Back to Players</Link></main><Footer /></>);
  }

  return (
    <>
      <Header />
      <PlayerDetailClient player={p} />
      <Footer />
    </>
  );
}
