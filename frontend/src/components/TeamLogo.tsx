/* eslint-disable @next/next/no-img-element */

interface Props {
  src: string;
  name: string;
  size?: number;
  className?: string;
}

export default function TeamLogo({ src, name, size = 24, className = "" }: Props) {
  if (!src || src === "undefined") {
    return (
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-full bg-border/40 flex items-center justify-center ${className}`}
      >
        <span className="text-[10px] sm:text-[8px] font-bold text-text-muted">?</span>
      </div>
    );
  }

  return (
    <img
      src={`${src}?v=2`}
      alt={name}
      width={size}
      height={size}
      className={`object-contain shrink-0 ${className}`}
      loading="lazy"
    />
  );
}
