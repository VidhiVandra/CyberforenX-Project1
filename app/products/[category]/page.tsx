"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, PackageOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

import Navbar from '@/components/mostused/Navbar';
import Footer from '@/components/mostused/Footer';
import { getCategory, getProductsByCategory } from '../data';
import '../products.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const unwrappedParams = use(params);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const category = getCategory(unwrappedParams.category);
  const products = getProductsByCategory(unwrappedParams.category);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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

        <section className="p-header">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-header-tag">
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
