'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Download,
  MapPin,
  Camera,
  BookOpen,
  Search,
  Share2,
  Globe,
  FileText,
  Pill,
  Key,
  ChevronRight,
  Building2,
  Shirt,
  Mail,
} from 'lucide-react';

const APP_URL     = 'https://mila-kya.vercel.app';
const PRIVACY_URL = '/privacy';
const TERMS_URL   = '/terms';
const INSTAGRAM   = 'https://www.instagram.com/milakya.app';
const LINKEDIN    = 'https://www.linkedin.com/company/milakya';

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const PROOF_STATS = [
  { n: '₹0',  l: 'Bilkul free' },
  { n: '3+',  l: 'Ghars track karo' },
  { n: 'AI',  l: 'Photo + Diary scan' },
  { n: '3',   l: 'Languages' },
  { n: 'PWA', l: 'No app store needed' },
];

const PROBLEMS = [
  {
    Icon: Shirt,
    title: 'Saree kahan hai?',
    text: 'Pehli shaadi mein pehna tha, abhi lagta hai sasural mein chhoot gayi — ya maike mein?',
  },
  {
    Icon: FileText,
    title: 'Passport? PG mein.',
    text: 'Flight kal hai aur passport PG ke drawer mein pada hai. 2 sheher door.',
  },
  {
    Icon: Pill,
    title: 'Medicine maike mein',
    text: 'BP ki dawaai ghar pe chhoot gayi. Emergency mein nai kharidni padi.',
  },
  {
    Icon: Key,
    title: 'Duplicate key?',
    text: 'Ghar ki spare key PG mein hai ya office mein? Dono jagah check karna pada.',
  },
];

const STEPS = [
  {
    n: '1',
    t: 'Ghar add karo',
    d: 'Ghar, PG, sasural, maika, office — jitne chahein. Har ghar ke rooms bhi banao.',
  },
  {
    n: '2',
    t: 'Scan karo ya type karo',
    d: 'AI photo dekh ke items detect kar leta hai. Diary ya list scan karo — AI room bhi assign karega.',
  },
  {
    n: '3',
    t: 'Dhoondo — instant!',
    d: '"Warm clothes kahan hain?" MilaKya batayega. WhatsApp pe location share bhi kar sakte ho.',
  },
];

const FEATURES: {
  ico: React.ReactNode;
  bg: string;
  color: string;
  title: string;
  desc: string;
  screen: string;
  screenLabel: string;
}[] = [
  {
    ico: <Camera size={22} />,
    bg: 'var(--tl)', color: 'var(--t)',
    title: 'AI Photo Scan',
    desc: 'Shelf ya drawer ki photo lo — AI ek saath kai cheezein detect kar leta hai. Koi manual typing nahi.',
    screen: '/screenshots/screen-scan.webp',
    screenLabel: 'Scan Items',
  },
  {
    ico: <Building2 size={22} />,
    bg: '#E8F4EC', color: 'var(--s)',
    title: 'Multi-Ghar Support',
    desc: '3, 4, 5 ghars — sab ek app mein. "Ab yahan hain" se active ghar set karo ek tap mein.',
    screen: '/screenshots/screen-ghar.webp',
    screenLabel: 'Ghar',
  },
  {
    ico: <BookOpen size={22} />,
    bg: '#F5EDD4', color: 'var(--g)',
    title: 'Diary & List OCR',
    desc: 'Haath se likhi list ya printed register scan karo. Hindi aur English dono — room bhi auto-assign.',
    screen: '/screenshots/screen-scan.webp',
    screenLabel: 'Scan Diary',
  },
  {
    ico: <Search size={22} />,
    bg: '#F5EDD4', color: 'var(--g)',
    title: 'Smart Dhoondo',
    desc: '"Shaadi ka saman" ya "warm clothes" — natural language mein search, AI sab gharon mein dhoondega.',
    screen: '/screenshots/screen-search.webp',
    screenLabel: 'Dhoondo',
  },
  {
    ico: <Share2 size={22} />,
    bg: 'var(--tl)', color: 'var(--t)',
    title: 'WhatsApp Share',
    desc: 'Kisi ko bhi cheez ki location WhatsApp pe bhejo — ek tap mein, koi API cost nahi.',
    screen: '/screenshots/screen-whatsapp.webp',
    screenLabel: 'Home > Item Detail',
  },
  {
    ico: <Globe size={22} />,
    bg: '#E8F4EC', color: 'var(--s)',
    title: 'Hinglish · Hindi · English',
    desc: 'App ki bhasha aap choose karo. Strict TypeScript i18n — har label, har message translated.',
    screen: '/screenshots/screen-profile.webp',
    screenLabel: 'Profile',
  },
];

