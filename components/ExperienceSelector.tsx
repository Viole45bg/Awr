"use client";

import { useState } from "react";

const LEVELS = ["Beginner", "Intermediate", "Experienced"];

export default function ExperienceSelector() {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState<string | null>(null);

  return (
    <div className="experience-selector">
      <span className="selector-title">Your experience level</span>
      <div className={`dropdown ${open ? "open" : ""}`}>
        {open && (
          <div className="dropdown-backdrop" onClick={() => setOpen(false)} />
        )}
        <button
          className="dropdown-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={`dropdown-value ${level ? "" : "placeholder"}`}>
            {level ?? "Select your experience"}
          </span>
          <svg className="dropdown-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <div className="dropdown-menu" role="listbox">
            {LEVELS.map((l) => (
              <button
                key={l}
                className={`dropdown-option ${level === l ? "selected" : ""}`}
                onClick={() => { setLevel(l); setOpen(false); }}
                role="option"
                aria-selected={level === l}
              >
                {l}
                <span className="dropdown-check" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
