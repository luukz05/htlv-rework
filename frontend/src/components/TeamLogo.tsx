/* eslint-disable @next/next/no-img-element */

interface Props {
  src: string;
  name: string;
  size?: number;
  className?: string;
}

export default function TeamLogo({ src, name, size = 24, className = "" }: Props) {
  return (
    <img
      src={`${src}?v=2`}
      alt={name}
      width={size}
      height={size}
      className={`object-contain shrink-0 ${className}`}
      style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.5)) drop-shadow(0 0 4px rgba(255,255,255,0.15))" }}
      loading="lazy"
    />
  );
}