const SCREENS = [
  { src: '/screenshots/screen-home.webp',     label: 'Home',          pill: 'Apni cheezein'   },
  { src: '/screenshots/screen-search.webp',   label: 'Dhoondo',       pill: 'Search karo'     },
  { src: '/screenshots/screen-scan.webp',     label: 'Scan',          pill: 'AI photo scan'   },
  { src: '/screenshots/screen-ghar.webp',     label: 'Ghar',          pill: 'Mere sab ghar'   },
  { src: '/screenshots/screen-profile.webp',  label: 'Profile',       pill: 'Aapka account'   },
  { src: '/screenshots/screen-whatsapp.webp', label: 'Whatsapp Share',pill: 'WhatsApp Share'  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Curve divider
// ─────────────────────────────────────────────────────────────────────────────
function MkCurve({ bg, fill, flip }: { bg: string; fill: string; flip?: boolean }) {
  return (
    <div className="mk-curve" style={{ background: bg }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={flip ? { transform: 'scaleX(-1)' } : undefined}
      >
        <path
          d="M0,0 L1440,0 L1440,46 C1200,78 1080,14 840,42 C600,70 360,10 120,46 C72,54 36,50 0,42 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Showcase — mobile auto-swipes through screens while in view; desktop is
// untouched and keeps the original manual horizontal-swipe behaviour.
// ─────────────────────────────────────────────────────────────────────────────
function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeScreen, setActiveScreen] = useState(0);

  // Mobile only: poll getBoundingClientRect every rAF frame.
  // Works regardless of which element is the scroll container (Next.js safe).
  useEffect(() => {
    if (!window.matchMedia('(max-width: 640px)').matches) return;

    let rafId: number;
    let lastIdx = -1;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const section = sectionRef.current;
      if (!section) return;

      const rect        = section.getBoundingClientRect();
      const scrollableH = section.offsetHeight - window.innerHeight;
      if (scrollableH <= 0) return;

      // How far the section top has moved above the viewport top
      const scrolledIn = Math.max(0, -rect.top);
      const progress   = Math.min(scrolledIn / scrollableH, 0.9999);
      const idx        = Math.floor(progress * SCREENS.length);

      if (idx !== lastIdx) { lastIdx = idx; setActiveScreen(idx); }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const s = SCREENS[activeScreen];

  return (
    <section className="mk-showcase" ref={sectionRef}>

      {/* ── MOBILE: sticky single-phone, scroll-driven ── */}
      <div className="mk-sc-mobile">
        <div className="mk-sc-sticky">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div className="mk-sec-label lt">Asli app, asli screenshots</div>
            <h2 className="mk-sec-h2 lt" style={{ fontSize: 'clamp(22px, 5vw, 32px)', marginBottom: 0 }}>
              Dekho app kaisi dikhti hai
            </h2>
          </div>

          {/* key= forces React to remount the img, triggering the fade-in */}
          <div className="mk-showcase-phone" style={{ width: 185, flexShrink: 0 }}>
            <div className="mk-showcase-notch" />
            <img
              key={activeScreen}
              src={s.src}
              alt={`MilaKya ${s.label} screen`}
              className="mk-showcase-img mk-hub-img-fade"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="mk-showcase-pill" style={{ marginTop: 14 }}>{s.pill}</div>
          <div className="mk-showcase-label">{s.label}</div>

          {/* Pill-style progress dots */}
          <div className="mk-sc-dots">
            {SCREENS.map((_, i) => (
              <div key={i} className={`mk-sc-dot${i === activeScreen ? ' active' : ''}`} />
            ))}
          </div>
          <p className="mk-sc-hint">↓ scroll to explore all screens</p>
        </div>
      </div>

      {/* ── DESKTOP: original horizontal swipe strip (unchanged) ── */}
      <div className="mk-sc-desktop">
        <div className="mk-showcase-head">
          <div className="mk-sec-label lt rev">Asli app, asli screenshots</div>
          <h2 className="mk-sec-h2 lt rev" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>
            Dekho app kaisi dikhti hai
          </h2>
        </div>
        <div className="mk-showcase-strip">
          {SCREENS.map((sc) => (
            <div key={sc.label} className="mk-showcase-item">
              <div className="mk-showcase-phone">
                <div className="mk-showcase-notch" />
                <img src={sc.src} alt={`MilaKya ${sc.label} screen`}
                  className="mk-showcase-img" loading="lazy" decoding="async" />
              </div>
              <div className="mk-showcase-pill">{sc.pill}</div>
              <div className="mk-showcase-label">{sc.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FeatureHub — extracted so we can attach the scroll-observer refs cleanly
// ─────────────────────────────────────────────────────────────────────────────
function FeatureHub() {
  const [activeFeature, setActiveFeature] = useState(0);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const commitRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef(0);
  const activeRef = useRef(0); // mirrors activeFeature for use inside the scroll loop

  useEffect(() => {
    // ── DESKTOP: scroll-driven via the tall outer wrapper ──
  const isDesktop = window.matchMedia('(min-width: 901px)').matches;
  if (isDesktop) {
    let lastIdx = -1;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const outer = document.querySelector('.mk-feats-outer') as HTMLElement | null;
      if (!outer) return;

      const rect       = outer.getBoundingClientRect();
      const scrollableH = outer.offsetHeight - window.innerHeight;
      if (scrollableH <= 0) return;

      const scrolledIn = Math.max(0, -rect.top);
      const progress   = Math.min(scrolledIn / scrollableH, 0.9999);
      const idx        = Math.floor(progress * FEATURES.length);

      if (idx !== lastIdx) {
        lastIdx              = idx;
        activeRef.current    = idx;
        pendingRef.current   = idx;
        setActiveFeature(idx);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }
    const mql = window.matchMedia('(max-width: 900px)');
    if (!mql.matches) return; // desktop: click only, no scroll-driven switching

    const MAX_DIST    = 220; // px — ignore cards too far from the target line
    const HYSTERESIS  = 36;  // px — a challenger must beat the incumbent by this much
    const SETTLE_MS   = 90;  // debounce before committing a switch

    const findActive = () => {
      const target = window.innerHeight * 0.40; // golden-third trigger line
      let bestDist = Infinity;
      let bestIdx = activeRef.current;
      let currentDist = Infinity;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const centre = r.top + r.height / 2;
        const dist = Math.abs(centre - target);
        if (i === activeRef.current) currentDist = dist;
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      });

      if (bestDist > MAX_DIST) return; // nothing close enough — keep current

      // Hysteresis: a challenger only wins if it clearly beats the incumbent.
      // This is what stops two near-equidistant cards from flip-flopping.
      if (bestIdx === activeRef.current) {
        pendingRef.current = bestIdx;
        return;
      }
      if (currentDist - bestDist < HYSTERESIS) return;

      if (pendingRef.current !== bestIdx) {
        pendingRef.current = bestIdx;
        if (commitRef.current) clearTimeout(commitRef.current);
        commitRef.current = setTimeout(() => {
          activeRef.current = pendingRef.current;
          setActiveFeature(pendingRef.current);
        }, SETTLE_MS);
      }
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        findActive();
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    findActive(); // run once on mount

    const handleMql = (e: MediaQueryListEvent) => {
      if (!e.matches) window.removeEventListener('scroll', onScroll);
    };
    mql.addEventListener('change', handleMql);

    return () => {
      window.removeEventListener('scroll', onScroll);
      mql.removeEventListener('change', handleMql);
      if (commitRef.current) clearTimeout(commitRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleSelect = (i: number) => {
    activeRef.current = i;
    pendingRef.current = i;
    setActiveFeature(i);
  };

  const activeF = FEATURES[activeFeature];

  return (
    <div className="mk-feat-hub">
      {/* ── Sticky phone ── */}
      <div className="mk-hub-phone-wrap">
        <div className="mk-hub-phone">
        <div className="mk-hub-notch" />
          <div className="mk-hub-pscreen">
            <img
              key={activeF.screen + activeFeature}
              src={activeF.screen}
              alt={`MilaKya — ${activeF.title}`}
              className="mk-hub-screen-img mk-hub-img-fade"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="mk-hub-active-label">{activeF.screenLabel}</div>
      </div>

      {/* ── Left column (features 0-2) ── */}
      <div className="mk-hub-col left">
        <div className="mk-hub-card-spacer" />
        {FEATURES.slice(0, 3).map((f, i) => (
          <div key={f.title} className="rev">
            <button
              type="button"
              ref={(el) => { cardRefs.current[i] = el; }}
              aria-pressed={activeFeature === i}
              className={`mk-hub-card${activeFeature === i ? ' active' : ''}`}
              onClick={() => handleSelect(i)}
            >
              <div className="mk-hub-ico" style={{ background: f.bg, color: f.color }}>
                {f.ico}
              </div>
              <div className="mk-hub-t">{f.title}</div>
              <div className="mk-hub-d">{f.desc}</div>
            </button>
          </div>
        ))}
      </div>

      {/* ── Right column (features 3-5) ── */}
      <div className="mk-hub-col right">
        <div className="mk-hub-card-spacer" />
        {FEATURES.slice(3, 6).map((f, i) => {
          const idx = i + 3;
          return (
            <div key={f.title} className="rev">
              <button
                type="button"
                ref={(el) => { cardRefs.current[idx] = el; }}
                aria-pressed={activeFeature === idx}
                className={`mk-hub-card${activeFeature === idx ? ' active' : ''}`}
                onClick={() => handleSelect(idx)}
              >
                <div className="mk-hub-ico" style={{ background: f.bg, color: f.color }}>
                  {f.ico}
                </div>
                <div className="mk-hub-t">{f.title}</div>
                <div className="mk-hub-d">{f.desc}</div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CtaPhone — rises from below once scrolled into view (desktop only; the
// column wrapping it is hidden on mobile via CSS)
// ─────────────────────────────────────────────────────────────────────────────
function CtaPhone() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let obs: IntersectionObserver | null = null;
    try {
      obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          obs?.disconnect();
        }
      }, { threshold: 0.6 });
      obs.observe(el);
    } catch {
      el.classList.add('in-view');
    }
    return () => obs?.disconnect();
  }, []);

  return (
    <div ref={ref} className="mk-fcta-phone-frame">
      <div className="mk-fcta-dynamic-island" />
      <div className="mk-fcta-screen">
        <div className="mk-fcta-screen-label">Scan the QR code to download the app</div>
        <div className="mk-fcta-qrbox">
          <img
            src={`/qr.png`}
            alt="Scan to install MilaKya"
            style={{ width: 200, height: 200, display: 'block', borderRadius: 4 }}
            loading="lazy" decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroPhones — scroll-scrubbed: distance between the two phones tracks scroll
// position directly. Scroll down and they slide together from their own
// sides; scroll back up to the top and they slide back apart. Not a one-time
// entrance — it's reversible at any point. Same behaviour on mobile/desktop.
// ─────────────────────────────────────────────────────────────────────────────
function HeroPhones() {
  const ph1Ref = useRef<HTMLDivElement>(null);
  const ph2Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Static resting pose for reduced-motion users
      if (ph1Ref.current) { ph1Ref.current.style.opacity = '1'; ph1Ref.current.style.transform = 'rotate(-6deg)'; }
      if (ph2Ref.current) { ph2Ref.current.style.opacity = '1'; ph2Ref.current.style.transform = 'rotate(4.5deg)'; }
      return;
    }

    const apply = (p: number) => {
      const w1 = ph1Ref.current?.offsetWidth ?? 180;
      const w2 = ph2Ref.current?.offsetWidth ?? 180;
      const offset1 = (1 - p) * w1 * 1.3;
      const offset2 = (1 - p) * w2 * 1.3;
      const opacity  = 0.25 + 0.75 * p;
      if (ph1Ref.current) {
        ph1Ref.current.style.transform = `translateX(${-offset1}px) rotate(-6deg)`;
        ph1Ref.current.style.opacity   = String(opacity);
      }
      if (ph2Ref.current) {
        ph2Ref.current.style.transform = `translateX(${offset2}px) rotate(4.5deg)`;
        ph2Ref.current.style.opacity   = String(opacity);
      }
    };

    let currentP  = 0;   // eased/displayed value
    let lastPaint = -1;  // skip frame if nothing changed

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      // ── KEY FIX ──────────────────────────────────────────────────────
      // getBoundingClientRect().top is relative to the *viewport*, not the
      // document. It reflects actual visual scrolling regardless of whether
      // window, a Next.js layout div, or any other container is scrolling.
      // We don't need a scroll event at all — just poll every frame.
      const heroEl = ph1Ref.current?.closest('.mk-hero') as HTMLElement | null;
      if (!heroEl) return;

      const heroTop   = heroEl.getBoundingClientRect().top;
      // heroTop ≈ 0 when the page is at the top (hero fills the viewport).
      // heroTop goes negative as the user scrolls down.
      const scrolled  = Math.max(-heroTop, 0);               // 0 → positive
      const maxScroll = window.innerHeight * 0.42;
      const targetP   = Math.min(scrolled / maxScroll, 1);
      // ─────────────────────────────────────────────────────────────────

      // Gentle ease toward target (same spring feel as before)
      currentP += (targetP - currentP) * 0.18;
      if (Math.abs(targetP - currentP) < 0.001) currentP = targetP;

      // Skip paint if value hasn't meaningfully changed
      if (Math.abs(currentP - lastPaint) < 0.0005) return;
      lastPaint = currentP;
      apply(currentP);
    };

    apply(0);                            // start phones fully "apart"
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="mk-phones">
      <div ref={ph1Ref} className="mk-phone mk-ph1">
        <div className="mk-notch" />
        <div className="mk-pscreen">
          <img
            src="/screenshots/screen-home.webp"
            alt="MilaKya Home — Apni cheezein"
            className="mk-phone-img"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
      <div ref={ph2Ref} className="mk-phone mk-ph2">
        <div className="mk-notch" />
        <div className="mk-pscreen">
          <img
            src="/screenshots/screen-scan.webp"
            alt="MilaKya Scan — AI photo scan"
            className="mk-phone-img"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.add('js-rev-ready');

    let obs: IntersectionObserver | null = null;
    try {
      obs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              obs?.unobserve(e.target);
            }
          }),
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
      );
      document.querySelectorAll('.rev').forEach((el) => obs!.observe(el));
    } catch {
      document.querySelectorAll('.rev').forEach((el) => el.classList.add('in'));
    }

    return () => obs?.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav className={`mk-nav${scrolled ? ' scrolled' : ''}`}>
        <a className="mk-logo" href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/icon.png" alt="" width={28} height={28} decoding="async"
            style={{ width: 28, height: 28, borderRadius: 7, display: 'block' }} />
          <span>{`Mila`}<em>{`Kya`}</em></span>
        </a>
        <a className="mk-nav-btn" href={APP_URL} target="_blank" rel="noopener noreferrer">
          <Download size={15} strokeWidth={2.5} />
          Try Karo
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="mk-hero">
        <div className="mk-hero-glows">
          <div className="mk-hero-glow" />
          <div className="mk-hero-glow2" />
          <Key className="mk-doodle on-light" size={50} style={{ top: '12%', left: '8%', '--rot': '-12deg', animationDelay: '0.3s' } as React.CSSProperties} />
          <Shirt className="mk-doodle on-light" size={54} style={{ bottom: '10%', right: '7%', '--rot': '9deg', animationDelay: '1.4s' } as React.CSSProperties} />
        </div>
        <div className="mk-eyebrow hero-in" style={{ animationDelay: '0.05s' }}>
          <MapPin size={12} strokeWidth={2.5} />
          India ke multi-home generation ke liye
        </div>
        <h1 className="hero-in" style={{ animationDelay: '0.15s' }}>
          Saman<br /><span className="hl">kahan hai?</span>
        </h1>
        <p className="mk-hero-sub hero-in" style={{ animationDelay: '0.25s' }}>
          MilaKya aapka saman track karta hai — ghar, PG, sasural, maika — sab jagah ek saath.
        </p>
        <div className="mk-cta-row hero-in" style={{ animationDelay: '0.35s' }}>
          <a className="mk-btn-p" href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Download size={18} strokeWidth={2.5} />
            Free mein Install Karo
          </a>
          <a href="#kaise" className="mk-btn-s">
            Kaise kaam karta hai?
            <ChevronRight size={16} />
          </a>
        </div>

        <HeroPhones />
      </section>

      {/* ── PROOF BAR ── */}
      <div className="mk-proof">
        {PROOF_STATS.map((p) => (
          <div key={p.l} className="mk-proof-item rev">
            <div className="mk-proof-n">{p.n}</div>
            <div className="mk-proof-l">{p.l}</div>
          </div>
        ))}
      </div>

      <MkCurve bg="#1A0E08" fill="var(--w)" />

      {/* ── APP SHOWCASE ── */}
      <Showcase />

      <div style={{ background: '#1A0E08', display: 'flex', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ height: '1px', width: '100%', maxWidth: 900,
          background: 'linear-gradient(to right, transparent, rgba(250,246,240,0.12) 20%, rgba(250,246,240,0.12) 80%, transparent)' }} />
      </div>

      {/* ── PROBLEM ── */}
      <section className="mk-prob">
        <div className="mk-wrap">
          <div className="mk-sec-label lt rev">Yeh aapke saath bhi hua hai</div>
          <h2 className="mk-sec-h2 lt rev">
            Roz ka confusion,<br />roz ki tension
          </h2>
          <p className="mk-sec-body lt rev">
            Indians live across multiple homes. Yet no app was built for this reality — passport at PG,
            medicine at maika, jewellery at sasural.
          </p>
          <div className="mk-prob-grid">
            {PROBLEMS.map(({ Icon, title, text }) => (
              <div key={title} className="mk-prob-card rev">
                <div className="mk-prob-icon"><Icon size={32} /></div>
                <div className="mk-prob-title">{title}</div>
                <div className="mk-prob-text">{text}</div>
              </div>
            ))}
          </div>

          {/* Mobile-only: full-bleed story stack (desktop grid above is untouched) */}
          <div className="mk-prob-stories">
            {PROBLEMS.map(({ Icon, title, text }) => (
              <div key={title} className="mk-story-card">
                <div className="mk-story-bubble"><Icon size={12} /></div>
                <div className="mk-story-title">{title}</div>
                <div className="mk-story-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MkCurve bg="var(--cd)" fill="#1A0E08" />

      {/* ── HOW IT WORKS ── */}
      <section className="mk-how" id="kaise">
        <div className="mk-wrap">
          <div className="mk-sec-label dk rev">Bahut aasaan hai</div>
          <h2 className="mk-sec-h2 dk rev">3 steps mein<br />sab organize</h2>
          <div className="mk-steps">
            {STEPS.map((s) => (
              <div key={s.n} className="mk-step rev">
                <div className="mk-step-n">{s.n}</div>
                <div>
                  <div className="mk-step-t">{s.t}</div>
                  <div className="mk-step-d">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES — PHONE HUB ── */}
      <div className="mk-feats-outer" id="features">   {/* ← new wrapper, id moves here */}
        <section className="mk-feats">                  {/* ← id removed from here */}
          <div className="mk-wrap">
            <div className="mk-sec-label dk rev">Kya kya hai andar</div>
            <h2 className="mk-sec-h2 dk rev">India ke liye<br />banaya gaya hai</h2>
            <FeatureHub />
          </div>
        </section>
      </div>

      {/* ── FINAL CTA ── */}
      <div className="mk-fcta-zone">
        <MkCurve bg="transparent" fill="var(--c)" flip />
        <section className="mk-fcta">
          <div className="mk-fcta-grid">
            <div className="mk-fcta-copy">
              <div style={{
                display: 'inline-block', background: 'rgba(255,255,255,0.18)', color: '#fff',
                borderRadius: 100, padding: '5px 14px', fontSize: 11, fontWeight: 700,
                letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 20
              }}>
                Bilkul free · No card needed
              </div>
              <h2 className="mk-sec-h2 rev" style={{ fontSize: 'clamp(36px,6vw,58px)', marginBottom: 14 }}>
                Shuru karo aaj hi
              </h2>
              <p className="mk-sec-body rev" style={{ marginBottom: 36 }}>
                Free hai. Install karo, account banao, 5 minute mein pehla ghar set up karo.
                No credit card, no nonsense.
              </p>
              <div className="mk-fcta-btns rev">
                <a className="mk-btn-p" href={APP_URL} target="_blank" rel="noopener noreferrer">
                  <Download size={20} strokeWidth={2.5} />
                  Free mein Install Karo
                </a>
              </div>
              <div className="mk-fcta-note" style={{ marginTop: 18 }}>
                Android PWA · Works offline · No app store needed
              </div>
            </div>

            <div className="mk-fcta-phonecol">
              <CtaPhone />
            </div>
          </div>
        </section>
      </div>

      <MkCurve bg="var(--b)" fill="var(--t)" />

      {/* ── FOOTER ── */}
      <footer className="mk-footer">
        <div className="mk-foot-desktop">
          <div className="mk-foot-top">
            <div className="mk-foot-brand">
              <a href="/" className="mk-foot-logo" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <img src="/icon.png" alt="" width={32} height={32} loading="lazy" decoding="async"
                  style={{ width: 32, height: 32, borderRadius: 8, display: 'block' }} />
                <span>{`Mila`}<em>{`Kya`}</em></span>
              </a>
              <p className="mk-foot-tagline">
                Apna saman, apni jagah.<br />
                Built for India's multi-home generation.
              </p>
              <div className="mk-foot-social">
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="mk-foot-sico" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="mk-foot-sico" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="mk-foot-col">
              <h4>Legal</h4>
              <a href={PRIVACY_URL}>Privacy Policy</a>
              <a href={TERMS_URL}>Terms of Service</a>
            </div>
            <div className="mk-foot-col">
              <h4>Contact</h4>
              <a href="mailto:milakya.app@gmail.com">Email</a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="mk-foot-bottom">
            <span>© 2026 MilaKya. All rights reserved.</span>
            <span className="mk-foot-flag">🇮🇳 Made in India · Built for Bharat</span>
          </div>
        </div>

        {/* Mobile-only: compact pill-style footer */}
        <div className="mk-foot-mobile">
          <div className="mk-mfoot-brand">
            <img src="/icon.png" alt="" width={28} height={28} loading="lazy" decoding="async"
              style={{ width: 28, height: 28, borderRadius: 7 }} />
            <a href="/" className="mk-mfoot-logo">{`Mila`}<em>{`Kya`}</em></a>
          </div>
          <p className="mk-mfoot-tagline">Apna saman, apni jagah · Built for Bharat</p>

          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="mk-mfoot-cta">
            <Download size={16} strokeWidth={2.5} /> Free mein Install Karo
          </a>

          <div className="mk-mfoot-links">
            <a href={PRIVACY_URL} className="mk-mfoot-link">Privacy</a>
            <a href={TERMS_URL} className="mk-mfoot-link">Terms</a>
            <a href="mailto:milakya.app@gmail.com" className="mk-mfoot-link">
              <Mail size={11} /> Email
            </a>
          </div>

          <div className="mk-mfoot-social">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="mk-mfoot-sico" aria-label="Instagram">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="mk-mfoot-sico" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <div className="mk-mfoot-divider" />
          <div className="mk-mfoot-bottom">
            <span>© 2026 MilaKya</span>
            <span>🇮🇳 Made in India</span>
          </div>
        </div>
      </footer>
    </>
  );
}