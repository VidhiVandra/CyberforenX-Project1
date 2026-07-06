"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  ArrowRight,
  MessageSquare,
  FileText,
  Layers,
  Award,
  Sparkles,
  Building2,
  Quote,
  Users,
  CheckCircle,
  TrendingUp,
  Heart,
  Eye,
  ChevronRight,
  Globe
} from 'lucide-react';

import Navbar from '@/components/mostused/Navbar';
import Footer from '@/components/mostused/Footer';

// ---------- Config & Constants ----------
const TOTAL_IMAGES = 9;
const IMAGES: string[] = Array.from({ length: TOTAL_IMAGES }, (_, i) => `/Carpet_0${i + 1}.jpg`);

// ---------- Math Utilities ----------
const lerp = (a: number, b: number, t: number): number => a * (1 - t) + b * t;
const clamp = (v: number, lo: number, hi: number): number => Math.min(Math.max(v, lo), hi);

interface Spring {
  update: (target: number, dt: number) => number;
  readonly value: number;
}

function makeSpring(initial: number, stiffness: number, damping: number, mass = 1): Spring {
  let value = initial;
  let velocity = 0;
  return {
    update(target: number, dt: number) {
      const force = -stiffness * (value - target);
      const damp = -damping * velocity;
      const accel = (force + damp) / mass;
      velocity += accel * dt;
      value += velocity * dt;
      return value;
    },
    get value() { return value; }
  };
}

interface CardTarget {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
}

const scatterPositions: CardTarget[] = IMAGES.map(() => ({
  x: (Math.random() - 0.5) * 1500,
  y: (Math.random() - 0.5) * 1000,
  rotation: (Math.random() - 0.5) * 180,
  scale: 0.6,
  opacity: 0
}));

// --- STANDARD PAGE VARIANTS --- //
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

