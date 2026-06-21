'use client';

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

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Inter:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --t:   #C8603A;
  --td:  #A84E2C;
  --tl:  #F2D8CE;
  --t15: rgba(200,96,58,0.15);
  --c:   #FAF6F0;
  --cd:  #EFE7DC;
  --w:   #FFFFFF;
  --b:   #2C1810;
  --bm:  #6B3D2E;
  --mu:  #9B7B6C;
  --g:   #C4923A;
  --s:   #4A7C59;
  --r8:  8px;  --r14: 14px;  --r20: 20px;  --r28: 28px;
}

html { scroll-behavior: smooth; }

.mk-wrap { max-width: 1100px; margin: 0 auto; }

.mk-prob, .mk-how, .mk-showcase {
  content-visibility: auto;
  contain-intrinsic-size: auto 700px;
}

.mk-sec-label {
  font-size: 11px; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; margin-bottom: 14px;
}
.mk-sec-label.lt { color: rgba(200,96,58,0.75); }
.mk-sec-label.dk { color: var(--t); }

.mk-sec-h2 {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(28px, 5vw, 48px); font-weight: 800;
  line-height: 1.05; letter-spacing: -1px; margin-bottom: 14px;
}
.mk-sec-h2.lt { color: var(--c); }
.mk-sec-h2.dk { color: var(--b); }

.mk-sec-body { font-size: 16px; line-height: 1.65; max-width: 500px; }
.mk-sec-body.lt { color: rgba(250,246,240,0.55); }
.mk-sec-body.dk { color: var(--mu); }

/* ── BUTTONS ── */
.mk-btn-p {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--t); color: #fff; border: none;
  border-radius: var(--r14); padding: 16px 28px;
  font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 17px;
  cursor: pointer; transition: background 0.22s, transform 0.15s, box-shadow 0.22s;
  box-shadow: 0 4px 24px rgba(200,96,58,0.32);
  text-decoration: none; white-space: nowrap;
}
.mk-btn-p:hover { background: var(--td); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,96,58,0.42); }
.mk-btn-p:active { transform: translateY(0) scale(0.97); box-shadow: 0 3px 16px rgba(200,96,58,0.3); }

.mk-btn-s {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--w); color: var(--b); border: 1.5px solid var(--cd);
  border-radius: var(--r14); padding: 16px 28px;
  font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 17px;
  cursor: pointer; transition: border-color 0.22s, transform 0.15s; text-decoration: none; white-space: nowrap;
}
.mk-btn-s:hover { border-color: var(--t); transform: translateY(-1px); }
.mk-btn-s:active { transform: translateY(0) scale(0.97); }

/* ── NAV ── */
.mk-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 14px 28px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(250,246,240,0.86);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(200,96,58,0.1);
  transition: padding 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.mk-nav.scrolled {
  padding: 10px 28px;
  box-shadow: 0 4px 24px rgba(44,24,16,0.08);
  border-bottom-color: rgba(200,96,58,0.18);
}
.mk-logo {
  font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 22px;
  color: var(--t); letter-spacing: -0.5px; text-decoration: none;
}
.mk-logo em { color: var(--b); font-style: normal; }
.mk-nav-btn {
  background: var(--t); color: #fff; border: none; border-radius: 100px;
  padding: 9px 20px; font-family: 'Outfit', sans-serif;
  font-weight: 700; font-size: 14px; cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  display: inline-flex; align-items: center; gap: 6px;
  text-decoration: none;
}
.mk-nav-btn:hover { background: var(--td); transform: translateY(-1px); }
.mk-nav-btn:active { transform: translateY(0) scale(0.95); }

/* ── HERO ── */
.mk-hero {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 120px 24px 108px;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  position: relative; background: var(--c);
  overflow: hidden
}
.mk-hero-glows {
  position: absolute; inset: 0;
  overflow: hidden; pointer-events: none; z-index: 0;
}
.mk-hero-glow {
  position: absolute; top: -120px; right: -160px; width: 620px; height: 620px;
  background: radial-gradient(circle, rgba(200,96,58,0.13) 0%, transparent 68%);
}
.mk-hero-glow2 {
  position: absolute; bottom: -80px; left: -120px; width: 460px; height: 460px;
  background: radial-gradient(circle, rgba(196,146,58,0.09) 0%, transparent 68%);
}

