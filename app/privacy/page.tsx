import type { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | MilaKya',
  description: 'How MilaKya collects, uses, and protects your personal data.',
};

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Inter:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --t:  #C8603A;
  --c:  #FAF6F0;
  --cd: #EFE7DC;
  --b:  #2C1810;
  --bm: #6B3D2E;
  --mu: #9B7B6C;
  --br: rgba(200,96,58,0.12);
}

html { scroll-behavior: smooth; }
body { background: var(--c); font-family: 'Inter', sans-serif; color: var(--b); }

.pp-nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(250,246,240,0.9); backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--br);
  padding: 14px 28px;
  display: flex; align-items: center; justify-content: space-between;
}
.pp-logo {
  font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 20px;
  color: var(--t); letter-spacing: -0.5px; text-decoration: none;
  display: flex; align-items: center;   /* ← add these two */
}
.pp-logo em { color: var(--b); font-style: normal; }
.pp-back {
  font-size: 13px; color: var(--mu); text-decoration: none; font-weight: 500;
  display: flex; align-items: center; gap: 4px;
  transition: color 0.2s;
}
.pp-back:hover { color: var(--t); }

.pp-hero {
  background: var(--b); padding: 56px 24px 48px;
  display: flex; align-items: center; gap: 16px; justify-content: center;
  text-align: center; flex-direction: column;
}
.pp-hero-ico {
  width: 52px; height: 52px; background: rgba(200,96,58,0.18);
  border-radius: 16px; display: flex; align-items: center; justify-content: center;
  color: var(--t);
}
.pp-hero h1 {
  font-family: 'Outfit', sans-serif; font-size: clamp(28px, 5vw, 40px);
  font-weight: 800; color: #fff; letter-spacing: -0.5px;
}
.pp-hero-date { font-size: 12px; color: rgba(250,246,240,0.4); margin-top: 6px; }

.pp-body { max-width: 700px; margin: 0 auto; padding: 48px 24px 80px; }

.pp-section { margin-bottom: 36px; }
.pp-section h2 {
  font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700;
  color: var(--b); margin-bottom: 10px;
  padding-bottom: 10px; border-bottom: 1px solid var(--br);
}
.pp-section p, .pp-section li {
  font-size: 14.5px; color: var(--bm); line-height: 1.8;
}
.pp-section ul {
  margin-top: 8px; padding-left: 20px;
  display: flex; flex-direction: column; gap: 6px;
}
.pp-section a { color: var(--t); text-decoration: none; font-weight: 500; }
.pp-section a:hover { text-decoration: underline; }
.pp-section strong { color: var(--b); font-weight: 600; }

