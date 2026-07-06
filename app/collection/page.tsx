"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Search,
  Filter,
  ChevronDown,
  X,
  MessageCircle,
  FileText,
  Maximize2,
  Box,
  Ruler
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/components/mostused/Navbar';
import Footer from '@/components/mostused/Footer';
import './collection.css';

// --- DUMMY DATA ---
const products = [
  {
    id: 1,
    name: "Persian Royal Blue",
    collection: "Heritage",
    material: "Wool & Silk",
    size: "8' x 10'",
    desc: "A masterful blend of traditional motifs, hand-knotted over 6 months to create an heirloom quality piece with deep sapphire tones.",
    type: "Hand-Knotted",
    style: "Traditional",
    shape: "Rectangle",
    color: "Blue",
    available: true,
    image: "/Carpet_01.jpg"
  },
  {
    id: 2,
    name: "Modernist Charcoal",
    collection: "Urban",
    material: "Bamboo Silk",
    size: "9' x 12'",
    desc: "Minimalist geometric abstraction intersecting with deep charcoal and ash tones. Perfect for contemporary architectural spaces.",
    type: "Hand-Tufted",
    style: "Modern",
    shape: "Rectangle",
    color: "Grey",
    available: true,
    image: "/Carpet_02.jpg"
  },
  {
    id: 3,
    name: "Oasis Ivory Circle",
    collection: "Ethereal",
    material: "Pure Silk",
    size: "8' Diameter",
    desc: "A luminous, pure silk circular rug that shimmers under varying light conditions, creating a soft focal point.",
    type: "Hand-Knotted",
    style: "Transitional",
    shape: "Round",
    color: "White",
    available: true,
    image: "/Carpet_03.jpg"
  },
  {
    id: 4,
    name: "Crimson Medallion",
    collection: "Heritage",
    material: "Wool",
    size: "10' x 14'",
    desc: "A deeply saturated crimson foundation supporting an intricate central medallion, woven using centuries-old techniques.",
    type: "Hand-Knotted",
    style: "Traditional",
    shape: "Rectangle",
    color: "Red",
    available: true,
    image: "/Carpet_04.jpg"
  },
  {
    id: 5,
    name: "Sahara Runner",
    collection: "Nomad",
    material: "Jute & Wool",
    size: "2.5' x 12'",
    desc: "Textured, organic and resilient. Designed specifically for high-traffic gallery spaces and long corridors.",
    type: "Flatweave",
    style: "Bohemian",
    shape: "Runner",
    color: "Beige",
    available: true,
    image: "/Carpet_05.jpg"
  },
  {
    id: 6,
    name: "Emerald Prism",
    collection: "Urban",
    material: "Wool & Viscose",
    size: "6' x 9'",
    desc: "Vibrant emerald greens cut by sharp, multi-dimensional geometric shading.",
    type: "Hand-Tufted",
    style: "Modern",
    shape: "Rectangle",
    color: "Green",
    available: true,
    image: "/Carpet_06.jpg"
  }
];

// --- ANIMATION VARIANTS ---
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};
const maskReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const }
  }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};

import { useTheme } from '@/components/ThemeProvider';