@keyframes mkHeroIn {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-in { animation: mkHeroIn 0.8s cubic-bezier(.16,1,.3,1) both; }

.mk-eyebrow {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--tl); color: var(--t); border-radius: 100px;
  padding: 6px 16px; font-size: 12px; font-weight: 600; letter-spacing: 0.04em;
  margin-bottom: 22px;
}
.mk-hero h1 {
  position: relative; z-index: 1;
  font-family: 'Outfit', sans-serif;
  font-size: clamp(48px, 9vw, 88px); font-weight: 900;
  line-height: 0.95; letter-spacing: -2.5px; color: var(--b); margin-bottom: 8px;
}
.mk-hero h1 .hl { color: var(--t); }
.mk-hero-sub {
  position: relative; z-index: 1;
  font-family: 'Outfit', sans-serif; font-size: clamp(16px, 2.5vw, 20px);
  color: var(--mu); margin-bottom: 36px; max-width: 480px; line-height: 1.55;
}
.mk-cta-row {
  position: relative; z-index: 1;
  display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 64px;
}

/* ── PHONE MOCKUPS ── */
.mk-phones {
  position: relative; z-index: 1;
  width: 100%; max-width: 380px; height: 440px; margin: 0 auto;
}
.mk-phone {
  position: absolute; width: 188px; border-radius: 32px;
  background: #1A0E08; padding: 10px;
  box-shadow: 0 28px 72px rgba(26,14,8,0.32), 0 0 0 1px rgba(255,255,255,0.06);
}
.mk-pscreen {
  width: 100%; border-radius: 23px; overflow: hidden;
  background: #1A0E08; position: relative;
  aspect-ratio: 9 / 19.5;
}
.mk-notch {
  position: absolute; top: 7px; left: 50%; transform: translateX(-50%);
  width: 56px; height: 9px; background: #1A0E08; border-radius: 8px; z-index: 3;
}
/* Scroll-scrubbed: the JS in HeroPhones sets transform/opacity inline on every
   scroll tick, tracking distance from the top of the page. These are just the
   resting values used before JS hydrates (and the prefers-reduced-motion case). */
.mk-ph1 { left: 12px; top: 32px; transform: translateX(-220px) rotate(-6deg); opacity: 0.25; }
.mk-ph2 { right: 12px; top: 4px;  transform: translateX(220px) rotate(4.5deg); opacity: 0.25; }

@media (min-width: 641px) {
  .mk-phones { max-width: 450px; height: 510px; }
  .mk-phone  { width: 208px; }
  .mk-ph1    { left: 14px; top: 36px; }
  .mk-ph2    { right: 14px; top: 6px; }
}

/* ── PROOF BAR ── */
.mk-proof {
  background: var(--w); padding: 40px 24px;
  display: flex; flex-wrap: wrap; gap: 32px; justify-content: center;
}
.mk-proof-item { text-align: center; }
.mk-proof-n {
  font-family: 'Outfit', sans-serif; font-size: 38px; font-weight: 900;
  color: var(--t); line-height: 1; margin-bottom: 4px;
}
.mk-proof-l { font-size: 13px; color: var(--mu); }

/* ── PROBLEM ── */
.mk-prob { background: #1A0E08; padding: 96px 24px; position: relative; overflow: hidden; }
.mk-prob-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px; margin-top: 48px;
}
.mk-prob-card {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--r20); padding: 28px 24px;
  position: relative; overflow: hidden; transition: background 0.22s, transform 0.22s;
}
.mk-prob-card:hover { background: rgba(255,255,255,0.1); transform: translateY(-3px); }
.mk-prob-icon {
  position: absolute; right: 18px; top: 18px;
  opacity: 0.1; color: var(--tl);
}
.mk-prob-title {
  font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 700;
  color: #fff; margin-bottom: 8px;
}
.mk-prob-text { font-size: 13.5px; line-height: 1.6; color: rgba(250,246,240,0.48); }

/* Mobile-only full-bleed story stack — replaces the carousel below 640px.
   Desktop keeps the original .mk-prob-grid untouched. */
.mk-prob-stories { display: none; }

