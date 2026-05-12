"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/lib/use-page-title";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/services/api";

export default function RegisterPage() {
  usePageTitle("Register");
  const router = useRouter();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setSubmitting(true);
    try {
      await register({ username, email, password });
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-[440px] px-5 py-16">
      <div className="rounded-xl border border-border bg-bg-card p-8 card-glow animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://steamcommunity-a.akamaihd.net/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOHaC619h7delpVHoVhH4kJHf-SNM4bz9bKY_dPWQWDCUkLxy57g_H3DgkB5w42uAzIv4I3meOAQlApdwFO5YrFDmxUNp_lL7/256fx256f"
              alt="WikiHowl"
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl font-normal tracking-wide text-text-primary leading-none [font-family:var(--font-display)]">
              WikiHowl
            </span>
          </Link>
        </div>

        <h1 className="text-xl font-bold text-center mb-1">Create an account</h1>
        <p className="text-sm text-text-muted text-center mb-6">Join the WikiHowl community</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-1.5">Username</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              minLength={3}
              maxLength={20}
              pattern="[a-zA-Z0-9_]+"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1.5">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat your password"
              className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
            />
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" required className="h-4 w-4 rounded border-border bg-bg-input accent-blue mt-0.5" />
            <span className="text-sm text-text-secondary leading-tight">
              I agree to the{" "}
              <a href="#" className="text-blue-light hover:text-blue transition-colors">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-blue-light hover:text-blue transition-colors">Privacy Policy</a>
            </span>
          </label>

          {error && (
            <div className="rounded-lg border border-red/40 bg-red/10 px-3 py-2 text-sm text-red">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-blue px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-text-muted text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-light hover:text-blue transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
