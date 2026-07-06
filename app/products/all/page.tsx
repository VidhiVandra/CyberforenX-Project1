"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Navbar from '@/components/mostused/Navbar';
import Footer from '@/components/mostused/Footer';
import { CATEGORIES } from '../data';
import '../products.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ProductsAllPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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
    <div className="p-page">
      <div className="p-ambient-1"></div>
      <Navbar isScrolled={isScrolled} theme={theme} setTheme={setTheme} scrollToSection={scrollToSection} />

      <main className="p-main p-container">
        <section className="p-header">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-header-tag">
            The Archive
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="p-header-title"
          >
            Explore Categories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="p-header-desc"
          >
            Discover our curated collections of masterfully woven textiles, ranging from centuries-old traditional motifs to bold contemporary geometry.
          </motion.p>
        </section>

        <motion.div 
          className="p-editorial-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {CATEGORIES.map((cat, index) => (
            <motion.div key={cat.id} variants={fadeUp} className="h-full">
              <Link href={`/products/${cat.id}`} className="p-cat-card">
                
                <div className="p-cat-bg">
                  <Image src={cat.image} alt={cat.name} fill className="p-cat-img" />
                  <div className="p-cat-overlay"></div>
                </div>

                <div className="p-cat-content">
                  <h3 className="p-cat-title">{cat.name}</h3>
                  <p className="p-cat-desc">{cat.description}</p>
                  <div className="p-cat-btn">
                    Explore Collection <ArrowRight size={18} />
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