export default function CollectionPage() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [nextBgIndex, setNextBgIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(heroScrollY, [0, 1], ["0%", "30%"]);
  const backgroundOpacity = useTransform(heroScrollY, [0, 1], [1, 0.3]);

  const heroBgs = [
    '/Carpet_02.jpg',
    '/Carpet_04.jpg',
    '/Carpet_06.jpg',
    '/Carpet_08.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIdx = (currentBgIndex + 1) % heroBgs.length;
      setNextBgIndex(nextIdx);
      setIsTransitioning(true);

      const animTimer = setTimeout(() => {
        setCurrentBgIndex(nextIdx);
        setIsTransitioning(false);
      }, 1400);

      return () => clearTimeout(animTimer);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentBgIndex, heroBgs.length]);

  // Filtering & Sorting State
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [filters, setFilters] = useState<{ [key: string]: string[] }>({
    collection: [],
    material: [],
    style: [],
    shape: [],
    color: []
  });

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

  const toggleFilter = (category: string, value: string) => {
    setFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  // Extract unique options dynamically from data
  const filterOptions = {
    collection: Array.from(new Set(products.map(p => p.collection))),
    material: Array.from(new Set(products.map(p => p.material))),
    style: Array.from(new Set(products.map(p => p.style))),
    shape: Array.from(new Set(products.map(p => p.shape))),
    color: Array.from(new Set(products.map(p => p.color))),
  };

  // Filter & Sort Logic
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
      );
    }

    // Filters
    Object.keys(filters).forEach(category => {
      const selectedValues = filters[category];
      if (selectedValues.length > 0) {
        result = result.filter(p => selectedValues.includes(p[category as keyof typeof p] as string));
      }
    });

    // Sorting
    switch (sortOption) {
      case "alphabetical":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      // Note: 'latest', 'popular', 'featured' would normally rely on backend data.
      // For now, we'll just reverse for 'popular' to show a difference.
      case "popular":
        result.reverse();
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, filters, sortOption]);

  return (
    <div className="col-page">
      <div className="col-ambient-1"></div>

      <Navbar isScrolled={isScrolled} theme={theme} setTheme={setTheme} scrollToSection={scrollToSection} />

      <main className="col-main" style={{ paddingTop: 0 }}>
        {/* HERO SECTION */}
        <section ref={heroRef} className="col-hero" style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '9.5rem 5% 5rem 5%',
          marginBottom: '4rem',
          background: 'var(--bg-secondary)',
          width: '100%',
          textAlign: 'center'
        }}>
          {/* Background Slideshow Layer */}
          <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', y: backgroundY, opacity: backgroundOpacity }}>

            {/* Underneath current active background */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${heroBgs[currentBgIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: theme === 'light' ? 0.55 : 0.75,
                transition: 'opacity 0.6s ease',
              }}
            />

            {/* Rolling strips on top during transition */}
            {isTransitioning && Array.from({ length: 6 }).map((_, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: `${i * 16.666}%`,
                    height: '16.667%',
                    left: isEven ? 0 : 'auto',
                    right: isEven ? 'auto' : 0,
                    overflow: 'hidden',
                    zIndex: 2,
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  exit={{ width: '0%' }}
                  transition={{
                    duration: 1.0,
                    ease: [0.25, 1, 0.5, 1], // Smooth roll ease
                    delay: i * 0.04,
                  }}
                >
                  {/* Seamless inner background slice */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '100vw', // Use viewport width to keep horizontal background size fixed
                      height: '600%', // 6 times the slice height
                      top: `-${i * 100}%`,
                      left: isEven ? 0 : 'auto',
                      right: isEven ? 'auto' : 0,
                      backgroundImage: `url(${heroBgs[nextBgIndex]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: theme === 'light' ? 0.55 : 0.75,
                    }}
                  />

                  {/* Cylinder roll indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      width: '8px',
                      left: isEven ? 'auto' : 0,
                      right: isEven ? 0 : 'auto',
                      background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.2) 70%, rgba(0,0,0,0.5) 100%)',
                      boxShadow: isEven
                        ? '-2px 0 6px rgba(0,0,0,0.5)'
                        : '2px 0 6px rgba(0,0,0,0.5)',
                      zIndex: 3,
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Dark Mask Overlay for Premium Readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, var(--bg-page) 100%)',
              zIndex: 1,
            }} />
          </motion.div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.span initial="hidden" animate="visible" variants={scaleIn} className="col-hero-tag" style={{ background: 'rgba(0, 0, 0, 0.4)', color: '#ffffff', backdropFilter: 'blur(8px)', borderColor: 'var(--accent-solid)' }}>
              Masterpieces
            </motion.span>
            <h1 className="col-hero-title">
              <span className="overflow-hidden block pb-2">
                <motion.span initial="hidden" animate="visible" variants={maskReveal} className="block" style={{ color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Our Exclusive</motion.span>
              </span>
              <span className="overflow-hidden block pb-2">
                <motion.span initial="hidden" animate="visible" variants={maskReveal} transition={{ delay: 0.1 }} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[var(--accent-solid)]" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  Collections
                </motion.span>
              </span>
            </h1>
            <motion.p initial="hidden" animate="visible" variants={scaleIn} transition={{ delay: 0.2 }} className="col-hero-desc" style={{ color: '#eaeaea', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              Explore our curated archive of hand-knotted and hand-tufted textiles. Filter by material, style, and color to find the perfect anchor for your architectural space.
            </motion.p>
          </div>
        </section>

        <div className="col-container">

          {/* MAIN LAYOUT */}
          <div className="col-layout">

            {/* MOBILE FILTER BUTTON */}
            <button className="col-mobile-filter-btn" onClick={() => setShowMobileFilters(!showMobileFilters)}>
              <Filter size={18} /> {showMobileFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {/* SIDEBAR (FILTERS) */}
            <aside className={`col-sidebar ${showMobileFilters ? '!block' : ''}`}>
              {Object.entries(filterOptions).map(([category, options]) => (
                <div key={category} className="col-filter-group">
                  <h3 className="col-filter-title">{category}</h3>
                  <div className="col-filter-list">
                    {options.map(option => (
                      <label key={option} className="col-filter-label">
                        <input
                          type="checkbox"
                          className="col-filter-checkbox"
                          checked={filters[category].includes(option)}
                          onChange={() => toggleFilter(category, option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </aside>

            {/* CONTENT AREA */}
            <div className="col-content">

              {/* TOP BAR */}
              <div className="col-topbar">
                <div className="col-search">
                  <Search size={18} className="col-search-icon" />
                  <input
                    type="text"
                    placeholder="Search by name, material..."
                    className="col-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="col-sort">
                  <span className="col-sort-label">Sort by:</span>
                  <select className="col-sort-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="latest">Latest Arrivals</option>
                    <option value="featured">Featured</option>
                    <option value="popular">Most Popular</option>
                    <option value="alphabetical">Alphabetical (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* PRODUCT GRID */}
              {processedProducts.length > 0 ? (
                <motion.div
                  className="col-grid"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  key={processedProducts.length} // re-trigger animation on change
                >
                  {processedProducts.map(product => (
                    <motion.div key={product.id} variants={cardVariant} className="col-card group">

                      {/* Image Wrap */}
                      <div className="col-card-img-wrap">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="col-card-img"
                        />
                        {!product.available && (
                          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs font-mono uppercase tracking-widest py-1 px-3 rounded-full z-10">
                            Out of Stock
                          </div>
                        )}
                        {product.available && (
                          <div className="absolute top-4 left-4 bg-emerald-950/90 border border-emerald-500/30 backdrop-blur-md text-emerald-400 text-[10px] font-mono uppercase tracking-widest py-1.5 px-3.5 rounded-full flex items-center gap-1.5 z-10">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse" style={{ backgroundColor: '#10b981' }}></span>
                            Available
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="col-card-overlay">
                          <button onClick={() => setSelectedProduct(product)} className="col-action-btn">
                            <Maximize2 size={16} /> View Details
                          </button>
                          <a href={`https://wa.me/919321366585?text=I'm interested in ${product.name} (${product.size})`} target="_blank" rel="noopener noreferrer" className="col-action-btn col-action-btn-wa">
                            <MessageCircle size={16} /> WhatsApp Inquiry
                          </a>
                          <a
                            href={`mailto:info@abdulrahmancarpets.com?subject=Quote%20Request%20for%20${encodeURIComponent(product.name)}&body=I%20would%20like%20to%20request%20a%20price%20quotation%20for%20the%20${encodeURIComponent(product.name)}%20carpet%20size%20${encodeURIComponent(product.size)}.`}
                            className="col-action-btn"
                          >
                            <FileText size={16} /> Request Quote
                          </a>
                        </div>
                      </div>

                      {/* Info Wrap */}
                      <div className="col-card-info">
                        <span className="col-card-collection">{product.collection} Collection</span>
                        <h3 className="col-card-title">{product.name}</h3>
                        <p className="col-card-desc">{product.desc}</p>

                        <div className="col-card-meta">
                          <div className="col-card-meta-item">
                            <Box size={14} /> {product.material}
                          </div>
                          <div className="col-card-meta-item">
                            <Ruler size={14} /> {product.size}
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-empty">
                  <Search size={48} className="col-empty-icon" />
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-[var(--text-muted)]">Try adjusting your search or filters to find what you're looking for.</p>
                  <button
                    onClick={() => { setSearchQuery(""); setFilters({ collection: [], material: [], style: [], shape: [], color: [] }); }}
                    className="mt-6 px-6 py-2 bg-[var(--accent-solid)] text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer scrollToSection={scrollToSection} />

      {/* PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-modal-overlay"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="col-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="col-modal-close" onClick={() => setSelectedProduct(null)}>
                <X size={20} />
              </button>

              <div className="col-modal-img-wrap">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="col-modal-content">
                <span className="col-modal-collection">{selectedProduct.collection} Collection</span>
                <h2 className="col-modal-title">{selectedProduct.name}</h2>
                <p className="col-modal-desc">{selectedProduct.desc}</p>

                <div className="col-modal-meta-grid">
                  <div className="col-modal-meta-item">
                    <span className="col-modal-meta-label">Material</span>
                    <span className="col-modal-meta-value">{selectedProduct.material}</span>
                  </div>
                  <div className="col-modal-meta-item">
                    <span className="col-modal-meta-label">Size</span>
                    <span className="col-modal-meta-value">{selectedProduct.size}</span>
                  </div>
                  <div className="col-modal-meta-item">
                    <span className="col-modal-meta-label">Style</span>
                    <span className="col-modal-meta-value">{selectedProduct.style}</span>
                  </div>
                  <div className="col-modal-meta-item">
                    <span className="col-modal-meta-label">Carpet Type</span>
                    <span className="col-modal-meta-value">{selectedProduct.type}</span>
                  </div>
                </div>

                <div className="col-modal-actions">
                  <a href={`https://wa.me/919321366585?text=I'm interested in ${selectedProduct.name} (${selectedProduct.size})`} target="_blank" rel="noopener noreferrer" className="col-modal-btn col-modal-btn-wa">
                    <MessageCircle size={20} /> Inquire via WhatsApp
                  </a>
                  <a
                    href={`mailto:info@abdulrahmancarpets.com?subject=Quote%20Request%20for%20${encodeURIComponent(selectedProduct.name)}&body=I%20would%20like%20to%20request%20a%20price%20quotation%20for%20the%20${encodeURIComponent(selectedProduct.name)}%20carpet%20size%20${encodeURIComponent(selectedProduct.size)}.`}
                    className="col-modal-btn col-modal-btn-primary"
                    style={{ textDecoration: 'none' }}
                  >
                    <FileText size={20} /> Request Formal Quote
                  </a>
                  <button onClick={() => setSelectedProduct(null)} className="col-modal-btn col-modal-btn-close">
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
