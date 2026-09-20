import React from "react";

interface AWRLogoProps {
  /** Width of the logo in pixels. Height scales proportionally. */
  width?: number;
  /** Override text color (default: white) */
  color?: string;
}

export default function AWRLogo({ width = 320, color = "#ffffff" }: AWRLogoProps) {
  const scale = width / 320;
  const height = Math.round(80 * scale);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Alpha Wealth & Retirement Club"
    >
      {/* ── Monogram: A W R ── */}
      {/* A */}
      <polygon
        points="0,60 14,10 28,60"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <line x1="6" y1="42" x2="22" y2="42" stroke={color} strokeWidth="4" />

      {/* W */}
      <polyline
        points="28,10 36,52 44,28 52,52 60,10"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* R */}
      <polyline
        points="60,60 60,10 74,10"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M60,10 Q82,10 82,27 Q82,40 60,40"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <line x1="68" y1="40" x2="84" y2="60" stroke={color} strokeWidth="5" strokeLinecap="round" />

      {/* ── Wordmark ── */}
      <text
        x="96"
        y="34"
        fontFamily="'Arial Black', 'Arial Bold', Arial, sans-serif"
        fontWeight="900"
        fontSize="22"
        fill={color}
        letterSpacing="0.5"
      >
        ALPHA WEALTH
      </text>
      <text
        x="96"
        y="54"
        fontFamily="'Arial Black', 'Arial Bold', Arial, sans-serif"
        fontWeight="900"
        fontSize="22"
        fill={color}
        letterSpacing="0.5"
      >
        &amp; RETIREMENT CLUB
      </text>

      {/* ── Tagline ── */}
      <text
        x="96"
        y="68"
        fontFamily="Arial, sans-serif"
        fontWeight="400"
        fontSize="9"
        fill={color}
        letterSpacing="2.5"
        opacity="0.85"
      >
        INCOME · GROWTH · FREEDOM
      </text>
    </svg>
  );
}
