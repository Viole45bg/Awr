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
              --navy-card: #0c1c35;
              --blue:      #1a6ef5;
              --blue-glow: #2a7fff;
              --blue-soft: rgba(26,110,245,0.18);
              --line:      rgba(255,255,255,0.08);
              --white:     #ffffff;
              --offwhite:  rgba(255,255,255,0.82);
              --muted:     rgba(255,255,255,0.46);
              --whatsapp:  #25D366;
              --telegram:  #229ED9;
            }

            *, *::before, *::after { box-sizing: border-box; }

            html { scroll-behavior: smooth; }

            html, body {
              margin: 0;
              padding: 0;
              background: var(--navy);
              color: var(--white);
            }

            body {
              font-family: var(--font-display), system-ui, sans-serif;
              -webkit-font-smoothing: antialiased;
            }

            a { color: inherit; text-decoration: none; }

            a:focus-visible,
            button:focus-visible {
              outline: 2px solid var(--blue-glow);
              outline-offset: 3px;
            }

            section[id] { scroll-margin-top: 72px; }

            /* ── Ticker ── */
            .ticker {
              overflow: hidden;
              background: var(--blue);
              padding: 8px 0;
            }

            .ticker-track {
              display: flex;
              width: max-content;
              animation: tickerScroll 55s linear infinite;
            }

            .ticker-group {
              display: flex;
              align-items: center;
              white-space: nowrap;
            }

            .ticker-item {
              display: inline-flex;
              align-items: center;
              gap: 24px;
              padding-right: 24px;
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 2.8px;
              text-transform: uppercase;
              color: #fff;
            }

            .ticker-item::after {
              content: "✦";
              font-size: 8px;
              opacity: 0.7;
            }

            @keyframes tickerScroll {
              from { transform: translateX(-50%); }
              to   { transform: translateX(0); }
            }

            @media (prefers-reduced-motion: reduce) {
              .ticker-track { animation: none; }
            }

            /* ── Nav ── */
            .brand-bar {
              position: sticky;
              top: 0;
              z-index: 20;
              background: rgba(5,13,26,0.90);
              backdrop-filter: blur(12px);
              border-bottom: 1px solid var(--line);
              padding: 13px 24px;
            }

            .brand-bar-inner {
              width: min(100%, 820px);
              margin: 0 auto;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 16px;
            }

            .brand {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 4px;
              text-decoration: none;
            }

            .brand-sub {
              font-size: 9px;
              font-weight: 700;
              letter-spacing: 2.4px;
              text-transform: uppercase;
              color: var(--muted);
            }

            .nav-cta {
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 1.6px;
              text-transform: uppercase;
              color: var(--blue-glow);
              border: 1px solid rgba(42,127,255,0.35);
              border-radius: 100px;
              padding: 8px 20px;
              transition: background 0.2s, border-color 0.2s;
            }

            .nav-cta:hover {
              background: rgba(42,127,255,0.12);
              border-color: var(--blue-glow);
            }

            /* ── Hero ── */
            .hero {
              position: relative;
              width: 100%;
              line-height: 0;
              background: var(--navy);
            }

            .hero-image {
              display: block;
              width: 100%;
              height: auto;
              object-fit: cover;
            }

            .hero-fade {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 120px;
              background: linear-gradient(to bottom, transparent 0%, var(--navy) 100%);
              pointer-events: none;
              z-index: 2;
            }

            /* ── Body copy section ── */
            .body-section {
              padding: 80px 24px 88px;
              background: var(--navy);
              position: relative;
              overflow: hidden;
            }

            /* Ambient glow behind text */
            .body-section::before {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 700px;
              height: 500px;
              background: radial-gradient(ellipse, rgba(26,110,245,0.12) 0%, transparent 70%);
              pointer-events: none;
            }

            .body-inner {
              position: relative;
              z-index: 1;
              width: min(760px, 100%);
              margin: 0 auto;
              text-align: center;
            }

            .eyebrow {
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 3.2px;
              text-transform: uppercase;
              color: var(--blue-glow);
              margin-bottom: 20px;
            }

            .body-heading {
              font-size: clamp(22px, 4.5vw, 38px);
              font-weight: 800;
              line-height: 1.08;
              letter-spacing: -0.5px;
              text-transform: uppercase;
              color: var(--white);
              margin: 0 0 28px;
            }

            .body-text {
              font-size: 16px;
              font-weight: 500;
              line-height: 1.85;
              color: var(--offwhite);
              max-width: 680px;
              margin: 0 auto 40px;
            }

            /* ── 3-up feature row ── */
            .features {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 16px;
              margin: 48px 0 52px;
            }

            .feature {
              background: var(--navy-card);
              border: 1px solid var(--line);
              border-radius: 18px;
              padding: 26px 22px;
              text-align: left;
            }

            .feature-dot {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: var(--blue-glow);
              margin-bottom: 14px;
              box-shadow: 0 0 10px rgba(42,127,255,0.6);
            }

            .feature h3 {
              margin: 0 0 10px;
              font-size: 13px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.6px;
              color: var(--white);
            }

            .feature p {
              margin: 0;
              font-size: 13px;
              font-weight: 500;
              line-height: 1.75;
              color: var(--muted);
            }

            /* ── CTA ── */
            .cta-wrap {
              display: flex;
              justify-content: center;
            }

            /* ── ContactUs overrides live in ContactUs component ── */

            /* ── Footer ── */
            footer {
              padding: 36px 24px;
              background: var(--navy-mid);
              border-top: 1px solid var(--line);
              text-align: center;
            }

            .footer-name {
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 2.4px;
              text-transform: uppercase;
              color: var(--muted);
              margin-bottom: 8px;
            }

            .footer-copy {
              font-size: 11px;
              font-weight: 500;
              color: var(--muted);
              line-height: 1.6;
              margin: 0 auto;
              max-width: 560px;
            }

            /* ── Responsive ── */
            @media (max-width: 640px) {
              .brand-bar { padding: 11px 16px; }
              .brand-sub { display: none; }
              .body-section { padding: 56px 18px 64px; }
              .features { grid-template-columns: 1fr; gap: 12px; }
            }

            @media (prefers-reduced-motion: no-preference) {
              .fade-up {
                animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both;
              }
              @keyframes fadeUp {
                from { opacity: 0; transform: translateY(16px); }
                to   { opacity: 1; transform: none; }
              }
            }
          `,
        }}
      />

      <div>
        {/* ── Ticker ── */}
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

        {/* ── Nav ── */}
        <header className="brand-bar">
          <div className="brand-bar-inner">
            <Link href="/" className="brand">
              <Logo size={36} color="#ffffff" />
              <span className="brand-sub">Income · Growth · Freedom</span>
            </Link>
            <a href="#contact" className="nav-cta">Join Us</a>
          </div>
        </header>

        {/* ── Hero ── */}
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

        {/* ── Body copy ── */}
        <section className="body-section" id="contact">
          <div className="body-inner fade-up">
            <div className="eyebrow">Your financial future starts here</div>

            <h1 className="body-heading">
              Grow Wealth.<br />Create Freedom.
            </h1>

            <p className="body-text">
              Take the next step toward building long-term financial confidence
              and achieving your investment goals. Whether you&apos;re looking
              to grow your wealth, generate passive income, or plan for
              retirement, our community provides valuable market insights,
              educational resources, and trading guidance to help you make
              informed financial decisions.
            </p>

            <div className="features">
              <div className="feature">
                <div className="feature-dot" />
                <h3>Market Insights</h3>
                <p>Timely analysis and ideas to help you stay ahead of market movements.</p>
              </div>
              <div className="feature">
                <div className="feature-dot" />
                <h3>Education</h3>
                <p>Resources that build real knowledge — from fundamentals to advanced strategy.</p>
              </div>
              <div className="feature">
                <div className="feature-dot" />
                <h3>Trading Guidance</h3>
                <p>Step-by-step support so every trade decision is informed and confident.</p>
              </div>
            </div>

            <ContactUs whatsappUrl={WHATSAPP_URL} telegramUrl={TELEGRAM_URL} />
          </div>
        </section>

        {/* ── Footer ── */}
        <footer>
          <div className="footer-name">Alpha Wealth &amp; Retirement Club</div>
          <p className="footer-copy">
            © {new Date().getFullYear()} AWR — Alpha Wealth &amp; Retirement Club.
            All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
