"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    available: false,
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
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};
const maskReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: { 
    y: "0%", 
    opacity: 1, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function CollectionPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  
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
    switch(sortOption) {
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

      <main className="col-main">
        <div className="col-container">
          
          {/* HERO SECTION */}
          <section className="col-hero">
            <motion.span initial="hidden" animate="visible" variants={scaleIn} className="col-hero-tag">
              Masterpieces
            </motion.span>
            <h1 className="col-hero-title">
              <span className="overflow-hidden block pb-2">
                <motion.span initial="hidden" animate="visible" variants={maskReveal} className="block">Our Exclusive</motion.span>
              </span>
              <span className="overflow-hidden block pb-2">
                <motion.span initial="hidden" animate="visible" variants={maskReveal} transition={{ delay: 0.1 }} className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-pure)] to-[var(--accent-solid)]">
                  Collections
                </motion.span>
              </span>
            </h1>
            <motion.p initial="hidden" animate="visible" variants={scaleIn} transition={{ delay: 0.2 }} className="col-hero-desc">
              Explore our curated archive of hand-knotted and hand-tufted textiles. Filter by material, style, and color to find the perfect anchor for your architectural space.
            </motion.p>
          </section>

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
                          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs font-mono uppercase tracking-widest py-1 px-3 rounded-full">
                            Out of Stock
                          </div>
                        )}
                        
                        {/* Hover Overlay */}
                        <div className="col-card-overlay">
                          <button onClick={() => setSelectedProduct(product)} className="col-action-btn">
                            <Maximize2 size={16} /> View Details
                          </button>
                          <a href={`https://wa.me/919876543210?text=I'm interested in ${product.name} (${product.size})`} target="_blank" rel="noopener noreferrer" className="col-action-btn col-action-btn-wa">
                            <MessageCircle size={16} /> WhatsApp Inquiry
                          </a>
                          <button className="col-action-btn">
                            <FileText size={16} /> Request Quote
                          </button>
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
                  <a href={`https://wa.me/919876543210?text=I'm interested in ${selectedProduct.name} (${selectedProduct.size})`} target="_blank" rel="noopener noreferrer" className="col-modal-btn col-modal-btn-wa">
                    <MessageCircle size={20} /> Inquire via WhatsApp
                  </a>
                  <button className="col-modal-btn col-modal-btn-primary">
                    <FileText size={20} /> Request Formal Quote
                  </button>
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
