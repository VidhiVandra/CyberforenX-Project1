"use client";

import React, { useState, useEffect, use, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, PackageOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

import Navbar from '@/components/mostused/Navbar';
import Footer from '@/components/mostused/Footer';
import { getCategory, getProductsByCategory } from '../data';
import '../products.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

import { useTheme } from '@/components/ThemeProvider';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const unwrappedParams = use(params);
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(heroScrollY, [0, 1], ["0%", "30%"]);
  const backgroundOpacity = useTransform(heroScrollY, [0, 1], [0.8, 0.1]);

  const category = getCategory(unwrappedParams.category);
  const products = getProductsByCategory(unwrappedParams.category);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!category) {
    notFound();
  }

  const scrollToSection = (id: string): void => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="p-page">
      <div className="p-ambient-1"></div>
      <Navbar isScrolled={isScrolled} theme={theme} setTheme={setTheme} scrollToSection={scrollToSection} />

      <main className="p-main p-container">
        
        <Link href="/products/all" className="p-back-link">
          <ArrowLeft size={16} /> Back to Archive
        </Link>

        <section ref={heroRef} className="p-header" style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
          padding: '5rem 2rem',
          marginBottom: '4.5rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.1)',
          background: 'var(--bg-secondary)'
        }}>
          {/* Animated Parallax Backdrop Image */}
          <motion.div 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              zIndex: 0, 
              overflow: 'hidden',
              y: backgroundY, 
              opacity: backgroundOpacity 
            }}
          >
            <Image 
              src={category.image} 
              alt={`${category.name} Backdrop`} 
              fill 
              style={{ objectFit: 'cover', filter: theme === 'light' ? 'brightness(90%) contrast(100%) opacity(0.12)' : 'brightness(35%) contrast(110%) opacity(0.4)' }} 
            />
          </motion.div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-header-tag" style={{ background: 'var(--bg-page)', backdropFilter: 'blur(8px)' }}>
              {category.name} Collection
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="p-header-title"
            >
              {category.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="p-header-desc"
            >
              {category.description}
            </motion.p>
          </div>
        </section>

        {products.length > 0 ? (
          <motion.div 
            className="p-masonry-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {products.map((product, index) => (
              <motion.div key={product.id} variants={fadeUp}>
                <Link href={`/products/${category.id}/${product.id}`} className="p-card group">
                  <div className={`p-card-img-wrap ${index % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                    <Image src={product.images[0]} alt={product.name} fill className="p-card-img" />
                  </div>
                  <div className="p-card-content">
                    <h3 className="p-card-title">{product.name}</h3>
                    <p className="p-card-desc">{product.description}</p>
                    <div className="p-card-arrow">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-[var(--bg-cards)] border border-dashed border-[var(--border-subtle)] rounded-3xl">
            <PackageOpen size={48} className="mx-auto mb-4 text-[var(--text-muted)] opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-[var(--text-muted)]">Products for this collection are currently being prepared.</p>
          </div>
        )}

      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
