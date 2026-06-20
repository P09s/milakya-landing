import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

// ── Update these two constants when your domain changes ──────────────────────
const LANDING_URL = 'https://milakya.vercel.app';  // this project's URL
const APP_URL     = 'https://mila-kya.vercel.app'; // your actual PWA / TWA app

// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(LANDING_URL),

  title: {
    default: 'MilaKya — Apna Saman, Apni Jagah | Item Location Tracker for India',
    template: '%s | MilaKya',
  },

  description:
    'MilaKya tracks your belongings across multiple homes — ghar, PG, sasural, maika. AI photo scan, Hindi + Hinglish + English support, 100% free. Built for India\'s multi-home generation.',

  keywords: [
    'item location tracker india',
    'saman dhundna app',
    'ghar ka saman track karna',
    'multi home item tracker',
    'hindi item tracker app',
    'milakya',
    'mila kya',
    'apna saman apni jagah',
    'saman tracker app free',
    'household item tracker india',
    'PG maika sasural saman',
    'AI saman scan app',
  ],

  authors: [{ name: 'MilaKya', url: LANDING_URL }],
  creator: 'MilaKya',
  publisher: 'MilaKya',

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    alternateLocale: ['hi_IN'],
    url: LANDING_URL,
    siteName: 'MilaKya',
    title: 'MilaKya — Apna Saman, Apni Jagah',
    description:
      'Track your belongings across ghar, PG, sasural, maika. AI scan, Hinglish, free. Built for India\'s multi-home generation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MilaKya — Apna Saman, Apni Jagah',
        type: 'image/png',
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'MilaKya — Apna Saman, Apni Jagah',
    description:
      'Track your belongings across ghar, PG, sasural, maika. AI scan, Hinglish, free.',
    images: ['/og-image.png'],
    creator: '@milakya',
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: LANDING_URL,
    languages: {
      'en-IN': LANDING_URL,
      'hi-IN': LANDING_URL,
    },
  },

  // ── App links (for social platforms that support them) ───────────────────
  appLinks: {
    web: { url: APP_URL, should_fallback: true },
  },

  // ── Verification placeholders (fill after you verify in Search Console) ──
  verification: {
    // google: 'YOUR_GOOGLE_SITE_VERIFICATION_TOKEN',
  },

  // ── Misc ──────────────────────────────────────────────────────────────────
  category: 'productivity',
};

// ── JSON-LD structured data ──────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${LANDING_URL}/#website`,
      url: LANDING_URL,
      name: 'MilaKya',
      description:
        'Track your belongings across multiple homes — ghar, PG, sasural, maika.',
      inLanguage: ['en-IN', 'hi-IN'],
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${APP_URL}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'MobileApplication',
      '@id': `${LANDING_URL}/#app`,
      name: 'MilaKya',
      description:
        'Item location tracker for India\'s multi-home generation. Track your saman across ghar, PG, sasural, maika with AI photo scan and Hinglish support.',
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'Home & Lifestyle',
      operatingSystem: 'Android, iOS',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
      author: {
        '@type': 'Organization',
        name: 'MilaKya',
        url: LANDING_URL,
      },
      url: APP_URL,
      inLanguage: ['en', 'hi', 'hi-Latn'],
      featureList: [
        'AI Photo Scan — detect multiple items at once',
        'Diary & handwritten list OCR — Hindi + English',
        'Multi-home support — ghar, PG, sasural, maika, office',
        'Natural language search in Hinglish',
        'WhatsApp location sharing',
        'Works offline',
        '100% Free',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        ratingCount: '1',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${LANDING_URL}/#organization`,
      name: 'MilaKya',
      url: LANDING_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${LANDING_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'sharmaparag2004@gmail.com',
        availableLanguage: ['Hindi', 'English'],
      },
    },
  ],
};

// ── Root layout ───────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Preconnect to Google Fonts CDN for faster font load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon chain */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* Theme color for browser chrome */}
        <meta name="theme-color" content="#C8603A" />

        {/* JSON-LD structured data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
