import Image from "next/image";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import { Montserrat } from "next/font/google";
import Logo from "../components/Logo";
import ContactUs from "../components/ContactUs";

const display = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
});

const sql = neon(process.env.DATABASE_URL!);

async function getLinks() {
  try {
    const rows =
      await sql`SELECT whatsapp_url, telegram_url, whatsapp_number, telegram_username FROM site_links WHERE id = 1`;
    const row = rows[0];
    return {
      whatsapp: row?.whatsapp_url || "https://wa.link/",
      telegram: row?.telegram_url || "https://t.me/",
      whatsappNumber: row?.whatsapp_number || "+1 2345",
      telegramUsername: row?.telegram_username || "@user",
    };
  } catch {
    return {
      whatsapp: "https://",
      telegram: "https://",
      whatsappNumber: "",
      telegramUsername: "",
    };
  }
}

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const metadata = {
  title: "AWR — Alpha Wealth & Retirement Club",
  description:
    "Grow your wealth, generate passive income, and plan for retirement with community-driven market insights, educational resources, and trading guidance.",
};

export default async function Home() {
  const { whatsapp: WHATSAPP_URL, telegram: TELEGRAM_URL } = await getLinks();

  return (
    <main className={display.variable}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --navy:      #050d1a;
              --navy-mid:  #091426;
              --navy-card: #0d1f3a;
              --blue:      #1a6ef5;
              --blue-glow: #4d9fff;
              --line:      rgba(255,255,255,0.10);
              --white:     #ffffff;
              --offwhite:  rgba(255,255,255,0.88);
              --muted:     rgba(255,255,255,0.55);
              --whatsapp:  #25D366;
              --telegram:  #229ED9;
            }

            *, *::before, *::after { box-sizing: border-box; }
            html { scroll-behavior: smooth; }
            html, body { margin: 0; padding: 0; background: var(--navy); color: var(--white); }

            body {
              font-family: var(--font-display), system-ui, sans-serif;
              -webkit-font-smoothing: antialiased;
              position: relative;
            }

            /* ══════════════════════════════════════════
               BACKGROUND: perspective city grid
               Layer A: flat grid + glow + dot nodes (fixed, full page)
               Layer B: perspective floor grid (fixed, bottom 65vh)
            ══════════════════════════════════════════ */

            body::before {
              content: "";
              position: fixed;
              inset: 0;
              z-index: 0;
              pointer-events: none;
              background-image:
                radial-gradient(circle 1.5px at 18% 72%, rgba(77,159,255,0.55) 0%, transparent 100%),
                radial-gradient(circle 1px   at 31% 85%, rgba(77,159,255,0.40) 0%, transparent 100%),
                radial-gradient(circle 2px   at 47% 78%, rgba(77,159,255,0.60) 0%, transparent 100%),
                radial-gradient(circle 1px   at 62% 91%, rgba(77,159,255,0.35) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 74% 68%, rgba(77,159,255,0.50) 0%, transparent 100%),
                radial-gradient(circle 1px   at 83% 80%, rgba(77,159,255,0.40) 0%, transparent 100%),
                radial-gradient(circle 2px   at 9%  80%, rgba(77,159,255,0.45) 0%, transparent 100%),
                radial-gradient(circle 1px   at 55% 62%, rgba(77,159,255,0.30) 0%, transparent 100%),
                radial-gradient(circle 1.5px at 92% 75%, rgba(77,159,255,0.45) 0%, transparent 100%),
                radial-gradient(circle 1px   at 38% 95%, rgba(77,159,255,0.30) 0%, transparent 100%),
                radial-gradient(ellipse 80% 55% at 50% 38%, rgba(26,110,245,0.22) 0%, rgba(26,110,245,0.06) 45%, transparent 70%),
                linear-gradient(rgba(42,127,255,0.055) 1px, transparent 1px),
                linear-gradient(90deg, rgba(42,127,255,0.055) 1px, transparent 1px);
              background-size:
                100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%,
                100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%,
                100% 100%,
                52px 52px,
                52px 52px;
            }

            body::after {
              content: "";
              position: fixed;
              left: 0; right: 0; bottom: 0;
              height: 65vh;
              z-index: 0;
              pointer-events: none;
              background-image:
                linear-gradient(rgba(42,127,255,0.09) 1px, transparent 1px),
                linear-gradient(90deg, rgba(42,127,255,0.09) 1px, transparent 1px);
              background-size: 52px 52px;
              transform: perspective(500px) rotateX(40deg);
              transform-origin: 50% 0%;
              -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
              mask-image: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
            }

            header, main > div, section, footer, .ticker {
              position: relative;
              z-index: 1;
            }

            a { color: inherit; text-decoration: none; }
            a:focus-visible, button:focus-visible { outline: 2px solid var(--blue-glow); outline-offset: 3px; }
            section[id] { scroll-margin-top: 90px; }
            #contact { scroll-margin-top: 90px; }

            /* ── Ticker ── */
            .ticker { overflow: hidden; background: var(--blue); padding: 9px 0; }
            .ticker-track { display: flex; width: max-content; animation: tickerScroll 55s linear infinite; }
            .ticker-group { display: flex; align-items: center; white-space: nowrap; }
            .ticker-item {
              display: inline-flex; align-items: center; gap: 24px; padding-right: 24px;
              font-size: 10px; font-weight: 700; letter-spacing: 2.8px; text-transform: uppercase; color: #fff;
            }
            .ticker-item::after { content: "✦"; font-size: 8px; opacity: 0.7; }
            @keyframes tickerScroll { from { transform: translateX(-50%); } to { transform: translateX(0); } }
            @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }

            /* ── Nav ── */
            .brand-bar {
              position: sticky; top: 0; z-index: 20;
              background: rgba(5,13,26,0.88);
              backdrop-filter: blur(14px);
              border-bottom: none;
              padding: 14px 24px;
            }
            .brand-bar-inner {
              width: min(100%, 860px); margin: 0 auto;
              display: flex; align-items: center; justify-content: space-between; gap: 16px;
            }
            .brand { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; text-decoration: none; }
            .brand-sub { font-size: 9px; font-weight: 700; letter-spacing: 2.2px; text-transform: uppercase; color: var(--muted); }
            .nav-cta {
              font-size: 12px; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase;
              color: #fff; background: var(--blue);
              border-radius: 100px; padding: 12px 28px;
              transition: background 0.2s, transform 0.15s;
              white-space: nowrap;
              cursor: pointer;
            }
            .nav-cta:hover { background: var(--blue-glow); transform: translateY(-1px); }

            /* ── Hero: Market Insights (New) ── */
            .hero-market-insights {
              position: relative;
              padding: 110px 24px 80px;
              text-align: center;
              z-index: 1;
            }
            .hero-inner {
              max-width: 900px;
              margin: 0 auto;
            }
            .hero-title {
              font-size: 56px;
              font-weight: 900;
              margin: 0 0 24px;
              line-height: 1.1;
              letter-spacing: -0.02em;
              background: linear-gradient(90deg, #fff 0%, #4d9fff 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .hero-text {
              font-size: 20px;
              line-height: 1.7;
              color: var(--offwhite);
              max-width: 760px;
              margin: 0 auto 56px;
            }
            .hero-contact {
              display: flex;
              justify-content: center;
            }

            /* ── Original Hero ── */
            .hero { position: relative; width: 100%; line-height: 0; background: var(--navy); }
            .hero-image { display: block; width: 100%; height: auto; object-fit: cover; }
            .hero-fade {
              position: absolute; bottom: 0; left: 0; right: 0; height: 160px;
              background: linear-gradient(to bottom, transparent 0%, var(--navy) 100%);
              pointer-events: none; z-index: 2;
            }

            /* ── Body section ── */
            .body-section {
              padding: 64px 24px 88px;
              background: transparent;
              position: relative; overflow: hidden;
            }

            .body-inner {
              position: relative; z-index: 1;
              width: min(720px, 100%); margin: 0 auto; text-align: center;
            }
            .eyebrow {
              font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
              color: var(--blue-glow); margin-bottom: 22px;
            }
            .body-text {
              font-size: 17px; font-weight: 500; line-height: 1.9;
              color: var(--offwhite);
              max-width: 660px; margin: 0 auto 48px;
            }

            /* ── Feature cards ── */
            .features { display: grid; gap: 16px; margin: 0 0 52px; }
            .features-grid-2 {
              grid-template-columns: repeat(2, 1fr);
              max-width: 800px;
              margin: 0 auto;
            }
            .feature {
              background: var(--navy-card);
              border: 1px solid rgba(77,159,255,0.2);
              border-radius: 18px; padding: 28px 22px; text-align: left;
            }
            .feature-icon {
              width: 36px; height: 36px; border-radius: 10px;
              background: rgba(26,110,245,0.18);
              display: grid; place-items: center;
              margin-bottom: 16px;
            }
            .feature-icon svg { width: 18px; height: 18px; fill: var(--blue-glow); }
            .feature h3 { margin: 0 0 10px; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: var(--white); }
            .feature p { margin: 0; font-size: 13.5px; font-weight: 500; line-height: 1.75; color: rgba(255,255,255,0.70); }

            /* ════════════════════════════════════════
               ContactUs component styles
               All classes used by ContactUs.tsx
            ════════════════════════════════════════ */

            .contact-flow {
              display: flex;
              justify-content: center;
              margin-top: 8px;
            }

            /* Primary CTA button (closed state) */
            .contact-us-btn {
              display: inline-flex;
              align-items: center;
              gap: 10px;
              padding: 16px 36px;
              border: none;
              border-radius: 100px;
              background: var(--blue);
              color: #fff;
              font-family: var(--font-display), sans-serif;
              font-size: 15px;
              font-weight: 700;
              letter-spacing: 0.3px;
              cursor: pointer;
              box-shadow: 0 10px 32px rgba(26,110,245,0.40);
              transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
            }
            .contact-us-btn:hover {
              transform: translateY(-2px);
              background: var(--blue-glow);
              box-shadow: 0 14px 38px rgba(26,110,245,0.50);
            }

            /* Expanded panel */
            .contact-panel {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 22px;
              width: 100%;
            }

            .selector-row {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 18px;
            }

            .selector-block {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;
            }

            .selector-title {
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 1.8px;
              text-transform: uppercase;
              color: var(--muted);
              font-family: var(--font-display), sans-serif;
            }

            .selector-title strong { color: var(--white); }

            /* Dropdown toggle */
            .dropdown { position: relative; }

            .dropdown-backdrop {
              position: fixed;
              inset: 0;
              z-index: 25;
              background: transparent;
            }

            .dropdown-toggle {
              appearance: none;
              -webkit-appearance: none;
              display: inline-flex;
              align-items: center;
              justify-content: space-between;
              gap: 14px;
              width: 100%;
              min-width: 260px;
              padding: 14px 22px;
              border-radius: 100px;
              border: 1.5px solid rgba(255,255,255,0.15);
              background: rgba(255,255,255,0.06);
              color: var(--white);
              font-family: var(--font-display), sans-serif;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              text-align: left;
              transition: border-color 0.2s, background 0.2s;
            }
            .dropdown-toggle:hover {
              border-color: rgba(77,159,255,0.5);
              background: rgba(255,255,255,0.09);
            }

            .dropdown-value.placeholder { color: var(--muted); }

            .dropdown-chevron {
              flex-shrink: 0;
              color: var(--muted);
              transition: transform 0.2s;
            }
            .dropdown.open .dropdown-chevron { transform: rotate(180deg); }

            .dropdown-menu {
              position: absolute;
              top: calc(100% + 8px);
              left: 50%;
              transform: translateX(-50%);
              width: min(100vw - 40px, 300px);
              z-index: 30;
              background: #0d1f3a;
              border: 1px solid rgba(77,159,255,0.2);
              border-radius: 18px;
              box-shadow: 0 16px 40px rgba(0,0,0,0.5);
              padding: 8px;
            }

            .dropdown-option {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 12px;
              width: 100%;
              padding: 13px 16px;
              border: none;
              border-radius: 12px;
              background: transparent;
              color: var(--offwhite);
              font-family: var(--font-display), sans-serif;
              font-size: 14px;
              font-weight: 600;
              text-align: left;
              cursor: pointer;
              transition: background 0.15s;
            }
            .dropdown-option:hover { background: rgba(77,159,255,0.12); }
            .dropdown-option.selected { color: var(--blue-glow); }

            .dropdown-check {
              width: 22px; height: 22px;
              flex-shrink: 0;
              border-radius: 50%;
              border: 2px solid rgba(255,255,255,0.15);
              display: grid;
              place-items: center;
              transition: background 0.15s, border-color 0.15s;
            }
            .dropdown-option.selected .dropdown-check {
              background: var(--accent, var(--blue));
              border-color: var(--accent, var(--blue));
            }

            /* Channels / pills */
            .channels {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 14px;
            }

            .flow-summary {
              font-size: 13px;
              font-weight: 600;
              color: var(--muted);
            }
            .flow-summary b { color: var(--white); }

            .contact-pills {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: nowrap;
              gap: 12px;
            }

            .contact-pill {
              display: inline-flex;
              align-items: center;
              gap: 12px;
              padding: 13px 22px 13px 12px;
              border-radius: 16px;
              text-decoration: none;
              font-size: 15px;
              font-weight: 700;
              letter-spacing: 0.2px;
              transition: transform 0.2s, box-shadow 0.2s;
            }
            .contact-pill:hover { transform: translateY(-2px); }

            .contact-pill.whatsapp {
              background: var(--whatsapp);
              color: #fff;
              box-shadow: 0 8px 24px rgba(37,211,102,0.30);
            }
            .contact-pill.telegram {
              background: var(--telegram);
              color: #fff;
              box-shadow: 0 8px 24px rgba(34,158,217,0.30);
            }

            .pill-icon-wrap {
              width: 34px; height: 34px;
              flex-shrink: 0;
              border-radius: 10px;
              background: rgba(255,255,255,0.20);
              display: grid;
              place-items: center;
            }

            .pill-glyph { width: 18px; height: 18px; fill: #fff; display: block; }

            .pill-arrow { width: 15px; height: 15px; flex-shrink: 0; opacity: 0.85; }

            .pill-label { white-space: nowrap; }

            /* Close button */
            .contact-close {
              align-self: center;
              margin-top: 4px;
              width: 34px; height: 34px;
              border-radius: 50%;
              border: 1px solid rgba(255,255,255,0.15);
              background: rgba(255,255,255,0.06);
              color: var(--muted);
              font-size: 17px;
              line-height: 1;
              cursor: pointer;
              transition: transform 0.25s, color 0.2s, background 0.2s;
            }
            .contact-close:hover {
              transform: rotate(90deg);
              color: var(--white);
              background: rgba(255,255,255,0.12);
            }

            /* Animations */
            @media (prefers-reduced-motion: no-preference) {
              .contact-panel.revealed,
              .channels.revealed {
                animation: pillIn 0.35s cubic-bezier(.22,1,.36,1) both;
              }
              @keyframes pillIn {
                from { opacity: 0; transform: translateY(10px) scale(.97); }
                to   { opacity: 1; transform: none; }
              }
            }

            /* ── Floating Chat Action Button ── */
            .floating-chat {
              position: fixed;
              bottom: 32px;
              right: 32px;
              z-index: 50;
              width: 64px;
              height: 64px;
              border-radius: 50%;
              background: var(--whatsapp);
              display: grid;
              place-items: center;
              box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
              transition: transform 0.2s, box-shadow 0.2s;
              cursor: pointer;
              border: none;
              animation: pulseChat 3s infinite;
            }
            .floating-chat:hover {
              transform: scale(1.1) translateY(-2px);
              box-shadow: 0 14px 40px rgba(37, 211, 102, 0.5);
            }
            .floating-chat svg {
              width: 32px;
              height: 32px;
              fill: #fff;
            }
            @keyframes pulseChat {
              0% { box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4), 0 0 0 0 rgba(37, 211, 102, 0.7); }
              70% { box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4), 0 0 0 15px rgba(37, 211, 102, 0); }
              100% { box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4), 0 0 0 0 rgba(37, 211, 102, 0); }
            }

            /* ── Footer ── */
            footer { padding: 36px 24px; background: rgba(9,20,38,0.85); border-top: 1px solid var(--line); text-align: center; }
            .footer-name { font-size: 11px; font-weight: 700; letter-spacing: 2.4px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
            .footer-copy { font-size: 11px; font-weight: 500; color: var(--muted); line-height: 1.6; margin: 0 auto; max-width: 560px; }

            /* ── Responsive ── */
            @media (max-width: 640px) {
              .brand-bar { padding: 12px 16px; }
              .brand-sub { display: none; }
              .body-section { padding: 48px 18px 64px; }
              .body-text { font-size: 15px; }
              .features { gap: 12px; }
              .features-grid-2 { grid-template-columns: 1fr; }
              .selector-row { flex-direction: column; align-items: center; }
              .contact-pill { padding: 11px 14px 11px 10px; font-size: 14px; }
              .pill-arrow { display: none; }
              .contact-pills { gap: 10px; }

              .hero-market-insights { padding: 72px 18px 48px; }
              .hero-title { font-size: 36px; }
              .hero-text { font-size: 16px; margin-bottom: 40px; }

              .floating-chat { bottom: 20px; right: 20px; width: 56px; height: 56px; }
              .floating-chat svg { width: 28px; height: 28px; }
            }

            @media (prefers-reduced-motion: no-preference) {
              .fade-up { animation: fadeUp 0.75s cubic-bezier(.22,1,.36,1) both; }
              @keyframes fadeUp {
                from { opacity: 0; transform: translateY(18px); }
                to   { opacity: 1; transform: none; }
              }
            }
          `,
        }}
      />

      <div>
        {/* ── Nav ── */}
        <header className="brand-bar">
          <div className="brand-bar-inner">
            <Link href="/" className="brand">
              <Logo width={160} color="#ffffff" />
              <span className="brand-sub">Income · Growth · Freedom</span>
            </Link>
            <a href="#contact" className="nav-cta">Join Us</a>
          </div>
        </header>

        {/* ── New Hero: Market Insights ── */}
        <section className="hero-market-insights" id="contact">
          <div className="hero-inner fade-up">
            <h1 className="hero-title">GROW WEALTH <br/> CREATE FREEDOM </h1>
            <p className="hero-text">
              Take the next step toward building long-term financial confidence and achieving your investment goals. Whether you're looking to grow your wealth, generate passive income, or plan for retirement, our community provides valuable market insights, educational resources, and trading guidance to help you make informed financial decisions.
            </p>

            <div className="hero-contact">
              <ContactUs whatsappUrl={WHATSAPP_URL} telegramUrl={TELEGRAM_URL} />
            </div>
          </div>
        </section>

        {/* ── Original Hero (Banner) moved below ── */}
        <section className="hero">
          <Image
            src="/banner.jpg"
            alt="Alpha Wealth & Retirement Club — Income, Growth, Freedom"
            width={1536}
            height={802}
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-fade" aria-hidden="true" />
        </section>

        {/* ── Remaining Features ── */}
        <section className="body-section">
          <div className="body-inner fade-up">
            <div className="eyebrow">Why Join Us</div>
            <div className="features features-grid-2">
              <div className="feature">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2a5 5 0 110 10A5 5 0 0112 2zm0 12c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4z"/>
                  </svg>
                </div>
                <h3>Education</h3>
                <p>Resources that build real knowledge — from fundamentals to advanced strategy.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <h3>Trading Guidance</h3>
                <p>Step-by-step support so every trade decision is informed and confident.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ticker (moved to bottom, above footer) ── */}
        <div className="ticker" role="status" aria-label="Now accepting new members">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div className="ticker-group" key={copy} aria-hidden={copy === 1}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <span className="ticker-item" key={i}>
                    Now accepting new members
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <footer>
          <div className="footer-name">Alpha Wealth &amp; Retirement Club</div>
          <p className="footer-copy">
            © {new Date().getFullYear()} AWR — Alpha Wealth &amp; Retirement Club. All rights reserved.
          </p>
        </footer>

        {/* ── Floating Chat Action Button ── */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-chat"
          aria-label="Chat with us on WhatsApp"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </main>
  );
}