@media (max-width: 640px) {
  .mk-prob { padding: 64px 0 72px; }
  .mk-prob > .mk-wrap > *:not(.mk-prob-stories) { padding: 0 20px; }

  .mk-prob-grid { display: none; }

  .mk-prob-stories {
    display: flex; flex-direction: column; gap: 0;
    margin-top: 40px;
  }

  .mk-story-card {
    position: relative;
    padding: 28px 20px 28px 56px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .mk-story-card:last-child { border-bottom: 1px solid rgba(255,255,255,0.06); }
  .mk-story-card:nth-child(even) { background: rgba(200,96,58,0.03); }

  /* Vertical timeline line */
  .mk-story-card::before {
    content: '';
    position: absolute; left: 27px; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(to bottom,
      transparent 0%,
      rgba(200,96,58,0.3) 20%,
      rgba(200,96,58,0.3) 80%,
      transparent 100%
    );
  }

  /* Icon bubble sitting on the timeline */
  .mk-story-bubble {
    position: absolute; left: 14px; top: 28px;
    width: 27px; height: 27px; border-radius: 50%;
    background: rgba(200,96,58,0.18); border: 1px solid rgba(200,96,58,0.3);
    display: flex; align-items: center; justify-content: center;
    color: var(--t); z-index: 1;
  }

  .mk-story-title {
    font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 800;
    color: #fff; margin-bottom: 6px; letter-spacing: -0.3px;
  }
  .mk-story-text {
    font-size: 13.5px; line-height: 1.65; color: rgba(250,246,240,0.48);
  }
}

/* ── HOW IT WORKS ── */
.mk-how { background: var(--cd); padding: 96px 24px; }
.mk-steps {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px; margin-top: 48px;
}
.mk-step {
  background: var(--w); border-radius: var(--r20); padding: 32px 22px;
  text-align: center; transition: transform 0.22s, box-shadow 0.22s;
}
.mk-step:hover { transform: translateY(-4px); box-shadow: 0 14px 40px rgba(200,96,58,0.1); }
.mk-step-n {
  width: 40px; height: 40px; background: var(--t); color: #fff; border-radius: 50%;
  font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 17px;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
}
.mk-step-t { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; color: var(--b); margin-bottom: 8px; }
.mk-step-d { font-size: 13px; color: var(--mu); line-height: 1.6; }

@media (max-width: 640px) {
  .mk-steps { display: flex; flex-direction: column; gap: 0; margin-top: 40px; }
  .mk-step {
    display: flex; align-items: flex-start; gap: 16px; text-align: left;
    background: transparent; border-radius: 0; padding: 0 0 32px; position: relative;
  }
  .mk-step:hover { transform: none; box-shadow: none; }
  .mk-step-n { margin: 0; flex-shrink: 0; position: relative; z-index: 1; }
  .mk-step:not(:last-child)::before {
    content: ''; position: absolute; left: 19px; top: 40px; bottom: 0;
    width: 2px; background: linear-gradient(var(--t), rgba(200,96,58,0.15));
  }
}

/* ── FEATURES — PHONE HUB ── */
.mk-feats { padding: 96px 24px; background: var(--c); }

/* ── FINAL CTA ── */
.mk-fcta-zone {
  background: var(--t); position: relative; overflow: hidden;
}
.mk-fcta {
  padding: 80px 24px 0; text-align: center;
  position: relative;
}
.mk-fcta .mk-sec-h2  { color: #fff; }
.mk-fcta .mk-sec-body { color: rgba(255,255,255,0.7); margin: 0 auto 40px; }
.mk-fcta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.mk-fcta .mk-btn-p {
  background: #fff; color: var(--t); font-size: 18px;
  padding: 18px 36px; box-shadow: 0 6px 32px rgba(0,0,0,0.18);
}
.mk-fcta .mk-btn-p:hover { background: var(--c); transform: translateY(-2px); }
.mk-fcta-note { color: rgba(255,255,255,0.45); font-size: 12px; margin-top: 24px; }

.mk-fcta-grid {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 400px;
  gap: 40px; align-items: flex-end;
}
.mk-fcta-copy { padding-bottom: 80px; }
.mk-fcta-phonecol { display: flex; justify-content: center; align-items: flex-end; }

@keyframes mkQrPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(200,96,58,0.18); }
  50%      { box-shadow: 0 0 0 10px rgba(200,96,58,0); }
}
.mk-fcta-qrbox {
  border: 1.5px solid rgba(200,96,58,0.25); border-radius: 20px;
  padding: 16px; background: #fff; animation: mkQrPulse 2.6s ease-in-out infinite;
}

/* CTA phone — rises into view from below once scrolled into the viewport.
   Desktop-only (the column itself is display:none below 760px). */
