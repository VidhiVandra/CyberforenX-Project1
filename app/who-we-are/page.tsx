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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function WhoWeArePremium() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScrollY, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScrollY, [0, 1], [1, 0]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
              initial={{ opacity: 0, tracking: "0em" }}
              animate={{ opacity: 1, tracking: "0.2em" }}
              transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
              className="wa-hero-tagline"
            >
              The Legacy of Excellence
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
        <section className="wa-section wa-section-secondary">
          <div className="wa-ethos-bg">
            <img src="/Carpet_02.jpg" alt="Texture Background" />
          </div>
          
          <div className="wa-container" style={{ position: 'relative', zIndex: 10 }}>
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="wa-ethos-grid"
            >
              {/* Mission */}
              <motion.div variants={slideIn} className="wa-ethos-card">
                <Target size={32} strokeWidth={1.5} className="wa-ethos-icon" />
                <h3 className="wa-ethos-title">Mission</h3>
                <p className="wa-ethos-desc">
                  To supply global design landscapes with ethically conscious luxury floor variants that honor authentic weaving craft while preserving structural resilience and durability.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div variants={slideIn} className="wa-ethos-card">
                <Eye size={32} strokeWidth={1.5} className="wa-ethos-icon" />
                <h3 className="wa-ethos-title">Vision</h3>
                <p className="wa-ethos-desc">
                  To become the ultimate worldwide benchmark destination for custom textile art, where master architectural spaces effortlessly mesh with historical craftsmanship loops.
                </p>
              </motion.div>

              {/* Philosophy */}
              <motion.div variants={slideIn} className="wa-ethos-card">
                <Compass size={32} strokeWidth={1.5} className="wa-ethos-icon" />
                <h3 className="wa-ethos-title">Philosophy</h3>
                <p className="wa-ethos-desc">
                  Real premium luxury demands absolute operational patience, strict material selection, and direct communication lines. Our structures only shine if our core community thrives.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 4. CORE VALUES & MANUFACTURING EXPERTISE */}
        <section className="wa-section">
          <div className="wa-container">
            <div className="wa-split-grid">
              
              {/* Left Side: Core Values */}
              <div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideIn}>
                  <div className="wa-values-header">
                    <span className="wa-history-tag" style={{ marginBottom: '1rem', display: 'block' }}>The Foundation</span>
                    <h2 className="wa-history-title" style={{ marginBottom: 0 }}>Our Core Values</h2>
                  </div>
                  
                  <div className="wa-values-list">
                    {[
                      { icon: <ShieldCheck size={24}/>, title: 'Artisanal Preservation', text: 'Protecting time-honored hand-knotting configurations from low-tier machine replacement layers.' },
                      { icon: <Layers size={24}/>, title: 'Uncompromising Standards', text: 'Enforcing strict quality checks across raw woolen blends, viscose formations, and density loops.' },
                      { icon: <Lightbulb size={24}/>, title: 'Design Evolution', text: 'Adapting traditional Bhadohi motifs into minimalist, highly contemporary interior architectures.' },
                      { icon: <HeartHandshake size={24}/>, title: 'Absolute Integrity', text: 'Maintaining clear, transparent product parameters and real-time client setup updates.' }
                    ].map((val, idx) => (
                      <div key={idx} className="wa-value-item">
                        <div className="wa-value-icon">{val.icon}</div>
                        <div>
                          <h4 className="wa-value-title">{val.title}</h4>
                          <p className="wa-value-desc">{val.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Manufacturing Excellence */}
              <div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideIn} className="wa-process-card">
                  <div className="wa-process-bg-glow"></div>
                  
                  <div className="wa-process-header">
                    <span className="wa-history-tag" style={{ marginBottom: '1rem', display: 'block' }}>The Process</span>
                    <h2 className="wa-ethos-title" style={{ fontSize: '1.875rem' }}>Manufacturing Expertise</h2>
                    <p className="wa-ethos-desc" style={{ marginTop: '0.5rem' }}>Our vertically integrated operations eliminate synthetic fillers and ensure authentic surface treatments.</p>
                  </div>
                  
                  <div className="wa-process-list">
                    {[
                      { step: '01', title: 'Design & Engineering', desc: 'Bespoke customization matched to architectural blueprints.' },
                      { step: '02', title: 'Material Sourcing', desc: 'Premium Woolen, Cotton, and high-lustre Viscose yarn.' },
                      { step: '03', title: 'Manufacturing', desc: 'Authentic clean-water washes to safely lock pattern contrast.' },
                      { step: '04', title: 'Distribution', desc: 'Direct logistics avoiding middle-man friction.' }
                    ].map((item, idx) => (
                      <div key={idx} className="wa-process-item">
                        <div className="wa-process-badge">{item.step}</div>
                        <div className="wa-process-text-wrap">
                          <h4 className="wa-process-title">{item.title}</h4>
                          <p className="wa-process-desc">{item.desc}</p>
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

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/your-number" 
        target="_blank" 
        rel="noopener noreferrer"
        className="wa-whatsapp group"
        aria-label="Contact on WhatsApp"
      >
        <div className="wa-whatsapp-pulse"></div>
        <Phone size={24} fill="currentColor" stroke="none" />
      </a>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}