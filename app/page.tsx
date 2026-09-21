import Image from "next/image";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import { Montserrat } from "next/font/google";
import Logo from "../components/Logo";
import ContactUs from "../components/ContactUs";
import ExperienceSelector from "../components/ExperienceSelector";

const display = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
});

const sql = neon(process.env.DATABASE_URL!);

async function getLinks() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_links (
        id INT PRIMARY KEY DEFAULT 1,
        whatsapp_url TEXT NOT NULL DEFAULT '',
        telegram_url TEXT NOT NULL DEFAULT '',
        livechat_url TEXT NOT NULL DEFAULT '',
        agent_name TEXT NOT NULL DEFAULT '',
        whatsapp_enabled BOOLEAN NOT NULL DEFAULT TRUE,
        telegram_enabled BOOLEAN NOT NULL DEFAULT TRUE,
        livechat_enabled BOOLEAN NOT NULL DEFAULT TRUE
      )
    `;
    
    // Backfill columns if the table already existed
    await sql`ALTER TABLE site_links ADD COLUMN IF NOT EXISTS whatsapp_enabled BOOLEAN NOT NULL DEFAULT TRUE`;
    await sql`ALTER TABLE site_links ADD COLUMN IF NOT EXISTS telegram_enabled BOOLEAN NOT NULL DEFAULT TRUE`;
    await sql`ALTER TABLE site_links ADD COLUMN IF NOT EXISTS livechat_enabled BOOLEAN NOT NULL DEFAULT TRUE`;

    const rows = await sql`
      SELECT 
        whatsapp_url, telegram_url, livechat_url, agent_name, 
        whatsapp_enabled, telegram_enabled, livechat_enabled 
      FROM site_links WHERE id = 1
    `;
    
    const row = rows[0];
    return {
      whatsapp: row?.whatsapp_url ?? "",
      telegram: row?.telegram_url ?? "",
      livechat: row?.livechat_url ?? "",
      agentName: row?.agent_name ?? "",
      whatsappEnabled: row?.whatsapp_enabled ?? true,
      telegramEnabled: row?.telegram_enabled ?? true,
      livechatEnabled: row?.livechat_enabled ?? true,
    };
  } catch (err) {
    console.error("getLinks failed:", err);
    return { 
      whatsapp: "", telegram: "", livechat: "", agentName: "",
      whatsappEnabled: true, telegramEnabled: true, livechatEnabled: true 
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
  const {
    whatsapp: WHATSAPP_URL,
    telegram: TELEGRAM_URL,
    whatsappEnabled,
    telegramEnabled,
    // livechat, livechatEnabled, agentName (pass to ContactUs if needed)
  } = await getLinks();

  // Determine the best available link for the top navigation
  const topNavUrl = (telegramEnabled && TELEGRAM_URL) ? TELEGRAM_URL : (whatsappEnabled && WHATSAPP_URL) ? WHATSAPP_URL : null;

  return (
    <main className={display.variable}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* ... [Keep all your existing CSS exactly the same] ... */
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
            
            {/* Conditionally render Top Nav CTA */}
            {topNavUrl && (
              <a href={topNavUrl} target="_blank" rel="noopener noreferrer" className="nav-cta">
                Connect with Us
              </a>
            )}
          </div>
        </header>

        {/* ── Hero: Market Insights ── */}
        <section className="hero-market-insights" id="contact">
          <div className="hero-inner fade-up">
            <h1 className="hero-title">
              ALPHA WEALTH <br />
              <span style={{ whiteSpace: "nowrap" }}>& RETIREMENT CLUB</span>
            </h1>
            <p className="hero-text">
              Take the next step toward building long-term financial confidence and achieving your investment goals. Whether you're looking to grow your wealth, generate passive income, or plan for retirement, our community provides valuable market insights, educational resources, and trading guidance to help you make informed financial decisions.
            </p>

            <div className="hero-contact">
              {/* Pass the enabled flags down to the ContactUs component */}
              <ContactUs 
                whatsappUrl={WHATSAPP_URL} 
                telegramUrl={TELEGRAM_URL} 
                whatsappEnabled={whatsappEnabled}
                telegramEnabled={telegramEnabled}
              />
            </div>
          </div>
        </section>

        {/* ── Original Hero (Banner) ── */}
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

        {/* ── Features & Experience ── */}
        <section className="body-section">
          <div className="body-inner fade-up">
            <div className="eyebrow">Why Join Us</div>
            <div className="features features-grid-2">
              <div className="feature">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2a5 5 0 110 10A5 5 0 0112 2zm0 12c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4z" />
                  </svg>
                </div>
                <h3>Education</h3>
                <p>Resources that build real knowledge — from fundamentals to advanced strategy.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                </div>
                <h3>Trading Guidance</h3>
                <p>Step-by-step support so every trade decision is informed and confident.</p>
              </div>
            </div>
          </div>

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

          <div className="body-inner fade-up">
            <div className="eyebrow">Select Your Experience</div>
            <ExperienceSelector />
          </div>
        </section>

        {/* ── Bottom CTA bar (Conditionally Rendered) ── */}
        {whatsappEnabled && WHATSAPP_URL && (
          <div className="bottom-cta-bar">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
              Connect with AWR Team
            </a>
          </div>
        )}

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
