'use client';

import { useState } from 'react';
import Navbar from '@/components/mostused/Navbar';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_REGISTRY: FAQItem[] = [
  {
    question: "Do you offer international shipping for custom pieces?",
    answer: "Yes, we arrange secure, insured international freight shipping for all our bespoke luxury carpets and custom commercial orders directly to your doorstep."
  },
  {
    question: "Can I request an alternative colorway or custom dimensions?",
    answer: "Absolutely. Every design in our catalog can be modified in size, primary pile configuration, or dye color variants through our custom quotation matrix."
  },
  {
    question: "What is the typical lead time for bespoke hand-knotted orders?",
    answer: "Traditional hand-knotted creations require immense precision and raw physical craftsmanship. Depending on size dimensions and density, production ranges from 3 to 6 months."
  }
];

export default function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    country: '',
    subject: '',
    message: ''
  });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Structured logic processing ticket parameters cleanly
    alert(`Thank you, ${formData.fullName}. Your business inquiry regarding "${formData.subject || 'Bespoke Inquiry'}" has been securely compiled.`);
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      country: '',
      subject: '',
      message: ''
    });
  };

  const openWhatsAppDirect = () => {
    const message = encodeURIComponent("Hello Abdul Rahman Carpets, I am visiting your contact portal and would like to speak with a design representative regarding a premium project.");
    window.open(`https://wa.me/919999999999?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-900 font-sans pb-20">
      {/* Universal shared global layout navigation */}
      <Navbar />

      {/* Header Banner */}
      <div className="bg-white border-b border-stone-200 py-12 px-6 text-center">
        <span className="text-xs font-bold tracking-[0.2em] text-amber-800 uppercase block mb-1">Get In Touch</span>
        <h1 className="text-3xl md:text-4xl font-serif font-black tracking-wide uppercase text-stone-950">
          Connect With Us
        </h1>
        <p className="text-stone-500 text-sm max-w-xl mx-auto mt-2">
          Reach out to arrange a private consultation, request a custom project analysis, or speak directly with our luxury textile production experts.
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ================= LEFT GRID COLUMN: CORPORATE CONTACT INFORMATION MATRIX ================= */}
        <section className="lg:col-span-5 space-y-6">
          
          <div className="bg-white border border-stone-200 p-6 md:p-8 rounded-xl shadow-xs space-y-6">
            <h2 className="font-serif font-black text-xl text-stone-950 uppercase tracking-wide border-b border-stone-100 pb-3">
              Corporate Headquarters
            </h2>

            <div className="space-y-4 text-xs">
              {/* Company Info Row */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-stone-100 rounded-lg text-amber-800 flex-shrink-0">
                  <span className="font-bold text-xs uppercase tracking-wider block font-mono">ARC</span>
                </div>
                <div>
                  <h3 className="font-bold text-stone-950 text-sm uppercase">Abdul Rahman Carpets</h3>
                  <p className="text-stone-500 mt-0.5">Premier Luxury Rug Artisans & Global Shippers</p>
                </div>
              </div>

              {/* Office Address Row */}
              <div className="flex items-start gap-3 pt-3 border-t border-stone-50">
                <svg className="w-4 h-4 text-amber-800 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 className="font-bold text-stone-400 uppercase text-[9px] tracking-wider">Office Address</h4>
                  <p className="text-stone-800 font-semibold mt-0.5 leading-relaxed">
                    102, Imperial Textile Hub, Landmark Trade Galleria,<br />
                    Santacruz West, Mumbai, Maharashtra 400054, India
                  </p>
                </div>
              </div>

              {/* Business Operational Hours Row */}
              <div className="flex items-start gap-3 pt-3 border-t border-stone-50">
                <svg className="w-4 h-4 text-amber-800 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-bold text-stone-400 uppercase text-[9px] tracking-wider">Business Hours</h4>
                  <p className="text-stone-800 font-semibold mt-0.5">
                    Monday – Saturday: 10:00 AM – 7:00 PM IST<br />
                    <span className="text-stone-400 font-medium">Sunday: Closed (By Prior Consultation Only)</span>
                  </p>
                </div>
              </div>

              {/* Core Interactive Action Buttons Hub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-100">
                <a href="tel:+919999999999" className="border border-stone-200 hover:border-stone-400 p-3 rounded-lg text-center font-bold text-stone-800 flex items-center justify-center gap-2 transition-colors">
                  <svg className="w-3.5 h-3.5 text-amber-800" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Click to Call
                </a>
                
                <a href="mailto:concierge@abdulrahmancarpets.com" className="border border-stone-200 hover:border-stone-400 p-3 rounded-lg text-center font-bold text-stone-800 flex items-center justify-center gap-2 transition-colors">
                  <svg className="w-3.5 h-3.5 text-amber-800" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Click to Email
                </a>
              </div>

              <button onClick={openWhatsAppDirect} className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-lg font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.93 0c3.168.001 6.148 1.234 8.39 3.48 2.242 2.246 3.472 5.228 3.47 8.395-.006 6.581-5.342 11.93-11.874 11.93-2.006-.001-3.974-.51-5.759-1.484L0 24zm6.59-4.846c1.674.993 3.349 1.481 5.273 1.482 5.305 0 9.626-4.316 9.631-9.623.002-2.571-1.002-4.99-2.83-6.818C16.843 2.365 14.43 1.36 11.861 1.36c-5.308 0-9.63 4.317-9.635 9.624-.002 2.01.533 3.974 1.551 5.688l-.995 3.636 3.725-.977z" />
                </svg>
                Chat on WhatsApp
              </button>
            </div>

            {/* Social Media Link Connectors Row */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-center space-x-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-800 transition-colors text-xs font-bold uppercase tracking-widest">Instagram</a>
              <span className="text-stone-200">|</span>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-800 transition-colors text-xs font-bold uppercase tracking-widest">Facebook</a>
              <span className="text-stone-200">|</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-800 transition-colors text-xs font-bold uppercase tracking-widest">LinkedIn</a>
              <span className="text-stone-200">|</span>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-800 transition-colors text-xs font-bold uppercase tracking-widest">Pinterest</a>
            </div>
          </div>

          {/* ================= MAP COMPONENT INTEGRATION CONTAINER ================= */}
          <div className="bg-white border border-stone-200 p-4 rounded-xl shadow-xs overflow-hidden h-[260px] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2sSantacruz+West!3m2!1i1024!2i768!4f13.1!3m3!1m2!2sSantacruz+West%2C+Mumbai%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
              className="w-full h-full rounded-lg border-0"
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Abdul Rahman Carpets Mumbai Headquarters Office"
            ></iframe>
          </div>
        </section>

        {/* ================= RIGHT GRID COLUMN: HIGH-PRIORITY INQUIRY FORM ================= */}
        <section className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-xs">
          <h2 className="font-serif font-black text-xl text-stone-950 uppercase tracking-wide border-b border-stone-100 pb-3">
            Inquiry Submission Portal
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Full Name */}
            <div>
              <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-wider text-[10px]">Full Name *</label>
              <input 
                required 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Alexander Vance"
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-800" 
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-wider text-[10px]">Company Name</label>
              <input 
                type="text" 
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Vance Design Studio"
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-800" 
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-wider text-[10px]">Email Address *</label>
              <input 
                required 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="alexander@vancedesign.com"
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-800" 
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-wider text-[10px]">Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1 (555) 019-2834"
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-800" 
              />
            </div>

            {/* Country */}
            <div className="sm:col-span-2">
              <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-wider text-[10px]">Country / Region *</label>
              <input 
                required 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="United Kingdom"
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-800" 
              />
            </div>

            {/* Subject */}
            <div className="sm:col-span-2">
              <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-wider text-[10px]">Subject / Topic Parameter *</label>
              <input 
                required 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Custom Hand-Knotted Carpet Order Setup"
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-800" 
              />
            </div>

            {/* Message Body */}
            <div className="sm:col-span-2">
              <label className="block text-stone-600 font-semibold mb-1 uppercase tracking-wider text-[10px]">Detailed Message Specification *</label>
              <textarea 
                required 
                rows={5} 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Outline details regarding requested size layouts, specific collection design patterns, or material specifications needed for your custom project architecture..."
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-800 resize-none leading-relaxed"
              ></textarea>
            </div>

            <div className="sm:col-span-2 pt-2">
              <button type="submit" className="w-full bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-lg transition-colors shadow-xs">
                Submit Formal Inquiry Ticket
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* ================= LOWER ACCORDION SECTION: FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 space-y-6">
        <h3 className="font-serif font-black text-xl uppercase tracking-wider text-stone-950 text-center mb-8">
          Frequently Asked Queries
        </h3>
        
        <div className="space-y-3">
          {FAQ_REGISTRY.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-xs uppercase tracking-wider text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className={`text-stone-400 text-sm transform transition-transform ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    &#43;
                  </span>
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-50 bg-stone-50/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}