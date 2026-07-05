'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <div 
      style={{
        background: '#111215',
        color: '#ffffff',
        borderTop: '1px solid rgba(197, 160, 89, 0.15)',
        padding: '80px 0 0 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <footer 
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 5% 60px 5%',
          display: 'grid',
          gridTemplateColumns: '1.5fr repeat(3, 1fr)',
          gap: '48px',
          alignItems: 'start'
        }}
      >
        
        {/* BRAND IDENTITY COLUMN */}
        <div>
          {/* Logo and Brand Name Container arranged to align text perfectly with paragraph */}
          <div 
            style={{ 
              position: 'relative',
              paddingLeft: '62px', /* Reserves space for the logo on the left side */
              minHeight: '46px',
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '20px' 
            }}
          >
            {/* Circular Logo Housing shifted left */}
            <div 
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid #c5a059',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Image
                src="/logo.png"
                alt="Abdul Rahman Carpets Logo"
                fill
                sizes="46px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            
            <div style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: "'Cinzel', serif" }}>
              Abdul Rahman<span style={{ color: '#c5a059', marginLeft: '6px' }}>Carpets</span>
            </div>
          </div>
          
          <p 
            style={{
              fontSize: '14px',
              lineHeight: '1.7',
              color: '#8a8b90',
              margin: '16px 0 0 0',
              maxWidth: '320px',
              paddingLeft: '62px' /* Perfectly aligns the summary block underneath the text brand header */
            }}
          >
            Official online ecosystem dedicated to showcasing trackable custom rugs, pioneering fine-tuned manufacturing, and managing hospitality and commercial specifications worldwide.
          </p>
        </div>

        {/* NAVIGATION DIRECTORY */}
        <div>
          <span 
            style={{
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#ffffff',
              marginBottom: '24px',
              display: 'block'
            }}
          >
            Important Links
          </span>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Link href="/" style={directoryLinkStyle}>Home</Link>
            <Link href="/who_are_we" style={directoryLinkStyle}>About Us</Link>
            <Link href="/collections" style={directoryLinkStyle}>Collections</Link>
            <button 
              type="button" 
              onClick={() => scrollToSection('cta-funnel')} 
              style={{ 
                ...directoryLinkStyle,
                background: 'transparent', 
                border: 'none', 
                padding: 0, 
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              Contact Us
            </button>
          </nav>
        </div>

        {/* IN-TOUCH CHANNELS */}
        <div>
          <span 
            style={{
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#ffffff',
              marginBottom: '24px',
              display: 'block'
            }}
          >
            Get In Touch
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={contactNodeStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.79 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:+15550192" style={{ color: 'inherit', textDecoration: 'none' }}>+1 (555) 0192</a>
            </div>
            <div style={contactNodeStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Corporate HQ, Suite 500<br />Hub Area, Atlanta, GA 30120</span>
            </div>
          </div>
        </div>

        {/* SOCIAL PANEL WITH BACK-TO-TOP BUTTON */}
        <div>
          <span 
            style={{
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#ffffff',
              marginBottom: '24px',
              display: 'block'
            }}
          >
            Follow Us
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a 
                href="https://www.instagram.com/arcarpets_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={socialIconStyle} 
                aria-label="Instagram Channel"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              
              <a 
                href="https://wa.me/YOUR_PHONE_NUMBER?text=Hello%20Abdul%20Rahman%20Carpets%20Team,%20I%20am%20reaching%20out%20from%20your%20website%20portfolio." 
                target="_blank" 
                rel="noopener noreferrer" 
                style={socialIconStyle} 
                aria-label="WhatsApp Chat Pipeline"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
              
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={socialIconStyle} aria-label="Pinterest Boards">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </a>
            </div>
          </div>
        </div>

      </footer>

      {/* COPYRIGHT BOTTOM BAR */}
      <div 
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '32px 5%',
          background: '#0d0e10'
        }}
      >
        <div 
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '12px',
            color: '#6a6b70'
          }}
        >
          <span>&copy; 2026 ABDUL RAHMAN CARPETS. ALL RIGHTS RESERVED.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a href="#" style={legalLinkStyle}>Privacy Policy</a>
            <a href="#" style={legalLinkStyle}>Terms and Conditions</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   REUSABLE INLINE STYLE OBJECTS
   ========================================================================== */

const directoryLinkStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  textDecoration: 'none',
  color: '#b0b0b5',
  width: 'max-content'
};

const contactNodeStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#b0b0b5',
  lineHeight: '1.6',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  textDecoration: 'none'
};

const socialIconStyle: React.CSSProperties = {
  color: '#b0b0b5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const legalLinkStyle: React.CSSProperties = {
  color: '#6a6b70',
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};