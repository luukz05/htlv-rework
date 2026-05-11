import type { Match } from "@/services/types";

interface StatusPillProps {
  status: Match["status"] | "pending";
  className?: string;
}

export default function StatusPill({ status, className = "" }: StatusPillProps) {
  const baseClasses = status === "finished"
    ? "bg-green/15 text-green"
    : status === "live"
      ? "bg-transparent text-red animate-pulse"
      : status === "upcoming"
        ? "bg-blue/15 text-blue-light"
        : "bg-text-muted/15 text-text-muted";

  return (
    <span className={`rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 shrink-0 ${baseClasses} ${className}`}>
      {status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse-dot shrink-0" />}
      {status === "live" ? "LIVE" : status}
    </span>
  );
}
