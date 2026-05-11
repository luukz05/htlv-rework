import { api } from "@/services/api";
import ResultsClient from "./ResultsClient";

export const metadata = {
  title: "Results - Latest Scores",
};

export default async function ResultsPage() {
  const { recentResults } = await resolvePageData({
    recentResults: api.results(),
  });

  return (
    <main className="mx-auto max-w-[1380px] px-4 py-8">
      <div className="mb-6 text-sm text-text-muted">
        <a href="#" className="hover:text-text-secondary">Home</a><span className="mx-2">&rsaquo;</span><span className="text-text-primary">Results</span>
      </div>
      <h1 className="mb-8 text-2xl font-bold">Results</h1>
      <ResultsClient results={recentResults} />
    </main>
  );
}

async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(Object.entries(promises).map(async ([key, promise]) => [key, await promise]));
  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
}
