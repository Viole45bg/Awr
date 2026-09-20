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
            body { font-family: var(--font-display), system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
            a { color: inherit; text-decoration: none; }
            a:focus-visible, button:focus-visible { outline: 2px solid var(--blue-glow); outline-offset: 3px; }
            section[id] { scroll-margin-top: 72px; }

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

            /* ── Nav — no border, seamlessly blends into hero ── */
            .brand-bar {
              position: sticky; top: 0; z-index: 20;
              background: rgba(5,13,26,0.94);
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

            /* Solid blue pill — clearly visible */
            .nav-cta {
              font-size: 12px; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase;
              color: #fff; background: var(--blue);
              border-radius: 100px; padding: 12px 28px;
              transition: background 0.2s, transform 0.15s;
              white-space: nowrap;
            }
            .nav-cta:hover { background: var(--blue-glow); transform: translateY(-1px); }

            /* ── Hero — flush against nav, no gap ── */
            .hero { position: relative; width: 100%; line-height: 0; background: var(--navy); margin-top: 0; }
            .hero-image { display: block; width: 100%; height: auto; object-fit: cover; }
            .hero-fade {
              position: absolute; bottom: 0; left: 0; right: 0; height: 160px;
              background: linear-gradient(to bottom, transparent 0%, var(--navy) 100%);
              pointer-events: none; z-index: 2;
            }

            /* ── Body section ── */
            .body-section {
              padding: 72px 24px 88px;
              background: var(--navy);
              position: relative; overflow: hidden;
            }
            .body-section::before {
              content: ""; position: absolute; top: 40%; left: 50%;
              transform: translate(-50%, -50%);
              width: 800px; height: 600px;
              background: radial-gradient(ellipse, rgba(26,110,245,0.14) 0%, transparent 70%);
              pointer-events: none;
            }
            .body-inner {
              position: relative; z-index: 1;
              width: min(720px, 100%); margin: 0 auto; text-align: center;
            }
            .eyebrow {
              font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
              color: var(--blue-glow); margin-bottom: 22px;
            }

            /* Body text paragraph — NO duplicate heading */
            .body-text {
              font-size: 17px; font-weight: 500; line-height: 1.9;
              color: var(--offwhite);
              max-width: 660px; margin: 0 auto 48px;
            }

            /* ── Feature cards ── */
            .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 0 0 52px; }
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
            .feature h3 {
              margin: 0 0 10px; font-size: 13px; font-weight: 800;
              text-transform: uppercase; letter-spacing: 0.6px; color: var(--white);
            }
            .feature p {
              margin: 0; font-size: 13.5px; font-weight: 500; line-height: 1.75;
              color: rgba(255,255,255,0.70);
            }

            /* ── Footer ── */
            footer { padding: 36px 24px; background: var(--navy-mid); border-top: 1px solid var(--line); text-align: center; }
            .footer-name { font-size: 11px; font-weight: 700; letter-spacing: 2.4px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
            .footer-copy { font-size: 11px; font-weight: 500; color: var(--muted); line-height: 1.6; margin: 0 auto; max-width: 560px; }

            /* ── Responsive ── */
            @media (max-width: 640px) {
              .brand-bar { padding: 12px 16px; }
              .brand-sub { display: none; }
              .body-section { padding: 56px 18px 64px; }
              .body-text { font-size: 16px; }
              .features { grid-template-columns: 1fr; gap: 12px; }
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
              {/* Bigger logo — width 160 gives a good navbar size */}
              <Logo width={160} color="#ffffff" />
              <span className="brand-sub">Income · Growth · Freedom</span>
            </Link>
            <a href="#contact" className="nav-cta">Join Us</a>
          </div>
        </header>

        {/* ── Hero — no margin/padding gap ── */}
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

        {/* ── Body copy — no duplicate h1 ── */}
        <section className="body-section" id="contact">
          <div className="body-inner fade-up">

            <div className="eyebrow">Your financial future starts here</div>

            {/* No heading here — hero already says "Grow Wealth. Create Freedom." */}
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
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17l4-8 4 5 3-4 4 7H3z"/>
                  </svg>
                </div>
                <h3>Market Insights</h3>
                <p>Timely analysis and ideas to help you stay ahead of market movements.</p>
              </div>
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

            <ContactUs whatsappUrl={WHATSAPP_URL} telegramUrl={TELEGRAM_URL} />

          </div>
        </section>

        {/* ── Footer ── */}
        <footer>
          <div className="footer-name">Alpha Wealth &amp; Retirement Club</div>
          <p className="footer-copy">
            © {new Date().getFullYear()} AWR — Alpha Wealth &amp; Retirement Club. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
