import Link from "next/link";
import { api } from "@/services/api";
import { resolvePageData } from "@/lib/resolve-page-data";
import HighlightsClient from "./HighlightsClient";

export const metadata = {
  title: "Highlights - Top Plays",
};

export default async function HighlightsPage() {
  const { highlights } = await resolvePageData({
    highlights: api.highlights(),
  });

  return (
    <main className="mx-auto max-w-[1380px] px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-text-muted">
        <Link href="/" className="hover:text-text-secondary">
          Home
        </Link>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-text-primary">Highlights</span>
      </div>

      <h1 className="mb-2 text-2xl font-bold">Best Plays & Highlights</h1>

      <p className="mb-6 text-sm text-text-secondary">
        The most insane plays from professional CS2 matches
      </p>

      <HighlightsClient highlights={highlights} />
    </main>
  );
}