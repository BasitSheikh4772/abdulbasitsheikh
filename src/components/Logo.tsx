import { useId } from "react";

/**
 * "AB" monogram: the A's right leg doubles as the B's stem, so the two letters lock into one mark.
 * A cyan spark sits where they meet.
 */
export function Logo({ size = 28, className }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} role="img" aria-label="Abdul Basit Sheikh">
      <defs>
        <linearGradient id={`${id}-bg`} x1="3" y1="2" x2="29" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b9bff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id}-bg)`} />
      <g fill="none" stroke="#04060d" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
        {/* A */}
        <path d="M6.5 23.5L12.6 8.5L18.7 23.5" />
        <path d="M8.9 18.2H16.3" />
        {/* B: its stem is the A's right leg */}
        <path d="M18.7 8.5H21.8a3.4 3.4 0 0 1 0 6.8H18.7" />
        <path d="M18.7 15.3H22.5a4.1 4.1 0 0 1 0 8.2H18.7" />
      </g>
      <circle cx="7" cy="7" r="1.6" fill="#04060d" />
    </svg>
  );
}