.mk-fcta-phone-frame {
  width: 340px; background: #1A1A1A;
  border-radius: 48px 48px 0 0; padding: 10px 10px 0;
  box-shadow: 0 -24px 80px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.08);
  position: relative;
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 1.4s cubic-bezier(.16,1,.3,1), transform 1.4s cubic-bezier(.16,1,.3,1);
}
.mk-fcta-phone-frame.in-view { opacity: 1; transform: translateY(0); }
.mk-fcta-dynamic-island {
  position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
  width: 100px; height: 28px; background: #000; border-radius: 99px; z-index: 3;
}
.mk-fcta-screen {
  width: 100%; border-radius: 40px 40px 0 0; overflow: hidden;
  background: #fff; display: flex; flex-direction: column;
  align-items: center; padding: 72px 36px 44px;
}
.mk-fcta-screen-label {
  font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 700;
  color: #666; letter-spacing: -1px; line-height: 1.15; margin-bottom: 16px;
  text-align: center;
}

@media (max-width: 760px) {
  .mk-fcta { padding: 64px 20px 56px; }
  .mk-fcta-grid { grid-template-columns: 1fr; gap: 0; }
  .mk-fcta-copy { padding-bottom: 0; }
  .mk-fcta-phonecol { display: none; }
}

/* ── FOOTER ── */
.mk-footer { background: var(--b); }

