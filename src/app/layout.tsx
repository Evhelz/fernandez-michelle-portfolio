import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { ChatWidget } from '@/components/organisms/ChatWidget';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Michelle Fernandez | Technical Internship Portfolio',
  description: 'A data-driven portfolio and activity log showcasing technical proficiency and professional growth.',
    icons: {
    icon: '/images/mich.png',   // path from the public folder
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen selection:bg-primary/20">

        {/* ─────────────────────────────────────────────
            AMBIENT BACKGROUND LAYER
            Fixed behind all content — pointer-events-none
            so nothing underneath is blocked.
        ───────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            <defs>

              {/* ── Fine dot grid ── */}
              <pattern
                id="dot-grid"
                x="0"
                y="0"
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="hsl(var(--primary) / 0.13)" />
              </pattern>

              {/* ── Larger spaced cross-hair grid ── */}
              <pattern
                id="line-grid"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                {/* horizontal */}
                <line
                  x1="0" y1="0" x2="80" y2="0"
                  stroke="hsl(var(--primary) / 0.055)"
                  strokeWidth="0.5"
                />
                {/* vertical */}
                <line
                  x1="0" y1="0" x2="0" y2="80"
                  stroke="hsl(var(--primary) / 0.055)"
                  strokeWidth="0.5"
                />
              </pattern>

              {/* ── Radial gradient masks for corner orbs ── */}
              <radialGradient id="orb-tl" cx="0%" cy="0%" r="60%">
                <stop offset="0%"   stopColor="hsl(var(--primary))" stopOpacity="0.12" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0"   />
              </radialGradient>

              <radialGradient id="orb-br" cx="100%" cy="100%" r="60%">
                <stop offset="0%"   stopColor="hsl(var(--primary))" stopOpacity="0.09" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0"   />
              </radialGradient>

              <radialGradient id="orb-mid" cx="55%" cy="38%" r="40%">
                <stop offset="0%"   stopColor="hsl(var(--primary))" stopOpacity="0.06" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0"   />
              </radialGradient>

              {/* ── Clip to viewport ── */}
              <clipPath id="vp">
                <rect width="100%" height="100%" />
              </clipPath>

            </defs>

            {/* Layer 1: soft radial orbs */}
            <rect width="100%" height="100%" fill="url(#orb-tl)"  clipPath="url(#vp)" />
            <rect width="100%" height="100%" fill="url(#orb-br)"  clipPath="url(#vp)" />
            <rect width="100%" height="100%" fill="url(#orb-mid)" clipPath="url(#vp)" />

            {/* Layer 2: large line grid */}
            <rect width="100%" height="100%" fill="url(#line-grid)" />

            {/* Layer 3: fine dot grid on top */}
            <rect width="100%" height="100%" fill="url(#dot-grid)" />

            {/* ── Decorative arcs / rings ──
                Two large partial circles in opposite corners for depth */}
            <g opacity="0.07">
              {/* top-left quarter-arc */}
              <circle
                cx="-60"
                cy="-60"
                r="380"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
              />
              <circle
                cx="-60"
                cy="-60"
                r="560"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
              />
              {/* bottom-right quarter-arc */}
              <circle
                cx="calc(100% + 60px)"
                cy="calc(100% + 60px)"
                r="420"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
              />
              <circle
                cx="calc(100% + 60px)"
                cy="calc(100% + 60px)"
                r="620"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
              />
            </g>

            {/* ── Diagonal accent lines (top-right corner) ── */}
            <g
              opacity="0.04"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
            >
              <line x1="60%" y1="0"   x2="100%" y2="18%" />
              <line x1="68%" y1="0"   x2="100%" y2="14%" />
              <line x1="76%" y1="0"   x2="100%" y2="10%" />
              <line x1="84%" y1="0"   x2="100%" y2="6%"  />
              <line x1="92%" y1="0"   x2="100%" y2="2%"  />
            </g>

            {/* ── Diagonal accent lines (bottom-left corner) ── */}
            <g
              opacity="0.04"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
            >
              <line x1="0" y1="82%"  x2="18%"  y2="100%" />
              <line x1="0" y1="86%"  x2="14%"  y2="100%" />
              <line x1="0" y1="90%"  x2="10%"  y2="100%" />
              <line x1="0" y1="94%"  x2="6%"   y2="100%" />
              <line x1="0" y1="98%"  x2="2%"   y2="100%" />
            </g>

          </svg>
        </div>
        {/* ── END BACKGROUND ── */}

        {/* All page content sits above the background */}
        <div style={{ position: "relative", zIndex: 1, display: "contents" }}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ChatWidget />
          <Toaster />
        </div>

      </body>
    </html>
  );
}