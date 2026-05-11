// app/galleries/page.tsx

import Link from "next/link";
import { api } from "@/services/api";
import GalleriesClient from "./GalleriesClient";

export const metadata = {
  title: "Galleries - Event Photos",
};

export default async function GalleriesPage() {
  const { galleries } = await resolvePageData({
    galleries: api.galleries(),
  });

  return (
    <main className="mx-auto max-w-[1380px] px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-text-muted">
        <Link href="/" className="hover:text-text-secondary">
          Home
        </Link>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-text-primary">Galleries</span>
      </div>

      <h1 className="mb-2 text-2xl font-bold">Photo Galleries</h1>

      <p className="mb-6 text-sm text-text-secondary">
        Browse event photos, team portraits, and behind-the-scenes content
      </p>

      <GalleriesClient galleries={galleries} />
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