.mk-foot-desktop {
  padding: 56px 24px 36px;
  font-family: 'Inter', sans-serif;
}
.mk-foot-top {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr auto auto;
  gap: 48px; align-items: start;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.mk-foot-brand {}
.mk-foot-logo {
  font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 24px;
  color: var(--t); letter-spacing: -0.5px; display: block; margin-bottom: 10px;
  text-decoration: none;
}
.mk-foot-logo em { color: #fff; font-style: normal; }
.mk-foot-tagline {
  font-size: 13px; color: rgba(250,246,240,0.4); line-height: 1.6; max-width: 220px;
}
.mk-foot-col h4 {
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; color: rgba(250,246,240,0.3);
  margin-bottom: 16px;
}
.mk-foot-col a {
  display: block; font-size: 13.5px; color: rgba(250,246,240,0.55);
  text-decoration: none; margin-bottom: 10px; transition: color 0.2s;
}
.mk-foot-col a:hover { color: var(--t); }
.mk-foot-social { display: flex; gap: 10px; margin-top: 20px; }
.mk-foot-sico {
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s, transform 0.2s; text-decoration: none;
}
.mk-foot-sico:hover { background: rgba(200,96,58,0.2); border-color: rgba(200,96,58,0.4); transform: translateY(-2px); }
.mk-foot-sico svg { width: 16px; height: 16px; fill: rgba(250,246,240,0.6); }
.mk-foot-sico:hover svg { fill: var(--t); }
.mk-foot-bottom {
  max-width: 1100px; margin: 28px auto 0;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  font-size: 12px; color: rgba(250,246,240,0.28);
}
.mk-foot-bottom a { color: rgba(250,246,240,0.28); text-decoration: none; }
.mk-foot-bottom a:hover { color: var(--t); }
.mk-foot-flag { display: flex; align-items: center; gap: 5px; }
@media (max-width: 640px) {
  .mk-foot-top { grid-template-columns: 1fr; gap: 32px; }
}

/* Mobile footer — compact pill-style redesign, swapped in below 640px */
.mk-foot-mobile { display: none; }

@media (max-width: 640px) {
  .mk-foot-desktop { display: none; }

  .mk-foot-mobile {
    display: flex; flex-direction: column;
    padding: 32px 20px 40px;
    font-family: 'Inter', sans-serif;
  }

  .mk-mfoot-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
  .mk-mfoot-logo {
    font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 20px;
    color: var(--t); text-decoration: none;
  }
  .mk-mfoot-logo em { color: #fff; font-style: normal; }
  .mk-mfoot-tagline { font-size: 12px; color: rgba(250,246,240,0.35); margin-bottom: 24px; }

  .mk-mfoot-cta {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--t); color: #fff;
    border-radius: 14px; padding: 14px;
    font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 15px;
    text-decoration: none; margin-bottom: 20px;
    transition: background 0.2s;
  }
  .mk-mfoot-cta:hover { background: var(--td); }

  .mk-mfoot-links { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
  .mk-mfoot-link {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 7px 13px; border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.1);
    font-size: 12px; color: rgba(250,246,240,0.5);
    text-decoration: none; transition: color 0.2s, border-color 0.2s;
  }
  .mk-mfoot-link:hover { color: var(--t); border-color: rgba(200,96,58,0.4); }

  .mk-mfoot-social { display: flex; gap: 10px; margin-bottom: 24px; }
  .mk-mfoot-sico {
    width: 38px; height: 38px; border-radius: 10px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09);
    display: flex; align-items: center; justify-content: center;
    text-decoration: none; transition: background 0.2s, border-color 0.2s;
  }
  .mk-mfoot-sico:hover { background: rgba(200,96,58,0.2); border-color: rgba(200,96,58,0.4); }
  .mk-mfoot-sico svg { width: 15px; height: 15px; fill: rgba(250,246,240,0.55); }
  .mk-mfoot-sico:hover svg { fill: var(--t); }

  .mk-mfoot-divider { height: 1px; background: rgba(255,255,255,0.07); margin-bottom: 16px; }

  .mk-mfoot-bottom {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 11px; color: rgba(250,246,240,0.24);
  }
}

/* ── REAL PHONE SCREENSHOTS ── */
.mk-phone-img { width: 100%; height: 100%; display: block; object-fit: cover; border-radius: 23px; }

/* ── APP SHOWCASE ── */
.mk-showcase { background: #1A0E08; padding: 80px 0 60px; overflow: hidden; }
.mk-showcase-head { text-align: center; padding: 0 24px 48px; }
.mk-showcase-strip {
  display: flex; gap: 20px;
  padding: 16px 48px 32px;
  overflow-x: auto; scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  justify-content: safe center;
}
.mk-showcase-strip::-webkit-scrollbar { display: none; }
.mk-showcase-item {
  scroll-snap-align: center; scroll-snap-stop: always; flex-shrink: 0; text-align: center;
  display: flex; flex-direction: column; align-items: center;
}
.mk-showcase-item:nth-child(odd)  { transform: translateY(-12px); }
.mk-showcase-item:nth-child(even) { transform: translateY(12px); }
.mk-showcase-phone {
  width: 195px; border-radius: 38px;
  background: #0D0704; padding: 10px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06);
  margin-bottom: 18px; position: relative;
}
.mk-showcase-notch {
  position: absolute; top: 17px; left: 50%; transform: translateX(-50%);
  width: 52px; height: 8px; background: #0D0704; border-radius: 8px; z-index: 3;
}
.mk-showcase-img { width: 100%; border-radius: 29px; display: block; }
.mk-showcase-label {
  font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
  color: rgba(250,246,240,0.4); letter-spacing: 0.02em;
}
.mk-showcase-pill {
  display: inline-block; background: rgba(200,96,58,0.18);
  color: var(--t); border-radius: 100px; padding: 3px 10px;
  font-size: 11px; font-weight: 600; margin-bottom: 8px;
}
.mk-showcase-hint {
  text-align: center; font-size: 12px;
  color: rgba(250,246,240,0.22); padding-top: 8px; letter-spacing: 0.04em;
}
@media (max-width: 640px) {
  .mk-showcase-phone { width: 160px; }
  .mk-showcase-strip { padding: 16px 24px 32px; gap: 14px; }
}

/* ── CURVE DIVIDERS ── */
.mk-curve { display: block; width: 100%; height: 48px; line-height: 0; overflow: hidden; }
.mk-curve svg { width: 100%; height: 100%; display: block; }
@media (min-width: 641px) { .mk-curve { height: 72px; } }
@media (min-width: 1024px) { .mk-curve { height: 96px; } }

/* ═══════════════════════════════════════════════
   FEATURE HUB — FIXED VERSION
   ═══════════════════════════════════════════════ */
.mk-feats { padding: 96px 24px; background: var(--c); }

.mk-feat-hub {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 48px;
  align-items: stretch;
}

.mk-hub-col { display: flex; flex-direction: column; gap: 16px; }

/* ── Hub card ── */
.mk-hub-card {
  background: var(--w); border: 1.5px solid rgba(200,96,58,0.08);
  border-radius: var(--r20); padding: 22px 20px;
  transition: all 0.25s ease;
  position: relative; text-align: left;
  font: inherit; cursor: pointer; width: 100%; display: block;
  outline: none;
}
.mk-hub-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px rgba(200,96,58,0.1);
  border-color: rgba(200,96,58,0.2);
}
.mk-hub-card.active {
  border-color: var(--t);
  background: var(--tl);
  box-shadow: 0 10px 30px rgba(200,96,58,0.16);
}
.mk-hub-card.active .mk-hub-t { color: var(--td); }

.mk-hub-ico {
  width: 44px; height: 44px; border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px;
  transition: transform 0.25s ease;
}
.mk-hub-card.active .mk-hub-ico { transform: scale(1.08); }
.mk-hub-t {
  font-family: 'Outfit', sans-serif; font-size: 15.5px;
  font-weight: 700; color: var(--b); margin-bottom: 6px;
  transition: color 0.2s;
}
.mk-hub-d { font-size: 12.5px; color: var(--mu); line-height: 1.55; }

/* ── Hub phone (center column) ── */
.mk-hub-phone-wrap {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}

/* The phone frame itself — no notch element needed; Dynamic Island is
   painted ON the screenshot image, so we just show the image cleanly */
.mk-hub-phone {
  border-radius: 40px;
  background: #1A0E08;
  padding: 10px;
  box-shadow:
    0 32px 80px rgba(26,14,8,0.36),
    0 0 0 1px rgba(255,255,255,0.07),
    inset 0 1px 0 rgba(255,255,255,0.06);
  position: relative;
  overflow: hidden; /* clips the screen image to rounded corners */
}

.mk-hub-pscreen {
  width: 100%;
  border-radius: 31px;
  overflow: hidden;
  background: #1A0E08;
  position: relative;
  aspect-ratio: 9 / 19.5;
  /* Screen transition */
}

/* Image crossfade */
@keyframes mkHubFade {
  from { opacity: 0; transform: scale(1.015); }
  to   { opacity: 1; transform: scale(1); }
}
.mk-hub-img-fade { animation: mkHubFade 0.32s cubic-bezier(.16,1,.3,1); }

.mk-hub-screen-img {
  width: 100%; height: 100%;
  display: block; object-fit: cover;
  border-radius: 31px;
}

.mk-hub-active-label {
  margin-top: 14px; text-align: center;
  font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase; color: var(--t);
  opacity: 0.7;
}

/* ─────────────── DESKTOP (≥ 901px) ─────────────── */
@media (min-width: 901px) {
  .mk-feat-hub {
    grid-template-columns: 1fr 260px 1fr;
    grid-template-areas: "left phone right";
    gap: 32px;
    align-items: start;
  }
  .mk-hub-col.left  { grid-area: left; }
  .mk-hub-col.right { grid-area: right; }
  .mk-hub-phone-wrap {
    grid-area: phone;
    /* Stick in view while cards scroll past on desktop */
    position: sticky;
    top: 80px;
  }
  .mk-hub-phone { width: 240px; }

  /* Connector lines from cards to centre phone */
  .mk-hub-col.left .mk-hub-card { position: relative; }
  .mk-hub-col.left .mk-hub-card::after {
    content: '';
    position: absolute; top: 50%; right: -32px;
    width: 32px; height: 1px;
    background: linear-gradient(to left, transparent, rgba(200,96,58,0.25));
    pointer-events: none;
  }
  .mk-hub-col.right .mk-hub-card { position: relative; }
  .mk-hub-col.right .mk-hub-card::after {
    content: '';
    position: absolute; top: 50%; left: -32px;
    width: 32px; height: 1px;
    background: linear-gradient(to right, transparent, rgba(200,96,58,0.25));
    pointer-events: none;
  }
  .mk-hub-col.left .mk-hub-card.active::after,
  .mk-hub-col.right .mk-hub-card.active::after {
    background: linear-gradient(
      to left,
      transparent,
      rgba(200,96,58,0.55)
    );
  }
  .mk-hub-col.right .mk-hub-card.active::after {
    background: linear-gradient(to right, transparent, rgba(200,96,58,0.55));
  }
}

/* ─────────────── MOBILE / TABLET (≤ 900px) ─────────────── */
@media (max-width: 900px) {
  .mk-feat-hub {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Sticky phone wrapper — sits below nav (60px), opaque bg covers
     any card content that scrolls beneath it */
  .mk-hub-phone-wrap {
    position: sticky;
    top: 60px;
    z-index: 5;
    padding: 16px 0 20px;
    /* Solid background — matches page bg so cards are fully hidden */
    background: var(--c);
    /* Soft fade at the bottom edge for a clean handoff */
    -webkit-mask-image: linear-gradient(
      to bottom,
      black 0%, black 88%, transparent 100%
    );
    mask-image: linear-gradient(
      to bottom,
      black 0%, black 88%, transparent 100%
    );
    /* Ensure it paints above the cards */
    isolation: isolate;
  }

  .mk-hub-phone { width: 180px; }

  /* Cards column — normal flow, scroll past the sticky phone */
  .mk-hub-col { gap: 12px; padding: 0; }

  /* Stack left then right columns vertically */
  .mk-hub-col.left  { order: 2; }
  .mk-hub-col.right { order: 3; }
}

@media (max-width: 640px) {
  .mk-hub-phone-wrap { top: 56px; padding: 12px 0 16px; }
  .mk-hub-phone { width: 148px; }
}

/* Card spacer — pushes the first card below the sticky phone so it
   doesn't hide under it on page load */
.mk-hub-card-spacer {
  display: none;
}
@media (max-width: 900px) {
  .mk-hub-card-spacer { display: block; height: 12px; }
}

/* ── FLOATING DOODLES ── */
@keyframes mkFloat {
  0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
  50%      { transform: translateY(-14px) rotate(calc(var(--rot, 0deg) + 5deg)); }
}
.mk-doodle {
  position: absolute; pointer-events: none;
  animation: mkFloat 7s ease-in-out infinite;
}
.mk-doodle.on-light { color: var(--t); opacity: 0.16; }
.mk-doodle.on-dark  { color: var(--tl); opacity: 0.14; }

/* ── SCROLL REVEAL ── */
.rev { opacity: 1; transform: none; }
.js-rev-ready .rev {
  opacity: 0; transform: translateY(22px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.js-rev-ready .rev.in { opacity: 1; transform: none; }

/* Stagger delays */
.js-rev-ready .mk-proof .rev:nth-child(1) { transition-delay: .02s; }
.js-rev-ready .mk-proof .rev:nth-child(2) { transition-delay: .08s; }
.js-rev-ready .mk-proof .rev:nth-child(3) { transition-delay: .14s; }
.js-rev-ready .mk-proof .rev:nth-child(4) { transition-delay: .20s; }
.js-rev-ready .mk-proof .rev:nth-child(5) { transition-delay: .26s; }
.js-rev-ready .mk-prob-grid .rev:nth-child(1) { transition-delay: .04s; }
.js-rev-ready .mk-prob-grid .rev:nth-child(2) { transition-delay: .10s; }
.js-rev-ready .mk-prob-grid .rev:nth-child(3) { transition-delay: .16s; }
.js-rev-ready .mk-prob-grid .rev:nth-child(4) { transition-delay: .22s; }
.js-rev-ready .mk-steps .rev:nth-child(1) { transition-delay: .04s; }
.js-rev-ready .mk-steps .rev:nth-child(2) { transition-delay: .12s; }
.js-rev-ready .mk-steps .rev:nth-child(3) { transition-delay: .20s; }
.js-rev-ready .mk-hub-col .rev:nth-child(1) { transition-delay: .04s; }
.js-rev-ready .mk-hub-col .rev:nth-child(2) { transition-delay: .10s; }
.js-rev-ready .mk-hub-col .rev:nth-child(3) { transition-delay: .16s; }

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  .mk-hero  { padding: 100px 18px 80px; }
  .mk-phones { max-width: 310px; height: 370px; }
  .mk-phone  { width: 152px; }
  .mk-ph1    { left: 12px; top: 32px; }
  .mk-ph2    { right: 12px; top: 4px; }
  .mk-ph1 .mk-pscreen, .mk-ph2 .mk-pscreen { height: 294px; }
  .mk-nav { padding: 12px 18px; }
  .mk-nav.scrolled { padding: 9px 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .js-rev-ready .rev, .js-rev-ready .rev.in { opacity: 1; transform: none; transition: none; }
  .mk-doodle, .hero-in, .mk-fcta-qrbox { animation: none; }
  .mk-hub-img-fade { animation: none; }
  .mk-fcta-phone-frame { opacity: 1; transform: none; transition: none; }
  .mk-ph1 { opacity: 1; transform: rotate(-6deg); transition: none; }
  .mk-ph2 { opacity: 1; transform: rotate(4.5deg); transition: none; }
}
`;

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
    screen: '/screenshots/screen-scan.png',
    screenLabel: 'Scan',
  },
  {
    ico: <BookOpen size={22} />,
    bg: '#F5EDD4', color: 'var(--g)',
    title: 'Diary & List OCR',
    desc: 'Haath se likhi list ya printed register scan karo. Hindi aur English dono — room bhi auto-assign.',
    screen: '/screenshots/screen-scan.png',
    screenLabel: 'Scan',
  },
  {
    ico: <Building2 size={22} />,
    bg: '#E8F4EC', color: 'var(--s)',
    title: 'Multi-Ghar Support',
    desc: '3, 4, 5 ghars — sab ek app mein. "Ab yahan hain" se active ghar set karo ek tap mein.',
    screen: '/screenshots/screen-ghar.png',
    screenLabel: 'Ghar',
  },
  {
    ico: <Search size={22} />,
    bg: '#F5EDD4', color: 'var(--g)',
    title: 'Smart Dhoondo',
    desc: '"Shaadi ka saman" ya "warm clothes" — natural language mein search, AI sab gharon mein dhoondega.',
    screen: '/screenshots/screen-search.png',
    screenLabel: 'Dhoondo',
  },
  {
    ico: <Share2 size={22} />,
    bg: 'var(--tl)', color: 'var(--t)',
    title: 'WhatsApp Share',
    desc: 'Kisi ko bhi cheez ki location WhatsApp pe bhejo — ek tap mein, koi API cost nahi.',
    screen: '/screenshots/screen-whatsapp.png',
    screenLabel: 'Home > Item Detail',
  },
  {
    ico: <Globe size={22} />,
    bg: '#E8F4EC', color: 'var(--s)',
    title: 'Hinglish · Hindi · English',
    desc: 'App ki bhasha aap choose karo. Strict TypeScript i18n — har label, har message translated.',
    screen: '/screenshots/screen-profile.png',
    screenLabel: 'Profile',
  },
];

const SCREENS = [
  { src: '/screenshots/screen-home.png',     label: 'Home',          pill: 'Apni cheezein'   },
  { src: '/screenshots/screen-search.png',   label: 'Dhoondo',       pill: 'Search karo'     },
  { src: '/screenshots/screen-scan.png',     label: 'Scan',          pill: 'AI photo scan'   },
  { src: '/screenshots/screen-ghar.png',     label: 'Ghar',          pill: 'Mere sab ghar'   },
  { src: '/screenshots/screen-profile.png',  label: 'Profile',       pill: 'Aapka account'   },
  { src: '/screenshots/screen-whatsapp.png', label: 'Whatsapp Share',pill: 'WhatsApp Share'  },
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
  const stripRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      if (pausedRef.current) return;
      indexRef.current = (indexRef.current + 1) % SCREENS.length;
      itemRefs.current[indexRef.current]?.scrollIntoView({
        behavior: 'smooth', inline: 'center', block: 'nearest',
      });
    }, 2200);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)');
    if (!mql.matches) return; // desktop: native swipe only, nothing else runs

    const strip = stripRef.current;
    if (!strip) return;

    let obs: IntersectionObserver | null = null;
    try {
      obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) startAutoplay();
        else stopAutoplay();
      }, { threshold: 0.4 });
      obs.observe(strip);
    } catch {
      startAutoplay();
    }

    // Pause while the user is actively swiping, resume shortly after they let go
    const pause = () => {
      pausedRef.current = true;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
    const resume = () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => { pausedRef.current = false; }, 2600);
    };
    strip.addEventListener('touchstart', pause, { passive: true });
    strip.addEventListener('touchend', resume, { passive: true });

    return () => {
      obs?.disconnect();
      stopAutoplay();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      strip.removeEventListener('touchstart', pause);
      strip.removeEventListener('touchend', resume);
    };
  }, [startAutoplay, stopAutoplay]);

  return (
    <section className="mk-showcase">
      <div className="mk-showcase-head">
        <div className="mk-sec-label lt rev">Asli app, asli screenshots</div>
        <h2 className="mk-sec-h2 lt rev" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>
          Dekho app kaisi dikhti hai
        </h2>
      </div>
      <div className="mk-showcase-strip" ref={stripRef}>
        {SCREENS.map((s, i) => (
          <div
            key={s.label}
            className="mk-showcase-item"
            ref={(el) => { itemRefs.current[i] = el; }}
          >
            <div className="mk-showcase-phone">
              <div className="mk-showcase-notch" />
              <img src={s.src} alt={`MilaKya ${s.label} screen`}
                className="mk-showcase-img" loading="lazy" decoding="async" />
            </div>
            <div className="mk-showcase-pill">{s.pill}</div>
            <div className="mk-showcase-label">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="mk-showcase-hint">← Swipe to explore all screens →</p>
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
            src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&bgcolor=ffffff&color=1a0e08&data=${encodeURIComponent(APP_URL)}`}
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
      const maxScroll = window.innerHeight * 0.7;
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
            src="/screenshots/screen-home.png"
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
            src="/screenshots/screen-scan.png"
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
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

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
      <section className="mk-feats" id="features">
        <div className="mk-wrap">
          <div className="mk-sec-label dk rev">Kya kya hai andar</div>
          <h2 className="mk-sec-h2 dk rev">India ke liye<br />banaya gaya hai</h2>
          <FeatureHub />
        </div>
      </section>

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