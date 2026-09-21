"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const theme = {
  accent: "#2dd4bf",
  accentGlow: "rgba(45, 212, 191, 0.3)",
  accentGlowHover: "rgba(45, 212, 191, 0.45)",
  text: "#f0f0f0",
  textMuted: "#D5E6E4",
  bgDark: "#000000",
  bgCard: "#050505",
  line: "#1a1a1a",
  whatsapp: "#25D366",
  telegram: "#229ED9",
};

function ChatBubbleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12.04 0C5.47 0 .13 5.34.13 11.91c0 2.1.55 4.15 1.6 5.96L.04 24l6.28-1.65a11.88 11.88 0 0 0 5.71 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.18-3.44-8.41ZM12.04 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.88 9.88 0 0 1-1.52-5.28C2.14 6.43 6.57 2 12.04 2c2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.9 7c0 5.47-4.44 9.9-9.91 9.9Z" />
      <path d="M17.55 14.52c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

function TelegramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.9 3.2 18.5 20c-.26 1.19-.97 1.48-1.97.92l-5.43-4-2.62 2.52c-.29.29-.53.53-1.09.53l.39-5.52 10.05-9.08c.44-.39-.1-.61-.68-.22L4.73 12.2l-5.38-1.68c-1.17-.37-1.19-1.17.24-1.73L20.62.81c.98-.36 1.84.24 1.28 2.39Z" />
    </svg>
  );
}

function ChevronRightIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function FloatingChat({
  whatsappUrl,
  telegramUrl,
}: {
  whatsappUrl: string;
  telegramUrl: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollProgress = (scrollTop + viewportHeight) / docHeight;
      setIsVisible(scrollProgress > 0.65);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    checkScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const openSheet = useCallback(() => setIsSheetOpen(true), []);
  const closeSheet = useCallback(() => setIsSheetOpen(false), []);

  useEffect(() => {
    if (!isSheetOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSheet();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isSheetOpen, closeSheet]);

  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSheetOpen]);

  if (!mounted) return null;

  const overlay = (
    <>
      <style>{`
        .floating-chat-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 100;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: ${theme.accent};
          color: ${theme.bgDark};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 4px 24px ${theme.accentGlow},
            0 0 0 1px rgba(45, 212, 191, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(100px) scale(0.8);
          opacity: 0;
          transition:
            transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity 0.3s ease,
            box-shadow 0.2s ease;
          pointer-events: none;
        }
        .floating-chat-btn.floating-chat-visible {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: auto;
        }
        .floating-chat-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow:
            0 8px 32px ${theme.accentGlowHover},
            0 0 0 1px rgba(45, 212, 191, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        .floating-chat-btn:active {
          transform: translateY(-1px) scale(0.97);
        }

        .sheet-backdrop {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(5, 5, 5, 0.7);
          backdrop-filter: blur(16px) saturate(1.2);
          -webkit-backdrop-filter: blur(16px) saturate(1.2);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease, visibility 0.4s ease;
        }
        .sheet-backdrop.sheet-backdrop-open {
          opacity: 1;
          visibility: visible;
        }

        .chat-sheet {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 210;
          background: linear-gradient(
            180deg,
            rgba(20, 20, 20, 0.95) 0%,
            rgba(10, 10, 10, 0.98) 100%
          );
          border-top: 1px solid ${theme.line};
          border-top-left-radius: 28px;
          border-top-right-radius: 28px;
          box-shadow:
            0 -20px 60px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          transform: translateY(100%);
          transition: transform 0.45s cubic-bezier(0.32, 0.72, 0, 1);
          max-height: 92vh;
          min-height: 320px;
          overflow-y: auto;
          padding: 24px 20px 48px;
        }
        .chat-sheet.chat-sheet-open {
          transform: translateY(0);
        }

        .sheet-handle-bar {
          width: 40px;
          height: 5px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.1);
          margin: 14px auto 20px;
          flex-shrink: 0;
        }

        .sheet-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 12px;
        }

        .sheet-header-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sheet-title {
          font-family: var(--font-display), sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.3px;
          line-height: 1.2;
        }

        .sheet-subtitle {
          color: ${theme.textMuted};
          font-size: 12.5px;
          line-height: 1.5;
          opacity: 0.8;
        }

        .sheet-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid ${theme.line};
          background: rgba(255, 255, 255, 0.03);
          color: ${theme.textMuted};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .sheet-close-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border-color: ${theme.accent};
        }

        .sheet-description {
          color: ${theme.textMuted};
          font-size: 13.5px;
          line-height: 1.7;
          margin: 0 0 24px 0;
        }

        .sheet-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
        }

        .sheet-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 16px 28px;
          border-radius: 16px;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.25s ease;
          width: 100%;
          max-width: 320px;
          justify-content: center;
        }
        .sheet-action-btn:hover {
          transform: translateY(-2px);
        }

        .sheet-action-whatsapp {
          background: ${theme.whatsapp};
          color: white;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.25);
        }
        .sheet-action-whatsapp:hover {
          box-shadow: 0 8px 30px rgba(37, 211, 102, 0.4);
        }

        .sheet-action-telegram {
          background: ${theme.telegram};
          color: white;
          box-shadow: 0 4px 20px rgba(34, 158, 217, 0.25);
        }
        .sheet-action-telegram:hover {
          box-shadow: 0 8px 30px rgba(34, 158, 217, 0.4);
        }

        .sheet-action-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
        }

        .sheet-action-label {
          color: white;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.2px;
        }

        @media (max-width: 768px) {
          .chat-sheet {
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
            padding: 20px 16px 40px;
            min-height: 280px;
          }
          .sheet-title {
            font-size: 22px;
          }
          .sheet-action-btn {
            max-width: 100%;
            padding: 14px 24px;
          }
        }
      `}</style>

      {/* Floating Chat Button */}
      <button
        type="button"
        onClick={openSheet}
        className={`floating-chat-btn ${isVisible ? "floating-chat-visible" : ""}`}
        aria-label="Open chat options"
        aria-haspopup="dialog"
        aria-expanded={isSheetOpen}
      >
        <ChatBubbleIcon size={22} />
      </button>

      {/* Sheet Backdrop */}
      <div
        className={`sheet-backdrop ${isSheetOpen ? "sheet-backdrop-open" : ""}`}
        onClick={closeSheet}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        className={`chat-sheet ${isSheetOpen ? "chat-sheet-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Chat options"
      >
        <div className="sheet-handle-bar" />
        <div className="sheet-header">
          <div className="sheet-header-text">
            <span className="sheet-title">Connect With Us</span>
            <span className="sheet-subtitle">Reach out for guidance and trade support</span>
          </div>
          <button
            type="button"
            onClick={closeSheet}
            className="sheet-close-btn"
            aria-label="Close chat options"
          >
            <CloseIcon size={18} />
          </button>
        </div>
        <div className="sheet-actions">
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sheet-action-btn sheet-action-whatsapp"
            onClick={closeSheet}
          >
            <span className="sheet-action-icon">
              <WhatsAppIcon size={22} />
            </span>
            <span className="sheet-action-label">Chat on WhatsApp</span>
          </Link>

          <Link
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sheet-action-btn sheet-action-telegram"
            onClick={closeSheet}
          >
            <span className="sheet-action-icon">
              <TelegramIcon size={22} />
            </span>
            <span className="sheet-action-label">Message on Telegram</span>
          </Link>
        </div>
      </div>
    </>
  );

  return createPortal(overlay, document.body);
}