.pp-footer {
  border-top: 1px solid var(--br);
  padding: 24px; text-align: center;
  font-size: 12px; color: var(--mu);
}
`;

export default function PrivacyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <nav className="pp-nav">
      <a href="/" className="pp-logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img
          src="/icon.webp"
          alt=""
          width={28}
          height={28}
          decoding="async"
          style={{ width: 28, height: 28, borderRadius: 7, display: 'block' }}
        />
        <span>Mila<em>Kya</em></span>
      </a>
        <a href="/" className="pp-back">← Back to home</a>
      </nav>

      <div className="pp-hero">
        <div className="pp-hero-ico">
          <Shield size={24} strokeWidth={1.8} />
        </div>
        <h1>Privacy Policy</h1>
        <p className="pp-hero-date">Last updated: June 2026</p>
      </div>

      <div className="pp-body">

        <div className="pp-section">
          <h2>Who We Are</h2>
          <p>
            MilaKya ("we", "our", "us") is a personal item location tracker built for people
            managing belongings across multiple homes — such as a primary home, PG, parents'
            home, or office. The app is operated as an independent project and can be reached
            at <a href="mailto:milakya.app@gmail.com">milakya.app@gmail.com</a>.
          </p>
        </div>

        <div className="pp-section">
          <h2>What Data We Collect</h2>
          <p>We collect only what is necessary to provide the service:</p>
          <ul>
            <li><strong>Account information:</strong> Your name and email address when you sign in with Google, or your email and password if you register directly.</li>
            <li><strong>Item data:</strong> Names, categories, locations, notes, and photos of items you add to the app.</li>
            <li><strong>Home and room data:</strong> Names and details of homes and rooms you create.</li>
            <li><strong>Device information:</strong> Browser type and approximate location (city-level only, entered manually by you — we do not use GPS).</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            We do <strong>not</strong> collect payment information, precise GPS location, contacts, or any data unrelated to item tracking.
          </p>
        </div>

        <div className="pp-section">
          <h2>How We Use Your Data</h2>
          <p>Your data is used solely to:</p>
          <ul>
            <li>Provide and personalise the MilaKya service</li>
            <li>Save and retrieve your item and home information</li>
            <li>Enable AI-powered photo and diary scanning features</li>
            <li>Allow semantic search across your items</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            We do <strong>not</strong> use your data for advertising, profiling, or sale to third parties.
          </p>
        </div>

        <div className="pp-section">
          <h2>AI Features & Your Photos</h2>
          <p>
            When you use the photo scan or diary scan features, your image is sent to our
            AI processing service (Groq API) for item detection. Images are processed in
            real-time and are <strong>not stored</strong> on our servers or by our AI provider
            beyond the duration of a single request. Detected item names are stored only
            if you choose to save them.
          </p>
        </div>

        <div className="pp-section">
          <h2>Data Storage & Security</h2>
          <p>Your data is stored securely with:</p>
          <ul>
            <li>Row-level security — you can only access your own data</li>
            <li>Encrypted connections (HTTPS/TLS) for all data in transit</li>
            <li>Encrypted storage at rest</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            We do not share your personal data with any third party except the services
            required to operate MilaKya (Supabase for storage, Groq for AI, Vercel for hosting).
          </p>
        </div>

        <div className="pp-section">
          <h2>Third-Party Services</h2>
          <p>MilaKya uses the following third-party services, each with their own privacy policies:</p>
          <ul>
            <li><strong>Supabase</strong> — database and authentication</li>
            <li><strong>Google OAuth</strong> — optional sign-in</li>
            <li><strong>Groq API</strong> — AI image and text processing</li>
            <li><strong>Vercel</strong> — app hosting</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong> all data we hold about you</li>
            <li><strong>Delete</strong> your account and all associated data at any time via Profile → Delete Account</li>
            <li><strong>Export</strong> your data (coming in a future update)</li>
            <li><strong>Correct</strong> any inaccurate information</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            To exercise any of these rights, use the in-app settings or email us at{' '}
            <a href="mailto:milakya.app@gmail.com">milakya.app@gmail.com</a>.
          </p>
        </div>

        <div className="pp-section">
          <h2>Data Retention</h2>
          <p>
            We retain your data for as long as your account is active. When you delete your
            account, all your homes, rooms, items, and personal information are permanently
            deleted within 30 days.
          </p>
        </div>

        <div className="pp-section">
          <h2>Children's Privacy</h2>
          <p>
            MilaKya is intended for users aged 18 and above. We do not knowingly collect
            data from anyone under 18. If you believe a minor has created an account,
            please contact us and we will delete it promptly.
          </p>
        </div>

        <div className="pp-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy as the app evolves. We will notify you of significant
            changes via the app. Continued use after changes means you accept the updated policy.
          </p>
        </div>

        <div className="pp-section">
          <h2>Contact Us</h2>
          <p>
            For any privacy-related questions or requests, email us at{' '}
            <a href="mailto:milakya.app@gmail.com">milakya.app@gmail.com</a>
          </p>
        </div>

      </div>

      <footer className="pp-footer">
        <p>© 2026 MilaKya · Made in India · <a href="/" style={{ color: '#C8603A', textDecoration: 'none' }}>milakya.vercel.app</a></p>
      </footer>
    </>
  );
}