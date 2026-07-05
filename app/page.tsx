"use client";

import React, { useState, useEffect, useRef } from 'react';
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

// --- IMPORT NAVBAR AND FOOTER USING NEXT.JS PATH ALIAS --- //
import Navbar from '@/components/mostused/Navbar';
import Footer from '@/components/mostused/Footer';

// ---------- Config & Constants ----------
const TOTAL_IMAGES = 9;

// Array mapped specifically to public folder names (Carpet_01 to Carpet_09)
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

export default function HomePage() {
  const stickyScrollTrackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const introH1Ref = useRef<HTMLHeadingElement>(null);
  const introPRef = useRef<HTMLParagraphElement>(null);
  const arcContentRef = useRef<HTMLDivElement>(null);

  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const valuesData = [
    { icon: <Users className="w-5 h-5" />, title: 'Collaboration', desc: 'We blend creativity and craftsmanship, working side by side to combine talent with the latest trends — all to transform your vision into a beautifully crafted reality.' },
    { icon: <CheckCircle className="w-5 h-5" />, title: 'High Standards', desc: 'We hold ourselves to the highest standards, delivering quality at every stage. Our trusted certifications reflect our commitment to excellence and accountability.' },
    { icon: <TrendingUp className="w-5 h-5" />, title: 'Consistency', desc: 'By embracing the latest technology, we maintain a steady rhythm of innovation and improvement — ensuring consistent quality in everything we do.' },
    { icon: <Heart className="w-5 h-5" />, title: 'Commitment', desc: 'Our dedicated craftsmen and team bring exceptional skill and passion to every detail, going above and beyond to exceed your expectations.' },
    { icon: <Eye className="w-5 h-5" />, title: 'Integrity', desc: 'With every weave, we reflect our commitment to honesty and excellence. Our transparent approach ensures your goals remain at the heart of what we create.' },
    { icon: <Sparkles className="w-5 h-5" />, title: 'Client Satisfaction', desc: 'We go beyond expectations, blending time-honored weaving traditions with modern excellence to ensure every client is truly satisfied.' }
  ];

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

        // State A: Circle Layout
        const circleRadius = Math.min(minDimension * 0.35, 330);
        const circleAngle = (i / TOTAL_IMAGES) * 360;
        const circleRad = (circleAngle * Math.PI) / 180;
        const circlePos = {
          x: Math.cos(circleRad) * circleRadius,
          y: Math.sin(circleRad) * circleRadius,
          rotation: circleAngle + 90
        };

        // State B: Fixed Base Half-Circle Arc
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
    autoPlayRef.current = setInterval(() => {
      setActiveValueIndex((prevIndex) => (prevIndex + 1) % valuesData.length);
    }, 4000);

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
      }, 4000);
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#4A3E3D] font-sans antialiased selection:bg-[#7A1C1C] selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      
      <Navbar />

      <style dangerouslySetInnerHTML={{ __html: `
        .scroll-track-container {
          position: relative;
          width: 100%;
          height: 140vh;
          margin-bottom: 0px;
          background: #FCFAF9; 
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
          background: #000000; /* Replaced any remaining fallback fields to default to the image underlay bounds */
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
        .intro-text {
          position: absolute;
          z-index: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          pointer-events: none;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          padding: 0 1rem;
        }
        .intro-text h1 {
          font-size: 1.75rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #FCFAF9; 
          margin: 0;
          filter: blur(0px);
          transition: opacity 0.4s ease, filter 0.4s ease;
        }
        @media (min-width: 768px) {
          .intro-text h1 { font-size: 2.75rem; }
        }
        .intro-text p {
          margin-top: 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: #FA8A8A;
          transition: opacity 0.4s ease;
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
          font-size: 2rem;
          font-weight: 700;
          color: #FCFAF9;
          font-family: Georgia, Cambria, "Times New Roman", Times, serif;
          letter-spacing: -0.02em;
          margin: 0 0 0.75rem 0;
        }
        @media (min-width: 768px) {
          .arc-content h2 { font-size: 3.25rem; }
        }
        .arc-content p {
          font-size: 0.875rem;
          color: #D1C7C7;
          max-width: 36rem;
          line-height: 1.6;
          margin: 0;
        }
        @media (min-width: 768px) {
          .arc-content p { font-size: 1.05rem; }
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
          background: #1c0e0e;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          border: 1px solid #4A3E3D;
          transform: rotateY(180deg);
        }
        .card-back .label {
          font-size: 10px;
          font-weight: 700;
          color: #FA8A8A;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 0 0 0.25rem 0;
          text-align: center;
        }
        .card-back .value {
          font-size: 0.75rem;
          font-weight: 500;
          color: #FCFAF9;
          text-align: center;
          margin: 0;
        }
      ` }} />

      {/* 1. HERO SECTION */}
      <main style={{ flex: "1 0 auto", width: "100%", position: "relative" }}>
        
        <div className="scroll-track-container" ref={stickyScrollTrackRef}>
          <div className="hero-sticky-frame">
            <div id="hero-root" ref={rootRef}>
              
              <div className="hero-bg-texture-layer">
                <img src="/Background-image.jpg" alt="Abdul Rahman Artisan Legacy Dark Canvas" />
                {/* Fixed: Heavily tinted from-black/80 prevents top edge content leakage completely */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#FCFAF9]" />
              </div>

              <div className="hero-stage">
               
                <div className="arc-content" ref={arcContentRef}>
                  <h2>Abdul Rahman Carpets</h2>
                  <p>
                    A trusted manufacturer of Handmade Woolen, Cotton, Viscose, and custom-tailored carpets. 
                    Bringing authentic Bhadohi heritage and modern luxury into premium design architectures worldwide.
                  </p>
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

        {/* 2. COMPANY OVERVIEW */}
        <section id="about" className="py-24 bg-[#FFFFFF] px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <div className="h-1 w-12 bg-[#7A1C1C]" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2B1818]">Who We Are</h2>
            <p className="text-[#5C4D4D] leading-relaxed font-light text-base">
              The family business of carpets goes back to 1989, and Abdul Rahman Carpets was formally established to carry this tradition forward with dedication and excellence. With decades of experience, we take pride in preserving the rich legacy of our forefathers, who began this journey in the heartland of India, Bhadohi — known worldwide as the “Carpet City.”
            </p>
            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="border-l-4 border-[#7A1C1C] pl-4">
                <h3 className="text-3xl font-serif font-bold text-[#2B1818]">1989</h3>
                <p className="text-xs uppercase tracking-wider text-[#A39292] mt-1 font-semibold">Family Roots</p>
              </div>
              <div className="border-l-4 border-[#7A1C1C] pl-4">
                <h3 className="text-3xl font-serif font-bold text-[#2B1818]">Bhadohi</h3>
                <p className="text-xs uppercase tracking-wider text-[#A39292] mt-1 font-semibold">India's Carpet City</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative bg-[#FAF6F6] p-8 md:p-12 border border-[#EBE3E3] shadow-sm rounded-2xl overflow-hidden group"
          >
            <div className="relative z-10 space-y-4">
              <Sparkles className="text-[#7A1C1C] w-8 h-8" />
              <h3 className="text-2xl font-serif font-bold text-[#2B1818]">Our Heritage</h3>
              <p className="text-[#5C4D4D] font-light text-sm leading-relaxed">
                Ours is a closely held family business. While we are relatively new to the export market, our carpets reflect decades of family experience and dedication to quality. Our goal is to share the timeless artistry of skilled local craftsmen and weavers.
              </p>
              <ul className="space-y-3 font-light text-sm text-[#5C4D4D] border-t border-[#EBE3E3] pt-4">
                <li className="flex gap-3"><Layers className="w-5 h-5 text-[#7A1C1C] shrink-0" /> Upholding age-old traditions of handcrafted carpet manufacturing.</li>
                <li className="flex gap-3"><Award className="w-5 h-5 text-[#7A1C1C] shrink-0" /> Showcasing the intricate skills of local Indian craftsmen.</li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* 3. FEATURED MATERIAL COLLECTIONS */}
        <section id="collection" className="py-24 bg-[#FAF6F6] px-6 border-t border-b border-[#EBE3E3]">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
            >
              <div>
                <p className="text-[#7A1C1C] uppercase tracking-widest text-xs font-bold mb-2">Preserving Artistry</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2B1818]">Featured Material Collections</h2>
              </div>
              <a href="#quote" className="text-[#5C4D4D] font-semibold inline-flex items-center gap-1 border-b-2 border-[#5C4D4D] pb-1 hover:text-[#7A1C1C] hover:border-[#7A1C1C] transition-colors text-sm">
                Request Full Portfolio <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { 
                  title: 'Handmade Woolen Carpets', 
                  desc: 'Exquisite masterworks carrying forward ancestral traditions with premium, robust woolen yarns.', 
                  type: 'Handwoven Woolen',
                  img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
                },
                { 
                  title: 'Classic Cotton Masterpieces', 
                  desc: 'Beautifully structured formats showcasing fine craftsmanship with highly durable cotton fibers.', 
                  type: 'Natural Cotton',
                  img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800'
                },
                { 
                  title: 'Premium Viscose Formations', 
                  desc: 'High-quality lustrous layouts bringing elegant surface sheens and contemporary finishes to spaces.', 
                  type: 'Viscose Blend',
                  img: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&q=80&w=800'
                }
              ].map((col, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-[#EBE3E3] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer rounded-xl overflow-hidden"
                >
                  <div>
                    <div className="w-full h-64 overflow-hidden relative bg-[#F5F2F2]">
                      <img 
                        src={col.img} 
                        alt={col.title} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <span className="text-xs font-bold text-[#7A1C1C] uppercase tracking-wider bg-[#FDF2F2] px-2.5 py-1 rounded">{col.type}</span>
                      <h3 className="text-xl font-serif font-bold text-[#2B1818] mt-3 mb-3">{col.title}</h3>
                      <p className="text-[#6E5E5D] text-sm font-light leading-relaxed">{col.desc}</p>
                    </div>
                  </div>
                  <div className="px-8 pb-8">
                    <button className="text-sm font-semibold inline-flex items-center gap-2 text-[#5C4D4D] group-hover:text-[#7A1C1C] transition-colors pt-4 border-t border-[#FAF6F6] w-full">
                      Inquire Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. INTERACTIVE VALUE ENGINE */}
        <section id="services" className="py-24 bg-[#FFFFFF] px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-2xl mx-auto mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2B1818] mb-4">The Allure of Handcrafted Carpets</h2>
              <p className="text-[#6E5E5D] font-light text-sm md:text-base">
                It's our deep-rooted values and dedication to quality that truly define who we are.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 space-y-2 relative">
                <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-[#EBE3E3] hidden md:block" />

                {valuesData.map((item, index) => {
                  const isActive = activeValueIndex === index;
                  return (
                    <motion.div
                      key={index}
                      onMouseEnter={() => handleItemHover(index)}
                      className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 z-10 select-none ${
                        isActive 
                          ? 'bg-[#FAF6F6] shadow-sm border-l-4 border-[#7A1C1C] translate-x-1' 
                          : 'hover:bg-[#FAF6F6]/50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                        isActive ? 'bg-[#7A1C1C] scale-120' : 'bg-[#D1C7C7]'
                      }`} />

                      <div className={`p-2 rounded-lg transition-colors ${isActive ? 'text-[#7A1C1C] bg-white shadow-sm' : 'text-[#A39292]'}`}>
                        {item.icon}
                      </div>

                      <div className="flex-1">
                        <h3 className={`font-serif text-base md:text-lg transition-colors ${isActive ? 'text-[#2B1818] font-bold' : 'text-[#5C4D4D]'}`}>
                          {item.title}
                        </h3>
                      </div>

                      <ChevronRight className={`w-4 h-4 text-[#7A1C1C] transition-transform duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                    </motion.div>
                  );
                })}
              </div>

              <div className="lg:col-span-7 min-h-[380px] flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeValueIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#FAF6F6] text-[#5C4D4D] p-8 md:p-12 rounded-2xl shadow-sm w-full h-full flex flex-col justify-center relative overflow-hidden min-h-[380px] border border-[#EBE3E3]"
                  >
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="text-[#7A1C1C] bg-white w-14 h-14 flex items-center justify-center rounded-xl shadow-sm border border-[#EBE3E3]">
                        {valuesData[activeValueIndex].icon}
                      </div>
                      <div>
                        <span className="text-[#7A1C1C] uppercase tracking-widest text-[10px] font-bold block mb-0.5">Value Parameter 0{activeValueIndex + 1}</span>
                        <h3 className="text-2xl font-serif font-bold text-[#2B1818]">
                          {valuesData[activeValueIndex].title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-[#5C4D4D] text-base md:text-lg font-light leading-relaxed border-l-4 border-[#7A1C1C] pl-6 py-1 mt-2 relative z-10">
                      {valuesData[activeValueIndex].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* 5. MANUFACTURING PROCESS */}
        <section className="w-full bg-[#FAF6F6] text-[#5C4D4D] py-24 px-6 border-t border-b border-[#EBE3E3]">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-2xl mb-16"
            >
              <p className="text-[#7A1C1C] uppercase tracking-widest text-xs font-bold mb-2">Our Execution Standards</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2B1818]">In-House Production Workflow</h2>
              <p className="text-[#6E5E5D] font-light mt-2 text-sm">We take utmost care in maintaining high quality and pay close attention to every detail of the manufacturing process.</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {[
                { step: '01', title: 'Skilled Design Formulation', desc: 'Our unique designs are engineered completely by expert in-house design specialists, and we welcome customer ideas.' },
                { step: '02', title: 'Client Customization', desc: 'Transforming unique and attractive customer blueprint ideas into final physical layouts.' },
                { step: '03', title: 'Flawless In-House Weaving', desc: 'Our entire production process — from designing to weaving — is carried out in-house, leaving no scope for compromise.' }
              ].map((proc, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  className="relative space-y-4 border-t border-[#D1C7C7] pt-6 cursor-default transition-colors hover:border-[#7A1C1C]"
                >
                  <span className="text-4xl font-serif font-bold text-[#7A1C1C] block">{proc.step}</span>
                  <h3 className="text-xl font-serif font-bold text-[#2B1818]">{proc.title}</h3>
                  <p className="text-[#6E5E5D] text-sm font-light leading-relaxed">{proc.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. INDUSTRIES SERVED */}
        <section className="py-20 bg-[#FFFFFF] px-6 max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#A39292] mb-12"
          >
            Presenting Textile Masterworks Internationally
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center"
          >
            {[
              { icon: <Building2 className="w-5 h-5 text-[#7A1C1C]" />, text: 'Global Export Markets' },
              { icon: <Building2 className="w-5 h-5 text-[#7A1C1C]" />, text: 'Residential Layouts' },
              { icon: <Building2 className="w-5 h-5 text-[#7A1C1C]" />, text: 'Custom Showrooms' },
              { icon: <Building2 className="w-5 h-5 text-[#7A1C1C]" />, text: 'Bespoke Collaborations' }
            ].map((industry, i) => (
              <motion.div 
                key={i}
                variants={scaleIn}
                whileHover={{ scale: 1.03, color: "#7A1C1C" }}
                className="flex items-center gap-2 font-serif font-bold text-lg text-[#2B1818] transition-colors cursor-default"
              >
                {industry.icon} {industry.text}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 7. CUSTOMER TESTIMONIALS */}
        <section className="py-24 bg-[#FAF6F6] px-6 overflow-hidden border-t border-b border-[#EBE3E3]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Quote className="w-10 h-10 text-[#7A1C1C] mx-auto mb-6 opacity-30" />
            <p className="text-xl md:text-2xl font-serif italic text-[#2B1818] leading-relaxed mb-8 font-medium">
              "Abdul Rahman Carpets goes beyond expectations, blending time-honored weaving traditions with modern excellence to ensure every client is truly satisfied."
            </p>
            <div>
              <h4 className="font-bold tracking-wide text-[#2B1818]">Global Sourcing Representative</h4>
              <p className="text-xs text-[#A39292] uppercase tracking-widest mt-1 font-semibold">International Textile Network</p>
            </div>
          </motion.div>
        </section>

        {/* 8. GALLERY PREVIEW */}
        <section className="py-24 max-w-7xl mx-auto bg-[#FFFFFF] px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
          >
            <div>
              <span className="text-[#7A1C1C] uppercase tracking-widest text-xs font-bold inline-block mb-2">Exquisite Handcraft</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2B1818]">Gallery Specimen Preview</h2>
            </div>
            <p className="text-[#6E5E5D] font-light text-sm max-w-md md:text-right">
              A curated look into our premium textures, intricate border styles, and signature contemporary weaving finishes.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]"
          >
            {[
              {
                src: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
                title: "Vintage Medallion",
                tag: "Classic Woolen",
                gridSpan: "md:col-span-2 md:row-span-2"
              },
              {
                src: "https://images.unsplash.com/photo-1576016770956-debb63d900bb?auto=format&fit=crop&q=80&w=800",
                title: "Minimalist Linens",
                tag: "Modern Organic",
                gridSpan: "md:col-span-2 md:row-span-1"
              },
              {
                src: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&q=80&w=800",
                title: "Lustrous Surface Sheen",
                tag: "Premium Viscose",
                gridSpan: "md:col-span-1 md:row-span-1"
              },
              {
                src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
                title: "Earth-Toned Textures",
                tag: "Natural Cotton",
                gridSpan: "md:col-span-1 md:row-span-2"
              },
              {
                src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800",
                title: "Bhadohi Heritage Borders",
                tag: "Artisan Antique",
                gridSpan: "md:col-span-2 md:row-span-1"
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className={`relative ${item.gridSpan} bg-[#FAF6F6] overflow-hidden group cursor-pointer rounded-xl shadow-sm border border-[#EBE3E3]`}
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1212]/70 via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-4 left-4 bg-white shadow-sm px-2.5 py-1 rounded-md text-[10px] tracking-wider text-[#7A1C1C] uppercase font-bold border border-[#EBE3E3]">
                  {item.tag}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                  <h3 className="font-serif text-lg text-white mb-1 font-bold">
                    {item.title}
                  </h3>
                  <div className="h-0 group-hover:h-5 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-300 flex items-center gap-1 text-xs text-[#EFA8A8] font-bold">
                    View Specimen Detail <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 9. FINAL CALL TO ACTION */}
        <section id="quote" className="bg-[#FAF6F6] text-[#2B1818] py-24 px-6 text-center border-t border-[#EBE3E3] relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto space-y-8 relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-wide leading-tight text-[#2B1818]">
              Transform Your Vision into a <br />
              <span className="text-[#7A1C1C] italic font-normal">Beautifully Crafted Reality</span>
            </h2>
            <p className="text-[#6E5E5D] font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Connect with our team to explore design options or request a direct price quote from Bhadohi.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/your-number" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#7A1C1C] hover:bg-[#611313] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                <MessageSquare className="w-5 h-5" /> Contact on WhatsApp
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:info@abdulrahmancarpets.com?subject=Quote Request" 
                className="bg-[#2B1818] hover:bg-[#1F1212] text-white font-medium px-8 py-3.5 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                <FileText className="w-5 h-5" /> Email Quote Request
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}