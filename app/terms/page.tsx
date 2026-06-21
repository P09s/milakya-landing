import type { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | MilaKya',
  description: 'Terms and conditions for using MilaKya.',
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

export default function TermsPage() {
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
          <FileText size={24} strokeWidth={1.8} />
        </div>
        <h1>Terms of Service</h1>
        <p className="pp-hero-date">Last updated: June 2026</p>
      </div>

      <div className="pp-body">

        <div className="pp-section">
          <h2>Acceptance of Terms</h2>
          <p>
            By creating an account or using MilaKya ("the app", "the service"), you agree
            to these Terms of Service. If you do not agree, please do not use the app.
            These terms apply to all users of MilaKya.
          </p>
        </div>

        <div className="pp-section">
          <h2>What MilaKya Is</h2>
          <p>
            MilaKya is a personal item location tracker that helps you record and find
            your belongings across multiple homes and locations. It is a personal
            productivity tool — not a storage, logistics, or inventory management
            service for commercial use.
          </p>
        </div>

        <div className="pp-section">
          <h2>Your Account</h2>
          <ul>
            <li>You must be 18 years or older to use MilaKya.</li>
            <li>You are responsible for keeping your account credentials secure.</li>
            <li>You are responsible for all activity that occurs under your account.</li>
            <li>One person may maintain one account. Creating multiple accounts to circumvent restrictions is not permitted.</li>
            <li>You may delete your account at any time via Profile → Delete Account.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2>Acceptable Use</h2>
          <p>You agree to use MilaKya only for lawful personal purposes. You must not:</p>
          <ul>
            <li>Use the app for any commercial inventory or business purposes</li>
            <li>Attempt to reverse-engineer, hack, or disrupt the service</li>
            <li>Upload content that is illegal, harmful, or violates others' rights</li>
            <li>Use AI scan features to process content you do not own or have rights to</li>
            <li>Create accounts on behalf of others without their consent</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2>Your Data & Content</h2>
          <p>
            You own all content you add to MilaKya — your homes, rooms, items, notes,
            and photos. By using the service, you grant us a limited licence to store and
            process your content solely to provide the MilaKya service to you. We do not
            claim ownership of your data. See our{' '}
            <a href="/privacy">Privacy Policy</a> for full details on how your data is handled.
          </p>
        </div>

        <div className="pp-section">
          <h2>AI Features</h2>
          <p>
            MilaKya's photo scan and diary scan features use AI to detect items from
            images. These are provided as a convenience and may not always be accurate.
            You are responsible for reviewing AI-detected items before saving them.
            We are not liable for errors in AI-generated item names or categories.
          </p>
        </div>

        <div className="pp-section">
          <h2>Service Availability</h2>
          <p>
            We aim to keep MilaKya available at all times but cannot guarantee
            uninterrupted access. The service may be temporarily unavailable due to
            maintenance, updates, or factors outside our control. We are not liable
            for any loss resulting from service downtime.
          </p>
        </div>

        <div className="pp-section">
          <h2>Free Service & Changes</h2>
          <p>MilaKya is currently provided free of charge. We reserve the right to:</p>
          <ul>
            <li>Introduce paid features or plans in the future</li>
            <li>Modify or discontinue features with reasonable notice</li>
            <li>Update these terms — we will notify you of significant changes in-app</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            Continued use of MilaKya after changes to the terms constitutes acceptance
            of the updated terms.
          </p>
        </div>

        <div className="pp-section">
          <h2>Limitation of Liability</h2>
          <p>MilaKya is provided "as is" without warranties of any kind. To the maximum extent permitted by law, we are not liable for:</p>
          <ul>
            <li>Loss of data due to technical failures</li>
            <li>Inaccuracies in AI-detected item information</li>
            <li>Any indirect, incidental, or consequential damages</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            Our total liability to you for any claim shall not exceed the amount you
            paid us in the 12 months prior to the claim (which, for free users, is ₹0).
          </p>
        </div>

        <div className="pp-section">
          <h2>Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be
            subject to the exclusive jurisdiction of the courts of India.
          </p>
        </div>

        <div className="pp-section">
          <h2>Contact Us</h2>
          <p>
            For any questions about these terms, email us at{' '}
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