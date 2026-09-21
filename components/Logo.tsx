import React from "react";

interface AWRLogoProps {
  width?: number;
  color?: string;
}

export default function AWRLogo({ width = 260, color = "#ffffff" }: AWRLogoProps) {
  const scale = width / 260;
  const height = Math.round(70 * scale);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 260 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Alpha Wealth & Retirement Club"
    >
      {/* A */}
      <path d="M4 56 L14 14 L24 56" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8.5" y1="40" x2="19.5" y2="40" stroke={color} strokeWidth="5" strokeLinecap="round" />

      {/* W */}
      <path d="M26 14 L33 48 L40 30 L47 48 L54 14" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />

      {/* R — simplified bowl for small sizes */}
      <path d="M58 56 L58 14 L66 14 Q76 14 76 24 Q76 33 66 33 L58 33" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="69" y1="33" x2="80" y2="56" stroke={color} strokeWidth="7" strokeLinecap="round" />

      {/* Wordmark */}
      <text x="92" y="28" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="20" fill={color} letterSpacing="0.5">
        ALPHA WEALTH
      </text>
      <text x="92" y="45" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="20" fill={color} letterSpacing="0.5">
        &amp; RETIREMENT CLUB
      </text>

      {/* Tagline */}
      <text x="92" y="59" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="7" fill={color} letterSpacing="2" opacity="0.9">
        INCOME · GROWTH · FREEDOM
      </text>
    </svg>
  );
}
