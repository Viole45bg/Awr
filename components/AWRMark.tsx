import React from "react";

interface AWRMarkProps {
  /** Width in px; height scales proportionally */
  width?: number;
  color?: string;
  /** Show the dark rounded tile behind the mark (matches your card icons) */
  withTile?: boolean;
  /** Tile background color */
  tileColor?: string;
}

export default function AWRMark({
  width = 36,
  color = "#4a90d9",
  withTile = false,
  tileColor = "#16213e",
}: AWRMarkProps) {
  // Thicker strokes for small sizes so letters stay separated
  const mono = (
    <g strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* A */}
      <path d="M6 58 L18 12 L30 58" stroke={color} />
      <line x1="10" y1="40" x2="26" y2="40" stroke={color} strokeWidth="7" />
      {/* W */}
      <path d="M32 12 L40 50 L48 28 L56 50 L64 12" stroke={color} />
      {/* R */}
      <path d="M68 58 L68 12 L78 12 Q90 12 90 24 Q90 34 78 34 L68 34" stroke={color} />
      <line x1="80" y1="34" x2="94" y2="58" stroke={color} />
    </g>
  );

  return (
    <svg
      width={width}
      height={width} // square when tiled, near-square otherwise
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AWR"
      role="img"
    >
      {withTile && <rect width="100" height="70" rx="16" fill={tileColor} />}
      {mono}
    </svg>
  );
}
