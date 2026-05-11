"use client";

import Link from "next/link";

export default function SignInWall({ gameName }: { gameName: string }) {
  return (
    <main className="mx-auto max-w-[520px] px-5 py-16">
      <div className="rounded-xl border border-border bg-bg-card p-8 text-center card-glow animate-fade-in-up">
        <h1 className="text-2xl font-bold mb-2">Sign in to play {gameName}</h1>
        <p className="text-sm text-text-muted mb-6">
          Track your XP, unlock achievements, and climb levels across all minigames.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="rounded-lg bg-blue px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-light"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary hover:border-border-hover"
          >
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}
