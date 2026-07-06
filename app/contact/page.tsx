"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';

import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from '@/components/mostused/lucide-brand';

import Navbar from '@/components/mostused/Navbar';
import Footer from '@/components/mostused/Footer';

// Import our custom CSS stylesheet for this page
import './contact.css';

// --- ANIMATION VARIANTS ---
const slideIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

// Mask reveal for text
const maskReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const }
  }
};

// --- DATA ---
const faqs = [
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship our premium carpets worldwide. We handle all international logistics and customs documentation to ensure a seamless delivery to your architectural project."
  },
  {
    question: "Can I request a custom design or size?",
    answer: "Absolutely. Over 80% of our work is bespoke. You can provide architectural blueprints or design motifs, and our artisans will craft a piece to your exact dimensional and aesthetic specifications."
  },
  {
    question: "What is the typical lead time for a custom carpet?",
    answer: "Due to the meticulous hand-knotting process, standard lead times range from 12 to 16 weeks depending on the complexity, size, and material selection."
  },
  {
    question: "How do I care for and maintain my luxury carpet?",
    answer: "We recommend professional cleaning every 1-2 years. For immediate spills, blot gently with a clean dry cloth. We provide a detailed care manual with every purchase."
  }
];

import { useTheme } from '@/components/ThemeProvider';