// ---------- Signature motifs: fringe + thread ----------
// A row of hand-knotted tassels closes out every image card — the one
// literal, load-bearing motif of the redesign, borrowed from the product itself.
const Fringe: React.FC<{ count?: number }> = ({ count = 28 }) => (
  <svg
    className="fringe-svg"
    viewBox={`0 0 ${count * 8} 18`}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    {Array.from({ length: count }).map((_, i) => (
      <line
        key={i}
        x1={i * 8 + 4}
        y1={0}
        x2={i * 8 + 4 + (i % 2 === 0 ? -1.5 : 1.5)}
        y2={18}
        stroke="var(--accent-line)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

// A single weft thread run between sections instead of a hairline rule.
const ThreadDivider: React.FC = () => (
  <div className="thread-divider" aria-hidden="true">
    <svg viewBox="0 0 1200 20" preserveAspectRatio="none">
      <path
        d="M0,10 Q25,1 50,10 T100,10 T150,10 T200,10 T250,10 T300,10 T350,10 T400,10 T450,10 T500,10 T550,10 T600,10 T650,10 T700,10 T750,10 T800,10 T850,10 T900,10 T950,10 T1000,10 T1050,10 T1100,10 T1150,10 T1200,10"
        fill="none"
        stroke="var(--accent-line)"
        strokeWidth="1"
        strokeDasharray="0.5 7"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

import { useTheme } from '@/components/ThemeProvider';

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const AUTOPLAY_MS = 4000;

  const SLIDESHOW_IMAGES = [
    '/Carpet_01.jpg',
    '/Carpet_02.jpg',
    '/Carpet_03.jpg',
    '/Carpet_04.jpg',
    '/Carpet_05.jpg',
  ];

  const valuesData = [
    { icon: <Users className="w-5 h-5" />, title: 'Collaboration', desc: 'We blend creativity and craftsmanship, working side by side to combine talent with the latest trends — all to transform your vision into a beautifully crafted reality.' },
    { icon: <CheckCircle className="w-5 h-5" />, title: 'High Standards', desc: 'We hold ourselves to the highest standards, delivering quality at every stage. Our trusted certifications reflect our commitment to excellence and accountability.' },
    { icon: <TrendingUp className="w-5 h-5" />, title: 'Consistency', desc: 'By embracing the latest technology, we maintain a steady rhythm of innovation and improvement — ensuring consistent quality in everything we do.' },
    { icon: <Heart className="w-5 h-5" />, title: 'Commitment', desc: 'Our dedicated craftsmen and team bring exceptional skill and passion to every detail, going above and beyond to exceed your expectations.' },
    { icon: <Eye className="w-5 h-5" />, title: 'Integrity', desc: 'With every weave, we reflect our commitment to honesty and excellence. Our transparent approach ensures your goals remain at the heart of what we create.' },
    { icon: <Sparkles className="w-5 h-5" />, title: 'Client Satisfaction', desc: 'We go beyond expectations, blending time-honored weaving traditions with modern excellence to ensure every client is truly satisfied.' }
  ];

  // Slideshow background cycle
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 5000);
    return () => clearInterval(bgTimer);
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    const nodes = document.querySelectorAll('.reveal-node');
    nodes.forEach((node) => observer.observe(node));
    return () => nodes.forEach((node) => observer.unobserve(node));
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const mobileObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active-mobile-scroll');
          } else {
            entry.target.classList.remove('active-mobile-scroll');
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    document.querySelectorAll('.mobile-scroll-target').forEach((el) => mobileObserver.observe(el));
    return () => mobileObserver.disconnect();
  }, []);

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setActiveValueIndex((prevIndex) => (prevIndex + 1) % valuesData.length);
    }, AUTOPLAY_MS);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [valuesData.length]);

  const handleItemHover = (index: number) => {
    setActiveValueIndex(index);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setActiveValueIndex((prevIndex) => (prevIndex + 1) % valuesData.length);
      }, AUTOPLAY_MS);
    }
  };

  const scrollToSection = (id: string): void => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };



  // Track scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[var(--bg-page)] text-[var(--text-pure)] font-sans antialiased overflow-x-hidden min-h-screen flex flex-col" style={{ transition: 'background-color 0.4s ease, color 0.4s ease' }}>

      <Navbar
        isScrolled={isScrolled}
        theme={theme}
        setTheme={setTheme}
        scrollToSection={scrollToSection}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');

        /* ---------- Font assignments ---------- */
        body {
          --font-display: 'Fraunces', ui-serif, Georgia, serif;
          --font-sans: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
          --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
        }

        .scroll-track-container {
          position: relative;
          width: 100%;
          height: 140vh;
          margin-bottom: 0px;
          background: var(--bg-page);
          transition: background-color 0.5s ease;
        }
        .hero-sticky-frame {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        #hero-root {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000000;
        }
        .hero-bg-texture-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .hero-bg-texture-layer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.38;
          filter: contrast(110%) brightness(70%);
        }
        .hero-stage {
          display: flex;
          height: 100%;
          width: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          position: relative;
          z-index: 10;
        }
        .arc-content {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          pointer-events: auto;
          padding: 0 1rem;
          opacity: 1;
        }
        .arc-content h2 {
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 800;
          color: #FCFAF9;
          font-family: var(--font-display);
          letter-spacing: 0.1em;
          margin: 0;
          text-shadow: 0 4px 24px rgba(0,0,0,0.65);
          line-height: 1.1;
        }
        .arc-content p {
          font-size: clamp(1rem, 2.2vw, 1.45rem);
          color: var(--accent-line, #C9A227);
          font-weight: 600;
          letter-spacing: 0.05em;
          max-width: 44rem;
          line-height: 1.5;
          margin: 0.75rem 0 0.25rem 0;
        }
        .cards-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .card-outer {
          position: absolute;
          width: 110px;
          height: 155px;
          transform-style: preserve-3d;
          perspective: 1000px;
          cursor: pointer;
          will-change: transform;
          transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s ease;
        }
        .card-inner {
          position: relative;
          height: 100%;
          width: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .card-outer:hover .card-inner {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
          border-radius: 0.65rem;
          box-shadow: 0 20px 35px -8px rgba(0,0,0,0.6);
          backface-visibility: hidden;
        }
        .card-front {
          background: #262626;
        }
        .card-front img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          display: block;
        }
        .card-front .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.1);
          transition: background 0.2s ease;
        }
        .card-outer:hover .card-front .overlay {
          background: transparent;
        }
        .card-back {
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          border: 1px solid var(--border-active);
          transform: rotateY(180deg);
        }
        .card-back .label {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-solid);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 0 0 0.25rem 0;
          text-align: center;
        }
        .card-back .value {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-pure);
          text-align: center;
          margin: 0;
        }

        /* ---------- Section rhythm ---------- */
        .ux-section {
          padding: 150px 40px;
          position: relative;
          z-index: 10;
        }
        .ux-section-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4.6vw, 3.75rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.12;
          margin-bottom: 1rem;
          color: var(--text-pure);
        }
        .ux-section-subtitle {
          font-size: 1.05rem;
          color: var(--text-body);
          max-width: 640px;
          line-height: 1.7;
          margin-bottom: 4rem;
        }
        :root, :root[data-theme="light"] {
          --band-overlay: rgba(248, 245, 240, 0.76);
        }
        :root[data-theme="dark"] {
          --band-overlay: rgba(14, 16, 23, 0.76);
        }
        .section-band-3 {
          position: relative;
          background-image: linear-gradient(var(--band-overlay), var(--band-overlay)), url('/Background-image.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-repeat: no-repeat;
        }
        .section-band-5 {
          position: relative;
          background-image: linear-gradient(var(--band-overlay), var(--band-overlay)), url('/Carpet_03.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-repeat: no-repeat;
        }
        .section-band-7 {
          position: relative;
          background-image: linear-gradient(var(--band-overlay), var(--band-overlay)), url('/Carpet_09.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-repeat: no-repeat;
        }
        @media (max-width: 768px) {
          .ux-section { padding: 88px 22px; }
        }

        /* Eyebrow label — used sparingly, and only where sequence/labeling is real */
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-line);
          margin-bottom: 1.25rem;
        }
        .eyebrow::before {
          content: '';
          width: 18px;
          height: 1px;
          background: var(--accent-line);
        }

        /* Reveal-on-scroll utility (mirrors framer whileInView for non-motion nodes) */
        .reveal-node { opacity: 1; }

        /* ---------- Thread divider (signature motif) ---------- */
        .thread-divider {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          opacity: 0.55;
        }
        .thread-divider svg { width: 100%; height: 16px; display: block; }
        @media (max-width: 768px) { .thread-divider { padding: 0 22px; } }

        /* ---------- Fringe motif on image cards ---------- */
        .fringed-frame {
          position: relative;
          overflow: visible !important;
        }
        .fringe-svg {
          position: absolute;
          left: 0;
          bottom: -13px;
          width: 100%;
          height: 15px;
          opacity: 0.9;
          filter: drop-shadow(0 3px 2px rgba(0,0,0,0.35));
          pointer-events: none;
        }

        /* ---------- Card system ---------- */
        .aw-card {
          background: var(--bg-cards);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
        }
        .aw-card-padded { padding: 2.75rem 2.25rem; }
        .aw-card:hover {
          border-color: var(--border-active);
          transform: translateY(-4px);
          box-shadow: 0 24px 48px -20px rgba(0,0,0,0.55);
        }

        .aw-image-frame {
          position: relative;
          width: 100%;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: var(--bg-secondary);
        }
        .aw-image-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s ease;
          filter: saturate(0.92) contrast(1.02);
        }
        .aw-card:hover .aw-image-frame img {
          transform: scale(1.06);
        }
        .aw-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #FCFAF9;
          background: rgba(10, 8, 6, 0.82);
          border: 1px solid var(--accent-line);
          padding: 5px 12px;
          border-radius: 2px;
          backdrop-filter: blur(8px);
          font-weight: 600;
          text-shadow: 0 1px 4px rgba(0,0,0,0.8);
        }

        .aw-desc { color: var(--text-body); font-size: 0.94rem; line-height: 1.7; }

        /* ---------- Buttons ---------- */
        .aw-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 15px 30px;
          background: var(--accent-solid);
          color: #FBF3EA;
          font-weight: 600;
          font-size: 0.92rem;
          border-radius: 2px;
          border: 1px solid var(--accent-solid);
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }
        .aw-btn-primary:hover {
          background: var(--accent-solid-hover);
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -12px rgba(59,93,150,0.5);
        }
        .aw-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 14px 28px;
          background: transparent;
          color: var(--text-pure);
          font-weight: 600;
          font-size: 0.92rem;
          border-radius: 2px;
          border: 1px solid var(--border-subtle);
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
          cursor: pointer;
        }
        .aw-btn-ghost:hover {
          border-color: var(--accent-line);
          background: rgba(201,162,39,0.06);
          transform: translateY(-2px);
        }

        /* ---------- Stat blocks ---------- */
        .aw-stat { border-left: 2px solid var(--accent-line); padding-left: 18px; }
        .aw-stat h3 { font-family: var(--font-display); font-size: 2.1rem; font-weight: 600; color: var(--text-pure); }
        .aw-stat label { display: block; margin-top: 5px; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }

        /* ---------- Values / ledger list ---------- */
        .value-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 22px;
          border-radius: 3px;
          cursor: pointer;
          border-left: 3px solid transparent;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .value-row.is-active { background: var(--bg-secondary); border-left-color: var(--accent-solid); }
        .value-progress-track {
          margin-top: 3px;
          height: 2px;
          width: 100%;
          background: var(--border-subtle);
          border-radius: 2px;
          overflow: hidden;
        }
        .value-progress-fill { height: 100%; background: var(--accent-line); }

        /* ---------- Process glow boxes (Section 5) ---------- */
        .process-box-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
        }
        .process-box {
          position: relative;
          padding: 2.5rem 2rem;
          background: var(--bg-cards);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          overflow: hidden;
          transition: border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
          cursor: default;
        }
        .process-box::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          background: radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.12) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .process-box:hover {
          border-color: var(--accent-line);
          transform: translateY(-6px);
          box-shadow: 0 0 0 1px rgba(201,162,39,0.25), 0 20px 60px -20px rgba(201,162,39,0.35), 0 8px 32px -8px rgba(0,0,0,0.55);
        }
        .process-box:hover::before {
          opacity: 1;
        }
        .process-box-step {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: transparent;
          border: 1.5px solid var(--accent-line);
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 700;
          color: var(--accent-line);
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
          transition: background 0.35s ease, box-shadow 0.35s ease;
        }
        .process-box:hover .process-box-step {
          background: rgba(201,162,39,0.1);
          box-shadow: 0 0 18px rgba(201,162,39,0.4);
        }
        .process-box-title { font-size: 1.2rem; font-weight: 700; color: var(--text-pure); margin-bottom: 0.75rem; position: relative; z-index: 1; }
        .process-box-desc { color: var(--text-body); font-size: 0.92rem; line-height: 1.75; position: relative; z-index: 1; }
        @media (max-width: 768px) {
          .process-box-grid { grid-template-columns: 1fr; }
        }

        /* ---------- Industry cards (Section 6) ---------- */
        .industry-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          padding: 2rem 1.75rem;
          border-radius: 5px;
          background: var(--bg-cards);
          border: 1px solid var(--border-subtle);
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .industry-card:hover {
          border-color: var(--accent-line);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px -16px rgba(0,0,0,0.5);
        }
        .industry-card-icon {
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
          background: rgba(201,162,39,0.08);
          border: 1px solid rgba(201,162,39,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-line);
        }
        .industry-card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-pure);
          line-height: 1.3;
        }
        .industry-card-desc {
          font-size: 0.88rem;
          color: var(--text-body);
          line-height: 1.65;
        }
        .section6-eyebrow {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 2.5vw, 1.6rem);
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--accent-line);
          margin-bottom: 1rem;
          font-style: italic;
        }
        /* ---------- Legacy chip (fallback) ---------- */
        .aw-chip {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 26px;
          border-radius: 3px;
          background: var(--bg-cards);
          border: 1px solid var(--border-subtle);
          color: var(--text-pure);
          font-size: 0.95rem;
          font-weight: 500;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .aw-chip:hover { border-color: var(--accent-line); transform: translateY(-3px); }

        /* ---------- Testimonial ---------- */
        .aw-testimonial-card {
          position: relative;
          padding: 4.5rem 3rem;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          background: var(--bg-cards);
        }
        .aw-testimonial-text {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(1.35rem, 2.6vw, 1.85rem);
          line-height: 1.55;
          color: var(--text-pure);
          font-weight: 500;
        }

        /* ---------- CTA ---------- */
        .aw-cta {
          position: relative;
          padding: 130px 40px;
          background: var(--bg-secondary);
          overflow: hidden;
        }
        .aw-cta-blur {
          position: absolute;
          width: 560px;
          height: 560px;
          top: -220px;
          right: -160px;
          background: radial-gradient(circle, rgba(59,93,150,0.3) 0%, transparent 70%);
          pointer-events: none;
        }
        .aw-cta-content { position: relative; z-index: 2; max-width: 780px; margin: 0 auto; text-align: center; }
        .aw-cta-headline { font-family: var(--font-display); font-size: clamp(2.2rem, 4.4vw, 3.4rem); line-height: 1.15; font-weight: 600; color: var(--text-pure); margin-bottom: 1.25rem; }
        .aw-cta-sub { color: var(--text-body); font-size: 1.05rem; max-width: 520px; margin: 0 auto 2.5rem; line-height: 1.7; }
        .aw-cta-actions { display: flex; gap: 18px; justify-content: center; flex-wrap: wrap; }
      ` }} />

      {/* 1. HERO SECTION — UNCHANGED */}
      <main style={{ flex: "1 0 auto", width: "100%", position: "relative" }}>

        <div id="hero-root" style={{ height: "100vh", position: "relative" }}>

          {/* Background Slideshow Layer */}
          <div className="hero-bg-texture-layer" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            {SLIDESHOW_IMAGES.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`slideshow-bg-${idx}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: currentBgIndex === idx ? 0.6 : 0,
                  filter: "contrast(110%) brightness(70%)",
                  transition: "opacity 1.5s ease-in-out",
                  zIndex: currentBgIndex === idx ? 1 : 0
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-[#090706]" style={{ zIndex: 2 }} />
          </div>

          <div className="hero-stage" style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="arc-content" style={{ opacity: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontWeight: 600,
                color: "#FCFAF9",
                lineHeight: "1.15",
                textShadow: "0 4px 24px rgba(0,0,0,0.65)",
                maxWidth: "960px",
                margin: "0 0 1.5rem 0"
              }}>
                Threads that Speaks, Stories that Stay
              </h1>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                margin: "0 0 2.5rem 0"
              }}>
                <span style={{ width: "35px", height: "1px", background: "var(--accent-line, #C9A227)" }}></span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "var(--accent-line, #C9A227)"
                }}>
                  ARC
                </span>
                <span style={{ width: "35px", height: "1px", background: "var(--accent-line, #C9A227)" }}></span>
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', pointerEvents: 'auto' }}>
                <Link
                  href="/collection"
                  style={{
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '14px 32px',
                    background: 'rgba(255,255,255,0.95)',
                    color: '#0F0B08',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    letterSpacing: '0.04em',
                    borderRadius: '3px',
                    border: '1.5px solid rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(8px)',
                    transition: 'background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#fff'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 32px rgba(0,0,0,0.5)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.95)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)'; }}
                >
                  Explore Collection
                </Link>
                <button
                  onClick={() => scrollToSection('quote')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '13px 30px',
                    background: 'rgba(255,255,255,0.10)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    letterSpacing: '0.04em',
                    borderRadius: '3px',
                    border: '1.5px solid rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    cursor: 'pointer',
                    transition: 'background 0.25s ease, transform 0.25s ease, border-color 0.25s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.22)'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#ffffff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.7)'; }}
                >
                  Request a Quote
                </button>
              </div>
            </div>

            {/* Scroll Down Indicator */}
            <div
              onClick={() => scrollToSection('about')}
              style={{
                position: "absolute",
                bottom: "2.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                color: "rgba(255,255,255,0.6)",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#FCFAF9"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll Down</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>

          </div>
        </div>

        {/* 2. COMPANY OVERVIEW */}
        <motion.section
          id="about"
          className="ux-section reveal-node"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div variants={fadeInUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <span className="eyebrow"><Award className="w-3.5 h-3.5" /> Corporate Profile</span>
              <h2 className="ux-section-title">Time-Honored<br />Expertise.</h2>
              <p className="ux-section-subtitle" style={{ marginBottom: 0 }}>
                The family business of carpets goes back to 1989, and Abdul Rahman Carpets was formally established to carry this tradition forward with dedication and excellence. With decades of experience, we take pride in preserving the rich legacy of our forefathers, who began this journey in the heartland of India, Bhadohi — known worldwide as the “Carpet City.”
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', paddingTop: '1rem' }}>
                <div className="aw-stat">
                  <h3>1989</h3>
                  <label>Family Roots</label>
                </div>
                <div className="aw-stat">
                  <h3>Bhadohi</h3>
                  <label>India&apos;s Carpet City</label>
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerContainer} style={{ display: 'grid', gap: '20px' }}>
              <motion.div variants={fadeInUp} className="aw-card aw-card-padded">
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-pure)' }}>Decades of Experience</h3>
                <p className="aw-desc">Fine-tuned operational experience handling premium materials, yarn combinations, and high-concurrency client orders.</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="aw-card aw-card-padded">
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-pure)' }}>Direct Communication</h3>
                <p className="aw-desc">Eliminate middle-tier friction. Connect with production specialists in real time via WhatsApp for swift product inquiries.</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <ThreadDivider />

        {/* 3. FEATURED MATERIAL COLLECTIONS */}
        <section id="collection" className="ux-section reveal-node section-band-3">
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4.5rem' }}
            >
              <span className="eyebrow"><Layers className="w-3.5 h-3.5" /> Preserving Artistry</span>
              <h2 className="ux-section-title">Featured Material Collections</h2>
              <p className="ux-section-subtitle" style={{ margin: '0 auto' }}>Explore an excerpt of our premium, high-density offerings explicitly tailored for architectural layouts.</p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px 32px' }}
            >
              {[
                {
                  title: 'Handmade Woolen Carpets',
                  desc: 'Exquisite masterworks carrying forward ancestral traditions with premium, robust woolen yarns.',
                  type: 'Handwoven Woolen',
                  img: '/Carpet_01.jpg'
                },
                {
                  title: 'Classic Cotton Masterpieces',
                  desc: 'Beautifully structured formats showcasing fine craftsmanship with highly durable cotton fibers.',
                  type: 'Natural Cotton',
                  img: '/Carpet_04.jpg'
                },
                {
                  title: 'Premium Viscose Formations',
                  desc: 'High-quality lustrous layouts bringing elegant surface sheens and contemporary finishes to spaces.',
                  type: 'Viscose Blend',
                  img: '/Carpet_07.jpg'
                }
              ].map((col, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="aw-card"
                  style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
                >
                  <div className="aw-image-frame fringed-frame">
                    <img src={col.img} alt={col.title} />
                    <span className="aw-tag">{col.type}</span>
                    <Fringe />
                  </div>
                  <div style={{ padding: '2.75rem 2rem 2.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-pure)' }}>{col.title}</h3>
                    <p className="aw-desc">{col.desc}</p>

                    <div style={{ marginTop: 'auto', paddingTop: '1.75rem' }}>
                      <button
                        className="aw-btn-ghost"
                        style={{ width: '100%' }}
                        onClick={() => scrollToSection('quote')}
                      >
                        Inquire Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. INTERACTIVE VALUE ENGINE */}
        <section id="services" className="ux-section reveal-node">
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4.5rem' }}
            >
              <span className="eyebrow"><Sparkles className="w-3.5 h-3.5" /> Company Strengths</span>
              <h2 className="ux-section-title">The Allure of Handcrafted Carpets</h2>
              <p className="ux-section-subtitle" style={{ margin: '0 auto' }}>
                It&apos;s our deep-rooted values and dedication to quality that truly define who we are.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}
            >

              <motion.div variants={fadeInUp} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {valuesData.map((item, index) => {
                  const isActive = activeValueIndex === index;
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => handleItemHover(index)}
                      className={`value-row mobile-scroll-target ${isActive ? 'is-active' : ''}`}
                    >
                      <div style={{ color: isActive ? 'var(--accent-line)' : 'var(--text-muted)', flexShrink: 0 }}>
                        {item.icon}
                      </div>

                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.08rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--text-pure)' : 'var(--text-body)', marginBottom: isActive ? '8px' : 0, transition: 'all 0.2s ease' }}>
                          {item.title}
                        </h3>
                        {isActive && (
                          <div className="value-progress-track">
                            <motion.div
                              key={activeValueIndex}
                              className="value-progress-fill"
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                            />
                          </div>
                        )}
                      </div>

                      <ChevronRight className={`w-4 h-4 text-[var(--accent-line)] transition-all duration-300 flex-shrink-0 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                    </div>
                  );
                })}
              </motion.div>

              <motion.div variants={fadeInUp} style={{ minHeight: '340px', display: 'flex', alignItems: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeValueIndex}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="aw-card aw-card-padded"
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ color: 'var(--accent-line)', background: 'var(--bg-page)', width: '3.5rem', height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid var(--border-active)' }}>
                        {valuesData[activeValueIndex].icon}
                      </div>
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Value Parameter 0{activeValueIndex + 1}</span>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 600, color: 'var(--text-pure)' }}>
                          {valuesData[activeValueIndex].title}
                        </h3>
                      </div>
                    </div>

                    <p className="aw-desc" style={{ borderLeft: '2px solid var(--accent-line)', paddingLeft: '18px' }}>
                      {valuesData[activeValueIndex].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

            </motion.div>
          </div>
        </section>

        <ThreadDivider />

        {/* 5. MANUFACTURING PROCESS */}
        <section className="ux-section reveal-node section-band-5">
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ marginBottom: '4rem' }}
            >
              <span className="eyebrow">Our Execution Standards</span>
              <h2 className="ux-section-title">In-House Production Workflow</h2>
              <p className="ux-section-subtitle">We take utmost care in maintaining high quality and pay close attention to every detail of the manufacturing process.</p>
            </motion.div>

            <motion.div
              className="process-box-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {[
                { step: '01', title: 'Skilled Design Formulation', desc: 'Our unique designs are engineered completely by expert in-house design specialists, and we warmly welcome customer ideas and briefs.' },
                { step: '02', title: 'Client Customization', desc: 'Transforming unique and attractive customer blueprint ideas into stunning final physical layouts with precision and care.' },
                { step: '03', title: 'Flawless In-House Weaving', desc: 'Our entire production — from designing to weaving — is carried out in-house, leaving absolutely no scope for compromise.' }
              ].map((proc, index) => (
                <motion.div key={index} variants={fadeInUp} className="process-box">
                  <span className="process-box-step">{proc.step}</span>
                  <h3 className="process-box-title">{proc.title}</h3>
                  <p className="process-box-desc">{proc.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. INDUSTRIES SERVED */}
        <section className="ux-section reveal-node">
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ marginBottom: '3.5rem' }}
            >
              <span className="section6-eyebrow">Presenting Textile Masterworks Internationally</span>
              <h2 className="ux-section-title">Markets &amp; Applications</h2>
              <p className="ux-section-subtitle">Our handcrafted carpets reach discerning clients across diverse global segments — from high-end residences to international export hubs.</p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}
            >
              {[
                { icon: <Globe className="w-5 h-5" />, title: 'Global Export Markets', desc: 'Premium handwoven carpets shipped worldwide to top importers and distributors.' },
                { icon: <Building2 className="w-5 h-5" />, title: 'Residential Spaces', desc: 'Bespoke carpet solutions for luxury homes, villas, and private residences.' },
                { icon: <Layers className="w-5 h-5" />, title: 'Custom Showrooms', desc: 'Exclusive collections and design collaborations for premium interior showrooms.' },
                { icon: <Sparkles className="w-5 h-5" />, title: 'Bespoke Collaborations', desc: 'Tailor-made project partnerships with architects, interior designers, and brands.' },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="industry-card">
                  <div className="industry-card-icon">{item.icon}</div>
                  <p className="industry-card-title">{item.title}</p>
                  <p className="industry-card-desc">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <ThreadDivider />

        {/* 7. CUSTOMER TESTIMONIALS */}
        <section className="ux-section reveal-node section-band-7">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            style={{ maxWidth: '980px', margin: '0 auto' }}
          >
            <div className="aw-testimonial-card" style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Quote style={{ width: '2.25rem', height: '2.25rem', color: 'var(--accent-line)', opacity: 0.6 }} />
              </div>
              <h2 className="aw-testimonial-text">
                Abdul Rahman Carpets goes beyond expectations, blending time-honored weaving traditions with modern excellence to ensure every client is truly satisfied.
              </h2>
              <div style={{ marginTop: '2.5rem' }}>
                <h4 style={{ fontWeight: 700, color: 'var(--text-pure)' }}>Global Sourcing Representative</h4>
                <span style={{ display: 'block', marginTop: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>International Textile Network</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 8. GALLERY PREVIEW */}
        <section className="ux-section reveal-node">
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', marginBottom: '4.5rem' }}
            >
              <span className="eyebrow">Exquisite Handcraft</span>
              <h2 className="ux-section-title">Gallery Specimen Preview</h2>
              <p className="ux-section-subtitle">
                A curated look into our premium textures, intricate border styles, and signature contemporary weaving finishes.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '44px 24px' }}
            >
              {[
                {
                  src: '/Carpet_02.jpg',
                  title: 'Vintage Medallion',
                  tag: 'Classic Woolen'
                },
                {
                  src: '/Carpet_05.jpg',
                  title: 'Minimalist Linens',
                  tag: 'Modern Organic'
                },
                {
                  src: '/Carpet_08.jpg',
                  title: 'Lustrous Surface Sheen',
                  tag: 'Premium Viscose'
                },
                {
                  src: '/Carpet_03.jpg',
                  title: 'Earth-Toned Textures',
                  tag: 'Natural Cotton'
                }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="aw-card mobile-scroll-target" style={{ padding: 0, overflow: 'hidden' }}>
                  <div className="aw-image-frame fringed-frame" style={{ aspectRatio: '1 / 1' }}>
                    <img src={item.src} alt={item.title} />
                    <span className="aw-tag">{item.tag}</span>
                    <Fringe />
                  </div>
                  <div style={{ padding: '1.75rem 1.5rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.12rem', fontWeight: 700, color: 'var(--text-pure)' }}>{item.title}</h3>
                    <ArrowRight className="w-4 h-4 text-[var(--accent-line)]" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 9. FINAL CALL TO ACTION */}
        <section id="quote" className="aw-cta reveal-node">
          <div className="aw-cta-blur"></div>
          <motion.div
            className="aw-cta-content"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2 className="aw-cta-headline">
              Transform Your Vision into a <br />
              <span style={{ color: 'var(--accent-line)', fontStyle: 'italic', fontWeight: 500 }}>Beautifully Crafted Reality</span>
            </h2>
            <p className="aw-cta-sub">
              Connect with our team to explore design options or request a direct price quote from Bhadohi.
            </p>
            <div className="aw-cta-actions">
              <a
                href="https://wa.me/919321366585"
                target="_blank"
                rel="noopener noreferrer"
                className="aw-btn-primary"
                style={{ textDecoration: 'none' }}
              >
                <MessageSquare className="w-5 h-5" /> Contact on WhatsApp
              </a>
              <a
                href="mailto:info@abdulrahmancarpets.com?subject=Quote Request"
                className="aw-btn-ghost"
                style={{ textDecoration: 'none' }}
              >
                <FileText className="w-5 h-5" /> Email Quote Request
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}