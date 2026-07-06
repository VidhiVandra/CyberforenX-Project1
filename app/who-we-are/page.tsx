"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ChevronRight, 
  Target, 
  Eye, 
  Compass, 
  ShieldCheck, 
  HeartHandshake, 
  Lightbulb, 
  Layers, 
  ArrowDown,
  Phone
} from 'lucide-react';

import Navbar from '@/components/mostused/Navbar';
import Footer from '@/components/mostused/Footer';

// Import the custom CSS file we just created
import './who-we-are.css';

// --- ANIMATION VARIANTS ---
const slideIn = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

import { useTheme } from '@/components/ThemeProvider';

export default function WhoWeArePremium() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScrollY, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScrollY, [0, 1], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string): void => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="wa-page">
      <Navbar isScrolled={isScrolled} theme={theme} setTheme={setTheme} scrollToSection={scrollToSection} />

      <main>
        {/* 1. HERO SECTION */}
        <section ref={heroRef} className="wa-hero">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="wa-hero-bg">
            <div className="wa-hero-overlay-dark"></div>
            <div className="wa-hero-overlay-grad"></div>
            <img src="/Carpet_04.jpg" alt="Premium Hand-knotted Carpet" className="wa-hero-img" />
          </motion.div>

          <div className="wa-hero-content">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
              className="wa-hero-tagline"
            >
              The Legacy of Excellence
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="wa-hero-title"
            >
              Mastering The Art <br/> 
              <span className="wa-hero-title-gradient">Of Textiles</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="wa-hero-desc"
            >
              Abdul Rahman Carpets is a premier design collective dedicated to creating exceptional, hand-knotted luxury rugs that transform architectural spaces into timeless masterpieces.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="wa-scroll-indicator"
          >
            <span className="wa-scroll-text">Scroll Discover</span>
            <ArrowDown size={16} color="rgba(255,255,255,0.8)" />
          </motion.div>
        </section>

        {/* 2. COMPANY HISTORY & MILESTONES */}
        <section className="wa-section">
          <div className="wa-container">
            <div className="wa-grid-history">
              
              <div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideIn}>
                  <div className="wa-history-label">
                    <div className="wa-history-line"></div>
                    <span className="wa-history-tag">Our History</span>
                  </div>
                  <h2 className="wa-history-title">
                    A Legacy Forged <br/> Over Decades.
                  </h2>
                  <p className="wa-history-text">
                    Established in 1989 in the heartland of Bhadohi, India's &ldquo;Carpet City&rdquo;, we began with a singular promise: to preserve the delicate art of traditional hand-knotting while integrating contemporary high-end design architectures.
                  </p>
                  <p className="wa-history-text">
                    By working directly with generational artisans, we have evolved into a trusted global production house for the world's most prestigious architectural studios.
                  </p>
                </motion.div>
              </div>

              <div>
                <motion.div 
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                  className="wa-stats-grid"
                >
                  <motion.div variants={slideIn} className="wa-stat-card">
                    <div className="wa-stat-value">1989</div>
                    <div className="wa-stat-label">Founded</div>
                  </motion.div>
                  
                  <motion.div variants={slideIn} className="wa-stat-card wa-stat-offset">
                    <div className="wa-stat-value">40k+</div>
                    <div className="wa-stat-label">Global Artisans</div>
                  </motion.div>
                  
                  <motion.div variants={slideIn} className="wa-stat-card">
                    <div className="wa-stat-value">100%</div>
                    <div className="wa-stat-label">In-House Weaving</div>
                  </motion.div>
                  
                  <motion.div variants={slideIn} className="wa-stat-card wa-stat-offset">
                    <div className="wa-stat-value">#1</div>
                    <div className="wa-stat-label">Bespoke Layouts</div>
                  </motion.div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. ETHOS (Mission, Vision, Philosophy) */}
        <section className="wa-section wa-section-secondary ethos-redesign-section">
          <div className="wa-ethos-bg">
            <img src="/Carpet_02.jpg" alt="Texture Background" className="wa-ethos-bg-image" />
            <div className="wa-ethos-bg-overlay"></div>
          </div>
          
          <div className="wa-container" style={{ position: 'relative', zIndex: 10 }}>
            <div className="ethos-header-wrapper">
              <div className="ethos-title-col">
                <span className="wa-history-tag">Core Principles</span>
                <h2 className="wa-history-title ethos-main-title">Our Triad of Purpose</h2>
              </div>
              <p className="ethos-subtitle-col">
                How we define our operational footprint, creative aspirations, and commitments to the design community worldwide.
              </p>
            </div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }} 
              variants={staggerContainer}
              className="wa-ethos-grid-modern"
            >
              {/* Mission */}
              <motion.div 
                variants={slideIn} 
                whileHover={{ y: -8 }}
                className="wa-ethos-card-modern"
              >
                <div className="card-top-accent"></div>
                <div className="wa-ethos-icon-wrapper">
                  <Target size={36} strokeWidth={1.5} className="wa-ethos-icon-animated target-pulse" />
                </div>
                <span className="ethos-badge-num">01 / Focus</span>
                <h3 className="wa-ethos-title">Mission</h3>
                <p className="wa-ethos-desc">
                  To supply global design landscapes with ethically conscious luxury floor variants that honor authentic weaving craft while preserving structural resilience and durability.
                </p>
                <div className="ethos-card-glow"></div>
              </motion.div>

              {/* Vision */}
              <motion.div 
                variants={slideIn} 
                whileHover={{ y: -8 }}
                className="wa-ethos-card-modern"
              >
                <div className="card-top-accent"></div>
                <div className="wa-ethos-icon-wrapper">
                  <Eye size={36} strokeWidth={1.5} className="wa-ethos-icon-animated eye-blink" />
                </div>
                <span className="ethos-badge-num">02 / Future</span>
                <h3 className="wa-ethos-title">Vision</h3>
                <p className="wa-ethos-desc">
                  To become the ultimate worldwide benchmark destination for custom textile art, where master architectural spaces effortlessly mesh with historical craftsmanship loops.
                </p>
                <div className="ethos-card-glow"></div>
              </motion.div>

              {/* Philosophy */}
              <motion.div 
                variants={slideIn} 
                whileHover={{ y: -8 }}
                className="wa-ethos-card-modern"
              >
                <div className="card-top-accent"></div>
                <div className="wa-ethos-icon-wrapper">
                  <Compass size={36} strokeWidth={1.5} className="wa-ethos-icon-animated compass-spin" />
                </div>
                <span className="ethos-badge-num">03 / Path</span>
                <h3 className="wa-ethos-title">Philosophy</h3>
                <p className="wa-ethos-desc">
                  Real premium luxury demands absolute operational patience, strict material selection, and direct communication lines. Our structures only shine if our core community thrives.
                </p>
                <div className="ethos-card-glow"></div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 4. CORE VALUES & MANUFACTURING EXPERTISE */}
        <section className="wa-section">
          <div className="wa-container">
            <div className="wa-split-grid-modern">
              
              {/* Left Side: Core Values */}
              <div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideIn}>
                  <div className="wa-values-header">
                    <span className="wa-history-tag" style={{ marginBottom: '1rem', display: 'block' }}>The Foundation</span>
                    <h2 className="wa-history-title" style={{ marginBottom: 0 }}>Our Core Values</h2>
                  </div>
                  
                  <div className="values-asymmetric-ledger">
                    {[
                      { index: 'I', icon: <ShieldCheck size={22} className="ledger-icon" />, title: 'Artisanal Preservation', text: 'Protecting time-honored hand-knotting configurations from low-tier machine replacement layers.' },
                      { index: 'II', icon: <Layers size={22} className="ledger-icon" />, title: 'Uncompromising Standards', text: 'Enforcing strict quality checks across raw woolen blends, viscose formations, and density loops.' },
                      { index: 'III', icon: <Lightbulb size={22} className="ledger-icon" />, title: 'Design Evolution', text: 'Adapting traditional Bhadohi motifs into minimalist, highly contemporary interior architectures.' },
                      { index: 'IV', icon: <HeartHandshake size={22} className="ledger-icon" />, title: 'Absolute Integrity', text: 'Maintaining clear, transparent product parameters and real-time client setup updates.' }
                    ].map((val, idx) => (
                      <div key={idx} className="value-ledger-item">
                        <div className="ledger-index-wrapper">
                          <span>{val.index}</span>
                          <div className="ledger-accent-bar"></div>
                        </div>
                        <div className="ledger-content-wrap">
                          <div className="ledger-title-row">
                            {val.icon}
                            <h4 className="ledger-title">{val.title}</h4>
                          </div>
                          <p className="ledger-desc">{val.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Manufacturing Excellence */}
              <div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideIn} className="wa-blueprint-canvas">
                  <Compass className="blueprint-crosshair" size={32} strokeWidth={1} />
                  
                  <div className="blueprint-header">
                    <span className="wa-history-tag" style={{ marginBottom: '0.75rem', display: 'block' }}>The Process</span>
                    <h3 className="wa-ethos-title" style={{ fontSize: '1.85rem', marginBottom: 0 }}>Manufacturing Expertise</h3>
                    <p className="wa-ethos-desc" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>Our vertically integrated operations eliminate synthetic fillers and ensure authentic surface treatments.</p>
                  </div>
                  
                  <div className="blueprint-timeline">
                    <div className="blueprint-timeline-line"></div>
                    {[
                      { step: '01', title: 'Design & Engineering', desc: 'Bespoke customization matched to architectural blueprints.' },
                      { step: '02', title: 'Material Sourcing', desc: 'Premium Woolen, Cotton, and high-lustre Viscose yarn.' },
                      { step: '03', title: 'Manufacturing', desc: 'Authentic clean-water washes to safely lock pattern contrast.' },
                      { step: '04', title: 'Distribution', desc: 'Direct logistics avoiding middle-man friction.' }
                    ].map((item, idx) => (
                      <div key={idx} className="blueprint-step">
                        <div className="blueprint-marker">{item.step}</div>
                        <div className="blueprint-step-info">
                          <h4 className="blueprint-step-title">{item.title}</h4>
                          <p className="blueprint-step-desc">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. IMAGE GALLERY */}
        <section className="wa-section wa-section-secondary">
          <div className="wa-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideIn} className="wa-gallery-header">
              <span className="wa-history-tag" style={{ marginBottom: '1rem', display: 'block' }}>Atelier Showcase</span>
              <h2 className="wa-history-title" style={{ marginBottom: 0 }}>Visualizing Perfection</h2>
            </motion.div>
            
            <div className="wa-gallery-grid">
              {/* Featured Large Image */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideIn} className="wa-gallery-item wa-gallery-large">
                <img src="/Carpet_05.jpg" alt="Gallery 1" />
                <div className="wa-gallery-content">
                  <div>
                    <div className="wa-gallery-tag">Specimen 01</div>
                    <h4 className="wa-gallery-title">Custom Dimensional Architecture</h4>
                  </div>
                </div>
              </motion.div>

              {/* Smaller Images */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideIn} className="wa-gallery-item wa-gallery-small">
                <img src="/Carpet_06.jpg" alt="Gallery 2" />
                <div className="wa-gallery-overlay"></div>
              </motion.div>
              
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideIn} className="wa-gallery-item wa-gallery-small">
                <img src="/Carpet_07.jpg" alt="Gallery 3" />
                <div className="wa-gallery-overlay"></div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideIn} className="wa-gallery-item wa-gallery-wide">
                <img src="/Carpet_08.jpg" alt="Gallery 4" />
                <div className="wa-gallery-overlay"></div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideIn} className="wa-gallery-item wa-gallery-wide">
                <img src="/Carpet_09.jpg" alt="Gallery 5" />
                <div className="wa-gallery-overlay"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. CUSTOMER COMMITMENT (CTA) */}
        <section className="wa-cta-section">
          <div className="wa-cta-glow"></div>
          
          <div className="wa-container-narrow" style={{ position: 'relative', zIndex: 10 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideIn}>
              <span className="wa-cta-tag">Our Promise</span>
              <h2 className="wa-cta-title">Unwavering Commitment</h2>
              <p className="wa-cta-desc">
                Investing in custom design carpets is a lifelong decision. We assure absolute geometric precision from architectural blueprint matching down to terminal cross-border tracking logistics.
              </p>
              
              <div className="wa-cta-actions">
                <Link href="/products/all" className="wa-btn-primary group">
                  Explore Services
                  <ChevronRight size={16} />
                </Link>
                <Link href="/contact" className="wa-btn-outline">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}