import Link from "next/link";
import { api } from "@/services/api";
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

async function resolvePageData<T extends Record<string, Promise<unknown>>>(
  promises: T,
) {
  const entries = await Promise.all(
    Object.entries(promises).map(async ([key, promise]) => [
      key,
      await promise,
    ]),
  );

  return Object.fromEntries(entries) as {
    [K in keyof T]: Awaited<T[K]>;
  };
}