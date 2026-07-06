"use client";

import React, { useState, useEffect, use, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, MessageCircle, FileText, X, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';

import Navbar from '@/components/mostused/Navbar';
import Footer from '@/components/mostused/Footer';
import { getProduct, getCategory, getRelatedProducts } from '../../data';
import '../../products.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

import { useTheme } from '@/components/ThemeProvider';

export default function ProductDetailsPage({ params }: { params: Promise<{ category: string, id: string }> }) {
  const unwrappedParams = use(params);
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const [activeImage, setActiveImage] = useState<string>('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const product = getProduct(unwrappedParams.id);
  const category = getCategory(unwrappedParams.category);

  useEffect(() => {
    if (product && product.images.length > 0 && !activeImage) {
      setActiveImage(product.images[0]);
    }
  }, [product, activeImage]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product || !category || product.categoryId !== category.id) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, category.id);

  const scrollToSection = (id: string): void => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) {
      setIsZoomed(true);
    } else {
      setIsZoomed(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsZoomed(false);
    e.currentTarget.style.transformOrigin = 'center center';
  };

  return (
    <div ref={pageRef} className="p-page" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Parallax Backdrop Image */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: 0,
          left: 0,
          width: '100%',
          height: '50vh',
          zIndex: 0, 
          overflow: 'hidden',
          y: backgroundY,
          scale: backgroundScale,
          pointerEvents: 'none'
        }}
      >
        {activeImage && (
          <Image 
            src={activeImage} 
            alt="Ambient Parallax Backdrop" 
            fill 
            style={{ 
              objectFit: 'cover', 
              filter: theme === 'light' 
                ? 'blur(60px) brightness(95%) opacity(0.08)' 
                : 'blur(60px) brightness(30%) opacity(0.35)' 
            }} 
            priority
          />
        )}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: theme === 'light' 
            ? 'linear-gradient(to bottom, rgba(248,245,240,0) 0%, var(--bg-page) 100%)'
            : 'linear-gradient(to bottom, rgba(14,16,23,0) 0%, var(--bg-page) 100%)'
        }} />
      </motion.div>
      <Navbar isScrolled={isScrolled} theme={theme} setTheme={setTheme} scrollToSection={scrollToSection} />

      <main className="p-main p-container">
        
        <Link href={`/products/${category.id}`} className="p-back-link">
          <ArrowLeft size={16} /> Back to {category.name} Collection
        </Link>

        <div className="p-detail-grid">
          
          {/* GALLERY SECTION */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="p-gallery-wrap">
            <div 
              className={`p-gallery-main ${isZoomed ? 'is-zoomed' : ''}`}
              onClick={handleZoom}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {activeImage && (
                <Image 
                  src={activeImage} 
                  alt={product.name} 
                  fill 
                  className="p-gallery-main-img" 
                  priority
                />
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="p-gallery-thumbs">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`p-gallery-thumb ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="p-gallery-thumb-img" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* PRODUCT INFO SECTION */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="p-info-wrap">
            <motion.span variants={fadeUp} className="p-info-collection">
              {product.collectionName}
            </motion.span>
            <motion.h1 variants={fadeUp} className="p-info-title">
              {product.name}
            </motion.h1>
            <motion.p variants={fadeUp} className="p-info-desc">
              {product.description}
            </motion.p>

            <motion.div variants={fadeUp} className="p-meta-grid">
              <div className="p-meta-item">
                <span className="p-meta-label">Material</span>
                <span className="p-meta-value">{product.material}</span>
              </div>
              <div className="p-meta-item">
                <span className="p-meta-label">Construction</span>
                <span className="p-meta-value">{product.constructionType}</span>
              </div>
              <div className="p-meta-item">
                <span className="p-meta-label">Design Style</span>
                <span className="p-meta-value">{product.designStyle}</span>
              </div>
              <div className="p-meta-item">
                <span className="p-meta-label">Customization</span>
                <span className="p-meta-value">{product.customizationAvailability}</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-list-section">
              <h3 className="p-list-title">Available Sizes</h3>
              <div className="p-tags-wrap">
                {product.availableSizes.map(size => (
                  <span key={size} className="p-tag">{size}</span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-list-section">
              <h3 className="p-list-title">Color Variants</h3>
              <div className="p-tags-wrap">
                {product.colorVariants.map(color => (
                  <span key={color} className="p-tag">{color}</span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-list-section mt-4">
              <h3 className="p-list-title">Product Features</h3>
              <ul className="p-list">
                {product.productFeatures.map((feature, idx) => (
                  <li key={idx} className="p-list-item">{feature}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="p-list-section mt-4">
              <h3 className="p-list-title">Care Instructions</h3>
              <ul className="p-list">
                {product.careInstructions.map((instruction, idx) => (
                  <li key={idx} className="p-list-item">{instruction}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="p-actions">
              <a 
                href={`https://wa.me/919321366585?text=I'm interested in the ${product.name} (${product.id}) from the ${product.collectionName}. Can you provide more details?`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-btn p-btn-wa"
              >
                <MessageCircle size={20} /> WhatsApp Inquiry
              </a>
              <button className="p-btn p-btn-primary" onClick={() => setShowQuoteModal(true)}>
                <FileText size={20} /> Request Quotation
              </button>
            </motion.div>
          </motion.div>

        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="p-related-section">
            <h2 className="p-related-title">More from {category.name}</h2>
            <div className="p-masonry-grid">
              {relatedProducts.map((rp, index) => (
                <Link key={rp.id} href={`/products/${category.id}/${rp.id}`} className="p-card group">
                  <div className={`p-card-img-wrap ${index % 2 !== 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                    <Image src={rp.images[0]} alt={rp.name} fill className="p-card-img" />
                  </div>
                  <div className="p-card-content">
                    <h3 className="p-card-title">{rp.name}</h3>
                    <p className="p-card-desc">{rp.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer scrollToSection={scrollToSection} />

      {/* QUOTATION MODAL */}
      <AnimatePresence>
        {showQuoteModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-modal-overlay"
            onClick={() => { setShowQuoteModal(false); setQuoteSubmitted(false); }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="p-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="p-modal-close" onClick={() => { setShowQuoteModal(false); setQuoteSubmitted(false); }}>
                <X size={24} />
              </button>
              {quoteSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Request Sent!</h3>
                  <p className="text-[var(--text-body)] mb-8 max-w-sm">
                    Thank you for your interest in {product.name}. Our team will get back to you with a formal quotation shortly.
                  </p>
                  <button 
                    onClick={() => { setShowQuoteModal(false); setQuoteSubmitted(false); }}
                    className="p-btn p-btn-primary w-full max-w-xs"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2">Request Quotation</h2>
                  <p className="text-[var(--text-body)] mb-6">Inquiring about <strong>{product.name}</strong></p>
                  
                  <form className="flex flex-col mt-6" onSubmit={(e) => { e.preventDefault(); setQuoteSubmitted(true); }}>
                    
                    <div className="p-form-row">
                      <div className="p-form-group">
                        <label className="p-form-label">First Name *</label>
                        <input type="text" placeholder="John" required className="p-form-input" />
                      </div>
                      <div className="p-form-group">
                        <label className="p-form-label">Last Name *</label>
                        <input type="text" placeholder="Doe" required className="p-form-input" />
                      </div>
                    </div>

                    <div className="p-form-row">
                      <div className="p-form-group">
                        <label className="p-form-label">Email Address *</label>
                        <input type="email" placeholder="john@example.com" required className="p-form-input" />
                      </div>
                      <div className="p-form-group">
                        <label className="p-form-label">Phone / WhatsApp</label>
                        <input type="tel" placeholder="+1 (555) 000-0000" className="p-form-input" />
                      </div>
                    </div>

                    <div className="p-form-row">
                      <div className="p-form-group">
                        <label className="p-form-label">Company / Architecture Firm</label>
                        <input type="text" placeholder="Optional" className="p-form-input" />
                      </div>
                      <div className="p-form-group">
                        <label className="p-form-label">Target Size</label>
                        <select className="p-form-select">
                          <option value="">Select a size...</option>
                          {product.availableSizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                          <option value="custom">Custom Size</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-form-group">
                      <label className="p-form-label">Project Details & Requirements *</label>
                      <textarea 
                        placeholder="Tell us about your space, custom color requests, timeline, or any specific dimensions..." 
                        required 
                        className="p-form-textarea"
                      ></textarea>
                    </div>

                    <button type="submit" className="p-btn p-btn-primary mt-4 w-full">
                      Submit Quotation Request
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
