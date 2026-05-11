"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";

function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initial = name.trim().slice(0, 1).toUpperCase() || "?";
  return (
    <span
      className="flex items-center justify-center rounded-full bg-blue text-white font-bold"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

export default function UserMenu() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (loading) {
    return <div className="h-8 w-20 rounded-lg bg-bg-card animate-pulse" aria-hidden="true" />;
  }

  if (!user) {
    return (
      <>
        <Link
          href="/login"
          className="rounded-lg bg-blue px-3 sm:px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-light"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="hidden sm:block rounded-lg border border-border px-3.5 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary hover:border-border-hover"
        >
          Sign Up
        </Link>
      </>
    );
  }

  async function handleLogout() {
    setOpen(false);
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-border bg-bg-surface px-2 py-1 text-sm font-medium text-text-primary transition-colors hover:border-border-hover hover:bg-bg-card"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar name={user.username} size={26} />
        <span className="hidden sm:inline max-w-[120px] truncate">{user.username}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[100] mt-2 min-w-[200px] overflow-hidden rounded-xl border border-border bg-bg-surface p-1.5 shadow-xl shadow-black/40 backdrop-blur-md"
        >
          <div className="px-3 py-2 border-b border-border mb-1">
            <p className="text-sm font-semibold text-text-primary truncate">{user.username}</p>
            <p className="text-xs text-text-muted truncate">{user.email}</p>
          </div>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            role="menuitem"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-bg-card hover:text-text-primary"
          >
            Profile
          </Link>
          <Link
            href="/games"
            onClick={() => setOpen(false)}
            role="menuitem"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-bg-card hover:text-text-primary"
          >
            My games
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            role="menuitem"
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-text-secondary hover:bg-bg-card hover:text-text-primary"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
