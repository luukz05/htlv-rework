"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[440px] px-5 py-16">
        <div className="rounded-xl border border-border bg-bg-card p-8 card-glow animate-fade-in-up">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 8h5v16H6zM13 14h5v10h-5zM20 10h5v14h-5z" fill="#2563eb"/>
              </svg>
              <span className="text-xl font-bold text-text-primary">HLTV</span>
            </div>
          </div>

          <h1 className="text-xl font-bold text-center mb-1">Create an account</h1>
          <p className="text-sm text-text-muted text-center mb-6">Join the HLTV community</p>

          {/* Social signup */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-border bg-bg-surface px-4 py-2.5 text-sm font-medium text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.064 0 .127.003.19.008l2.861-4.142V8.91a4.528 4.528 0 0 1 4.524-4.524 4.528 4.528 0 0 1 4.524 4.524 4.528 4.528 0 0 1-4.524 4.524h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
              </svg>
              Steam
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-border bg-bg-surface px-4 py-2.5 text-sm font-medium text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-border bg-bg-surface px-4 py-2.5 text-sm font-medium text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">or register with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-1.5">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
              <input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1.5">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded border-border bg-bg-input accent-blue mt-0.5" />
              <span className="text-sm text-text-secondary leading-tight">
                I agree to the{" "}
                <a href="#" className="text-blue-light hover:text-blue transition-colors">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-blue-light hover:text-blue transition-colors">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-light"
            >
              Create Account
            </button>
          </form>

          {/* Login link */}
          <p className="text-sm text-text-muted text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-light hover:text-blue transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