export default function ContactPage() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'US',
    subject: '',
    message: ''
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="c-page">
      {/* Ambient background orbs for premium feel */}
      <div className="c-ambient-orb-1"></div>
      <div className="c-ambient-orb-2"></div>

      <Navbar isScrolled={isScrolled} theme={theme} setTheme={setTheme} scrollToSection={scrollToSection} />

      <main className="c-main">
        {/* HERO SECTION */}
        <section className="c-hero-section">
          <div className="c-container">
            <motion.div
              initial="hidden" animate="visible" variants={staggerContainer}
              className="c-hero-content"
            >
              <motion.span variants={scaleIn} className="c-hero-tag">
                Connect With Us
              </motion.span>
              <h1 className="c-hero-title">
                <span className="c-hero-title-wrap block">
                  <motion.span variants={maskReveal} className="block">Let's Discuss Your</motion.span>
                </span>
                <span className="c-hero-title-wrap block">
                  <motion.span variants={maskReveal} className="c-hero-title-highlight block">
                    Next Project
                  </motion.span>
                </span>
              </h1>
              <motion.p variants={slideIn} className="c-hero-desc">
                Whether you have a specific design in mind or need guidance on selecting the perfect textile for your space, our dedicated team is here to assist you.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTACT GRID */}
        <section className="c-main-section">
          <div className="c-container">
            <div className="c-main-grid">

              {/* LEFT: Contact Information */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                className="c-left-col"
              >
                {/* Info Cards */}
                {[
                  {
                    icon: <MapPin size={24} />,
                    title: 'Office Address',
                    content: 'Abdul Rahman Carpets, Main Road, Bhadohi, Uttar Pradesh 221401, India',
                    action: null
                  },
                  {
                    icon: <Phone size={24} />,
                    title: 'Call Us',
                    content: '+91 93213 66585',
                    action: <a href="tel:+919321366585" className="c-info-link-primary">Click to Call</a>
                  },
                  {
                    icon: <MessageCircle size={24} />,
                    title: 'WhatsApp',
                    content: 'Available for immediate inquiries and live support.',
                    action: <a href="https://wa.me/919321366585" target="_blank" rel="noopener noreferrer" className="c-info-link-whatsapp"><MessageCircle size={14} /> Chat on WhatsApp</a>
                  },
                  {
                    icon: <Mail size={24} />,
                    title: 'Email Address',
                    content: 'info@abdulrahmancarpets.com',
                    action: <a href="mailto:info@abdulrahmancarpets.com" className="c-info-link-primary">Send an Email</a>
                  },
                  {
                    icon: <Clock size={24} />,
                    title: 'Business Hours',
                    content: 'Monday - Saturday: 9:00 AM - 6:00 PM (IST)\nSunday: Closed',
                    action: null
                  }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={slideIn} className="c-info-card group">
                    <div className="c-info-icon">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="c-info-title">{item.title}</h3>
                      <p className="c-info-content">{item.content}</p>
                      {item.action}
                    </div>
                  </motion.div>
                ))}

                {/* Social Links */}
                <motion.div variants={slideIn} className="c-social-section">
                  <h3 className="c-social-title">Follow Our Journey</h3>
                  <div className="c-social-grid">
                    {[<Facebook size={20} />, <Instagram size={20} />, <Twitter size={20} />, <Linkedin size={20} />].map((icon, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        className="c-social-link"
                        whileHover={{ scale: 1.15, rotate: 5, backgroundColor: 'var(--accent-solid)', color: '#fff', borderColor: 'transparent' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* RIGHT: Contact Form */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={scaleIn}
                className="c-right-col"
              >
                <div className="c-form-card">

                  {/* Decorative glow */}
                  <div className="c-form-glow"></div>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="c-submitted-card"
                    >
                      <div className="c-success-icon-wrap">
                        <ShieldCheck size={48} className="c-success-icon" />
                      </div>

                      <h2 className="c-form-title text-center" style={{ fontSize: '1.85rem' }}>Enquiry Submitted</h2>
                      <p className="c-form-desc text-center" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                        Thank you, <strong>{formData.name}</strong>. We have received your inquiry. A consultant will review it and reply to <strong>{formData.email}</strong> shortly.
                      </p>

                      <div className="c-receipt-details">
                        <div className="c-receipt-row">
                          <span className="c-receipt-label">Subject</span>
                          <span className="c-receipt-val">{formData.subject}</span>
                        </div>
                        {formData.company && (
                          <div className="c-receipt-row">
                            <span className="c-receipt-label">Company</span>
                            <span className="c-receipt-val">{formData.company}</span>
                          </div>
                        )}
                        {formData.phone && (
                          <div className="c-receipt-row">
                            <span className="c-receipt-label">Phone</span>
                            <span className="c-receipt-val">{formData.phone}</span>
                          </div>
                        )}
                        <div className="c-receipt-row">
                          <span className="c-receipt-label">Country</span>
                          <span className="c-receipt-val">{formData.country === 'US' ? 'United States' : formData.country === 'UK' ? 'United Kingdom' : formData.country === 'IN' ? 'India' : formData.country === 'AE' ? 'UAE' : 'Other'}</span>
                        </div>
                        <div className="c-receipt-row flex-col">
                          <span className="c-receipt-label">Message Details</span>
                          <p className="c-receipt-message">{formData.message}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: '',
                            company: '',
                            email: '',
                            phone: '',
                            country: 'US',
                            subject: '',
                            message: ''
                          });
                        }}
                        className="c-form-submit"
                        style={{ marginTop: '2rem' }}
                      >
                        Send Another Enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="c-form-header">
                        <h2 className="c-form-title">Send an Inquiry</h2>
                        <p className="c-form-desc">Fill out the form below and our design consultants will get back to you within 24 hours.</p>
                      </div>

                      <form onSubmit={handleFormSubmit} className="c-form-group">
                        <div className="c-form-row">
                          <div className="c-form-field">
                            <label className="c-form-label">Full Name *</label>
                            <input
                              required
                              type="text"
                              className="c-form-input"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>
                          <div className="c-form-field">
                            <label className="c-form-label">Company Name</label>
                            <input
                              type="text"
                              className="c-form-input"
                              placeholder="Architecture Studio LLC"
                              value={formData.company}
                              onChange={e => setFormData({ ...formData, company: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="c-form-row">
                          <div className="c-form-field">
                            <label className="c-form-label">Email Address *</label>
                            <input
                              required
                              type="email"
                              className="c-form-input"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                          <div className="c-form-field">
                            <label className="c-form-label">Phone Number</label>
                            <input
                              type="tel"
                              className="c-form-input"
                              placeholder="+1 (555) 000-0000"
                              value={formData.phone}
                              onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="c-form-row">
                          <div className="c-form-field">
                            <label className="c-form-label">Country</label>
                            <select
                              className="c-form-select"
                              value={formData.country}
                              onChange={e => setFormData({ ...formData, country: e.target.value })}
                            >
                              <option value="US">United States</option>
                              <option value="UK">United Kingdom</option>
                              <option value="IN">India</option>
                              <option value="AE">UAE</option>
                              <option value="OTHER">Other</option>
                            </select>
                          </div>
                          <div className="c-form-field">
                            <label className="c-form-label">Subject *</label>
                            <input
                              required
                              type="text"
                              className="c-form-input"
                              placeholder="Project Inquiry"
                              value={formData.subject}
                              onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="c-form-field">
                          <label className="c-form-label">Message *</label>
                          <textarea
                            required
                            rows={5}
                            className="c-form-textarea"
                            placeholder="Tell us about your project requirements, dimensions, or design ideas..."
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="c-form-submit group"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                              <>Send Inquiry <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" /></>
                            )}
                          </span>
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* GOOGLE MAP */}
        <motion.section
          initial={{ clipPath: 'inset(10% 5% 10% 5% round 2rem)', opacity: 0, scale: 0.95 }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0rem)', opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }}
          viewport={{ once: true, margin: "-100px" }}
          className="c-map-section"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115409.80373053424!2d82.4950663!3d25.3941459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fc1a48c414967%3A0xe5a2d677d2ec63a8!2sBhadohi%20Nagar%20Palika%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="c-map-iframe"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          ></iframe>
        </motion.section>

        {/* FAQ SECTION */}
        <section className="c-faq-section">
          <div className="c-faq-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideIn} className="c-faq-header">
              <span className="c-faq-tag">Knowledge Base</span>
              <h2 className="c-faq-title">Frequently Asked Questions</h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="c-faq-list">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={slideIn} className="c-faq-item">
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="c-faq-btn"
                  >
                    <span className="c-faq-q">{faq.question}</span>
                    <div className={`c-faq-icon ${activeFaq === index ? 'c-faq-icon-active' : ''}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                      >
                        <div className="c-faq-answer-wrapper">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}


