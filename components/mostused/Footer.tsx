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
        background: '#0a1128', // Premium Dark Blue
        color: '#ffffff',
        borderTop: '1px solid rgba(170, 204, 255, 0.15)', // Custom matching border
        padding: '80px 0 0 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <style>{`
        .footer-grid {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 5% 60px 5%;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.5fr repeat(3, 1fr);
          }
        }
        .footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justifyContent: center;
          align-items: center;
          gap: 20px;
          font-size: 12px;
          color: #7a829a;
          text-align: center;
        }
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
      <footer className="footer-grid">
        
        {/* BRAND IDENTITY COLUMN */}
        <div>
          <div 
            style={{ 
              position: 'relative',
              paddingLeft: '62px', 
              minHeight: '46px',
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '20px' 
            }}
          >
            {/* Circular Logo Housing */}
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
                border: '1px solid #aaccff',
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
              Abdul Rahman<span style={{ color: '#aaccff', marginLeft: '6px' }}>Carpets</span>
            </div>
          </div>
          
          <p 
            style={{
              fontSize: '14px',
              lineHeight: '1.7',
              color: '#a0a9c0',
              margin: '16px 0 0 0',
              maxWidth: '320px',
              paddingLeft: '62px' 
            }}
          >
            Exquisite purveyors of luxury hand-knotted custom rugs, commercial carpets, and bespoke textile masterpieces scaled for residential and international design spaces.
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
            <Link href="/who-we-are" style={directoryLinkStyle}>About Us</Link>
            <Link href="/collection" style={directoryLinkStyle}>Collections</Link>
            <Link href="/contact" style={directoryLinkStyle}>Contact Us</Link>
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
              {/* WhatsApp Icon Indicator */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaccff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px' }}>
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              <a href="https://wa.me/919321366585?text=Hello%20Abdul%20Rahman%20Carpets%20Team" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                +91 93213 66585
              </a>
            </div>
            <div style={contactNodeStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaccff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Main Corporate Showroom<br />Main Road, Bhadohi, Uttar Pradesh 221401, India</span>
            </div>
          </div>
        </div>

        {/* SOCIAL PANEL */}
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
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/arcarpets_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={socialIconStyle} 
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={socialIconStyle} 
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              
              {/* Pinterest */}
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={socialIconStyle} 
                aria-label="Pinterest"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2A10 10 0 0 0 7 20.6c-.1-.9-.2-2.3.1-3.3l1.3-5.5s-.3-.7-.3-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4a1.5 1.5 0 0 0 1.5 1.9c1.8 0 3.2-1.9 3.2-4.7 0-2.5-1.8-4.2-4.3-4.2-2.9 0-4.7 2.2-4.7 4.5 0 .9.3 1.8.8 2.4l-.3 1.1c-.2-.7-.7-1.7-.7-2.8 0-3.7 2.7-7.2 7.8-7.2 4.1 0 7.3 2.9 7.3 6.8 0 4.1-2.6 7.4-6.2 7.4-1.2 0-2.3-.6-2.7-1.4l-.7 2.8c-.3 1-1 2.3-1.5 3.1A10 10 0 1 0 12 2z"/>
                </svg>
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
          background: '#050914' // Darker Midnight Blue Contrast tint
        }}
      >
        <div className="footer-bottom">
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
  color: '#b3bccc',
  width: 'max-content'
};

const contactNodeStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#b3bccc',
  lineHeight: '1.6',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  textDecoration: 'none'
};

const socialIconStyle: React.CSSProperties = {
  color: '#b3bccc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const legalLinkStyle: React.CSSProperties = {
  color: '#7a829a',
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};