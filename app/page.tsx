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
  ChevronRight
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

export default function HomePage() {
  const stickyScrollTrackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const introH1Ref = useRef<HTMLHeadingElement>(null);
  const introPRef = useRef<HTMLParagraphElement>(null);
  const arcContentRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const AUTOPLAY_MS = 4000;

  const valuesData = [
    { icon: <Users className="w-5 h-5" />, title: 'Collaboration', desc: 'We blend creativity and craftsmanship, working side by side to combine talent with the latest trends — all to transform your vision into a beautifully crafted reality.' },
    { icon: <CheckCircle className="w-5 h-5" />, title: 'High Standards', desc: 'We hold ourselves to the highest standards, delivering quality at every stage. Our trusted certifications reflect our commitment to excellence and accountability.' },
    { icon: <TrendingUp className="w-5 h-5" />, title: 'Consistency', desc: 'By embracing the latest technology, we maintain a steady rhythm of innovation and improvement — ensuring consistent quality in everything we do.' },
    { icon: <Heart className="w-5 h-5" />, title: 'Commitment', desc: 'Our dedicated craftsmen and team bring exceptional skill and passion to every detail, going above and beyond to exceed your expectations.' },
    { icon: <Eye className="w-5 h-5" />, title: 'Integrity', desc: 'With every weave, we reflect our commitment to honesty and excellence. Our transparent approach ensures your goals remain at the heart of what we create.' },
    { icon: <Sparkles className="w-5 h-5" />, title: 'Client Satisfaction', desc: 'We go beyond expectations, blending time-honored weaving traditions with modern excellence to ensure every client is truly satisfied.' }
  ];

  // 3D ARC PHYSICS ENGINE LOGIC (UNCHANGED)
  useEffect(() => {
    const root = rootRef.current;
    const container = containerRef.current;
    const scrollTrack = stickyScrollTrackRef.current;
    if (!root || !container || !scrollTrack) return;

    let introPhase: "scatter" | "line" | "circle" = "scatter";
    let containerSize = { width: root.clientWidth, height: root.clientHeight };
    let currentScrollProgress = 0;
    let mouseXTarget = 0;
    let autoRotationAngle = 0;

    const morphSpring = makeSpring(0, 40, 20);
    const scrollSlideSpring = makeSpring(0, 40, 24);
    const mouseSpring = makeSpring(0, 30, 20);

    const timer1 = setTimeout(() => { introPhase = "line"; }, 1000);
    const timer2 = setTimeout(() => { introPhase = "circle"; }, 3200);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerSize = {
          width: entry.contentRect.width,
          height: entry.contentRect.height
        };
      }
    });
    resizeObserver.observe(root);

    const handleScroll = () => {
      const rect = scrollTrack.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      if (totalScrollableHeight <= 0) return;

      const currentProgress = -rect.top / totalScrollableHeight;
      currentScrollProgress = clamp(currentProgress, 0, 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseXTarget = normalizedX * 100;
    };
    root.addEventListener("mousemove", handleMouseMove);

    function computeTarget(i: number, morphValue: number, scrollSlideValue: number, parallaxValue: number): CardTarget {
      if (introPhase === "scatter") {
        return scatterPositions[i];
      } else if (introPhase === "line") {
        const lineSpacing = 120;
        const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
        const lineX = i * lineSpacing - lineTotalWidth / 2;
        return { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
      } else {
        const isMobile = containerSize.width < 768;
        const minDimension = Math.min(containerSize.width, containerSize.height);

        const circleRadius = Math.min(minDimension * 0.35, 330);
        const circleAngle = (i / TOTAL_IMAGES) * 360;
        const circleRad = (circleAngle * Math.PI) / 180;
        const circlePos = {
          x: Math.cos(circleRad) * circleRadius,
          y: Math.sin(circleRad) * circleRadius,
          rotation: circleAngle + 90
        };

        const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
        const arcRadius = baseRadius * (isMobile ? 1.3 : 1.05);
        const arcApexY = containerSize.height * (isMobile ? 0.38 : 0.28);
        const arcCenterY = arcApexY + arcRadius;

        const spreadAngle = isMobile ? 90 : 110;
        const startAngle = -90 - spreadAngle / 2;
        const step = spreadAngle / (TOTAL_IMAGES - 1);

        const currentArcAngle = startAngle + i * step + autoRotationAngle;
        const arcRad = (currentArcAngle * Math.PI) / 180;

        const slideYOffset = scrollSlideValue * (containerSize.height * 1.1);

        const arcPos = {
          x: Math.cos(arcRad) * arcRadius + parallaxValue,
          y: Math.sin(arcRad) * arcRadius + arcCenterY + slideYOffset,
          rotation: currentArcAngle + 90,
          scale: isMobile ? 1.2 : 1.5
        };

        return {
          x: lerp(circlePos.x, arcPos.x, morphValue),
          y: lerp(circlePos.y, arcPos.y, morphValue),
          rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
          scale: lerp(1, arcPos.scale, morphValue),
          opacity: 1
        };
      }
    }

    let lastTime = performance.now();
    let animFrameId: number;

    const frame = (now: number) => {
      let dt = (now - lastTime) / 1000;
      dt = Math.min(dt, 1 / 30);
      lastTime = now;

      const targetMorph = introPhase === "circle" ? 1 : 0;

      const morphValue = morphSpring.update(targetMorph, dt);
      const scrollSlideValue = scrollSlideSpring.update(currentScrollProgress, dt);
      const parallaxValue = mouseSpring.update(mouseXTarget, dt);

      if (introPhase === "circle" && scrollSlideValue < 0.05) {
        autoRotationAngle += dt * 3.5;
      }

      const children = container.children;
      for (let i = 0; i < TOTAL_IMAGES; i++) {
        const cardEl = children[i] as HTMLElement;
        if (!cardEl) continue;
        const t = computeTarget(i, morphValue, scrollSlideValue, parallaxValue);
        cardEl.style.transform = `translate(${t.x}px, ${t.y}px) rotate(${t.rotation}deg) scale(${t.scale})`;
        cardEl.style.opacity = String(t.opacity);
      }

      if (introH1Ref.current && introPRef.current) {
        if (introPhase === "circle" && morphValue < 0.5) {
          introH1Ref.current.style.opacity = String(clamp(1 - morphValue * 2 - scrollSlideValue * 2, 0, 1));
          introH1Ref.current.style.filter = "blur(0px)";
          introPRef.current.style.opacity = String(clamp(0.5 - morphValue, 0, 1));
        } else {
          introH1Ref.current.style.opacity = "0";
          introH1Ref.current.style.filter = "blur(10px)";
          introPRef.current.style.opacity = "0";
        }
      }

      if (arcContentRef.current) {
        const contentOpacity = clamp(lerp(0, 1, morphValue) - scrollSlideValue * 2, 0, 1);
        const contentY = lerp(20, 0, morphValue) - (scrollSlideValue * 60);
        arcContentRef.current.style.opacity = String(contentOpacity);
        arcContentRef.current.style.transform = `translateY(${contentY}px)`;
      }

      animFrameId = requestAnimationFrame(frame);
    };

    animFrameId = requestAnimationFrame(frame);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      resizeObserver.disconnect();
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("scroll", handleScroll);
      root.removeEventListener("mousemove", handleMouseMove);
    };
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

  // Sync theme state → html[data-theme] whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
          top: 14%;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          pointer-events: none;
          padding: 0 1rem;
          opacity: 0;
          transition: opacity 0.15s linear, transform 0.15s linear;
        }
        .arc-content h2 {
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 600;
          color: #FCFAF9;
          font-family: var(--font-display);
          letter-spacing: -0.01em;
          margin: 0 0 0.75rem 0;
        }
        .arc-content p {
          font-size: clamp(0.875rem, 2vw, 1.05rem);
          color: #C6CCDA;
          max-width: 36rem;
          line-height: 1.6;
          margin: 0;
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
        .section-band {
          background: var(--bg-secondary);
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
          color: var(--text-pure);
          background: rgba(23,17,13,0.72);
          border: 1px solid rgba(244,235,221,0.18);
          padding: 5px 10px;
          border-radius: 2px;
          backdrop-filter: blur(4px);
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

        /* ---------- Process timeline ---------- */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          position: relative;
        }
        .process-grid::before {
          content: '';
          position: absolute;
          top: 28px;
          left: 8%;
          right: 8%;
          height: 1px;
          background: repeating-linear-gradient(90deg, var(--accent-line) 0 6px, transparent 6px 14px);
          opacity: 0.5;
        }
        .process-cell {
          position: relative;
          padding: 0 28px;
        }
        .process-cell:first-child { padding-left: 0; }
        .process-cell:last-child { padding-right: 0; }
        .process-index {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--bg-page);
          border: 1px solid var(--border-active);
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 500;
          color: var(--accent-line);
          margin-bottom: 1.75rem;
        }
        .process-title { font-size: 1.2rem; font-weight: 700; color: var(--text-pure); margin-bottom: 0.6rem; }
        .process-desc { color: var(--text-body); font-size: 0.92rem; line-height: 1.7; }
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: 1fr; gap: 2.75rem; }
          .process-grid::before { display: none; }
          .process-cell { padding: 0 !important; }
        }

        /* ---------- Industry chips ---------- */
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

        <div className="scroll-track-container" ref={stickyScrollTrackRef}>
          <div className="hero-sticky-frame">
            <div id="hero-root" ref={rootRef}>

              <div className="hero-bg-texture-layer">
                <img src="/Background-image.jpg" alt="Abdul Rahman Artisan Legacy Dark Canvas" />
                <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
              </div>

              <div className="hero-stage">
                <div className="arc-content" ref={arcContentRef}>
                  <h2 ref={introH1Ref}>Abdul Rahman Carpets</h2>
                  <p ref={introPRef}>
                    A trusted manufacturer of Handmade Woolen, Cotton, Viscose, and custom-tailored carpets.
                    Bringing authentic Bhadohi heritage and modern luxury into premium design architectures worldwide.
                  </p>
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem', pointerEvents: 'auto' }}>
                    <Link href="/collection" className="aw-btn-primary" style={{ textDecoration: 'none' }}>
                      Explore Collection
                    </Link>
                    <button className="aw-btn-ghost" onClick={() => scrollToSection('quote')}>
                      Request a Quote
                    </button>
                  </div>
                </div>

                <div className="cards-container" ref={containerRef}>
                  {IMAGES.map((src, idx) => (
                    <div key={idx} className="card-outer">
                      <div className="card-inner">
                        <div className="card-face card-front">
                          <img src={src} alt={`specimen-thumb-${idx + 1}`} />
                          <div className="overlay" />
                        </div>
                        <div className="card-face card-back">
                          <p className="label">Bhadohi Legacy</p>
                          <p className="value">Specimen 0{idx + 1}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* IMAGE STRIP — Full-width scrolling carpet showcase */}
        <div style={{ width: '100%', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '0', overflow: 'hidden' }}>
          <motion.div
            initial={{ x: 0 }}
            style={{ display: 'flex', gap: '4px' }}
          >
            {['/Carpet_01.jpg', '/Carpet_02.jpg', '/Carpet_03.jpg', '/Carpet_04.jpg', '/Carpet_05.jpg', '/Carpet_06.jpg', '/Carpet_07.jpg', '/Carpet_08.jpg', '/Carpet_09.jpg'].map((src, i) => (
              <div
                key={i}
                style={{
                  flex: '0 0 auto',
                  width: 'clamp(260px, 22vw, 340px)',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={src}
                  alt={`Carpet specimen ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>Specimen {String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>
            ))}
          </motion.div>
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
        <section id="collection" className="ux-section reveal-node section-band">
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
              </div>

              <div style={{ minHeight: '340px', display: 'flex', alignItems: 'center' }}>
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
              </div>

            </div>
          </div>
        </section>

        <ThreadDivider />

        {/* 5. MANUFACTURING PROCESS */}
        <section className="ux-section reveal-node section-band">
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ marginBottom: '4.5rem' }}
            >
              <span className="eyebrow">Our Execution Standards</span>
              <h2 className="ux-section-title">In-House Production Workflow</h2>
              <p className="ux-section-subtitle">We take utmost care in maintaining high quality and pay close attention to every detail of the manufacturing process.</p>
            </motion.div>

            <motion.div
              className="process-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                { step: '01', title: 'Skilled Design Formulation', desc: 'Our unique designs are engineered completely by expert in-house design specialists, and we welcome customer ideas.' },
                { step: '02', title: 'Client Customization', desc: 'Transforming unique and attractive customer blueprint ideas into final physical layouts.' },
                { step: '03', title: 'Flawless In-House Weaving', desc: 'Our entire production process — from designing to weaving — is carried out in-house, leaving no scope for compromise.' }
              ].map((proc, index) => (
                <motion.div key={index} variants={fadeInUp} className="process-cell mobile-scroll-target">
                  <span className="process-index">{proc.step}</span>
                  <h3 className="process-title">{proc.title}</h3>
                  <p className="process-desc">{proc.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. INDUSTRIES SERVED */}
        <section className="ux-section reveal-node">
          <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Presenting Textile Masterworks Internationally</span>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '1.5rem' }}
            >
              {[
                { text: 'Global Export Markets' },
                { text: 'Residential Layouts' },
                { text: 'Custom Showrooms' },
                { text: 'Bespoke Collaborations' }
              ].map((industry, i) => (
                <motion.div key={i} variants={fadeInUp} className="aw-chip">
                  <Building2 className="w-4 h-4 text-[var(--accent-line)]" /> {industry.text}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <ThreadDivider />

        {/* 7. CUSTOMER TESTIMONIALS */}
        <section className="ux-section reveal-node section-band">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            style={{ maxWidth: '980px', margin: '0 auto' }}
          >
            <div className="aw-testimonial-card" style={{ textAlign: 'center' }}>
              <Quote className="w-9 h-9 text-[var(--accent-line)] mx-auto mb-6 opacity-50" />
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
                href="https://wa.me/your-number"
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