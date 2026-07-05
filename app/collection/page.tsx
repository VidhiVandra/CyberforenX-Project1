'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/mostused/Navbar';

interface Product {
  id: string;
  name: string;
  collectionName: string;
  material: string;
  size: string;
  shortDescription: string;
  image: string;
  carpetType: 'Hand-Knotted' | 'Hand-Tufted' | 'Flatweave' | 'Runner';
  designStyle: 'Modern' | 'Traditional' | 'Vintage' | 'Minimalist';
  shape: 'Rectangular' | 'Round' | 'Oval' | 'Square';
  color: 'Beige' | 'Blue' | 'Red' | 'Grey' | 'Charcoal';
  availability: 'In Stock' | 'Custom Order';
  suitableRooms: string[];
  isPopular: boolean;
  isFeatured: boolean;
  dateAdded: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Oasis Medallion',
    collectionName: 'Heritage Silk Collection',
    material: 'Pure Silk & New Zealand Wool',
    size: '8x10 ft',
    shortDescription: 'Intricately hand-knotted timeless masterpiece featuring classical persian motifs.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=600&auto=format&fit=crop',
    carpetType: 'Hand-Knotted',
    designStyle: 'Traditional',
    shape: 'Rectangular',
    color: 'Red',
    availability: 'In Stock',
    suitableRooms: ['Living Room', 'Dining Room'],
    isPopular: true,
    isFeatured: true,
    dateAdded: '2026-01-15'
  },
  {
    id: '2',
    name: 'Nordic Horizon',
    collectionName: 'Minimalist Earth Line',
    material: 'Organic Hemp & Jute',
    size: '6x9 ft',
    shortDescription: 'Eco-friendly flatwoven texture bringing a raw, grounding element to modern spaces.',
    image: 'https://images.unsplash.com/photo-1579656335182-c778853355c2?q=80&w=600&auto=format&fit=crop',
    carpetType: 'Flatweave',
    designStyle: 'Minimalist',
    shape: 'Rectangular',
    color: 'Beige',
    availability: 'In Stock',
    suitableRooms: ['Bedroom', 'Office'],
    isPopular: false,
    isFeatured: true,
    dateAdded: '2026-05-10'
  },
  {
    id: '3',
    name: 'Abstract Twilight',
    collectionName: 'Metropolitan Tufts',
    material: 'Premium Bamboo Silk',
    size: '9x12 ft',
    shortDescription: 'High-low structural pile simulating painterly brushstrokes and abstract motion.',
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?q=80&w=600&auto=format&fit=crop',
    carpetType: 'Hand-Tufted',
    designStyle: 'Modern',
    shape: 'Rectangular',
    color: 'Blue',
    availability: 'Custom Order',
    suitableRooms: ['Living Room', 'Bedroom'],
    isPopular: true,
    isFeatured: false,
    dateAdded: '2026-04-01'
  },
  {
    id: '4',
    name: 'Elysian Mandala Circle',
    collectionName: 'Imperial Rounds',
    material: 'Fine Wool',
    size: '8x8 ft',
    shortDescription: 'A distinctive circular design statement piece showcasing dynamic luxury craftsmanship.',
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=600&auto=format&fit=crop',
    carpetType: 'Hand-Knotted',
    designStyle: 'Vintage',
    shape: 'Round',
    color: 'Grey',
    availability: 'In Stock',
    suitableRooms: ['Dining Room'],
    isPopular: true,
    isFeatured: false,
    dateAdded: '2026-02-20'
  }
];

const AMBIENCE_CARDS = [
  { id: 'Living Room', name: 'Living Room', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=500&auto=format&fit=crop' },
  { id: 'Bedroom', name: 'Bedroom', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=500&auto=format&fit=crop' },
  { id: 'Dining Room', name: 'Dining Room', image: 'https://images.unsplash.com/photo-1617806118233-18e1db207fa6?q=80&w=500&auto=format&fit=crop' },
  { id: 'Office', name: 'Office & Study', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=500&auto=format&fit=crop' }
];

export default function CollectionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null); 
  const [selectedType, setSelectedType] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedShape, setSelectedShape] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.collectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRoom = !selectedRoom || product.suitableRooms.includes(selectedRoom);
      const matchesType = selectedType === 'All' || product.carpetType === selectedType;
      const matchesMaterial = selectedMaterial === 'All' || product.material.includes(selectedMaterial);
      const matchesStyle = selectedStyle === 'All' || product.designStyle === selectedStyle;
      const matchesShape = selectedShape === 'All' || product.shape === selectedShape;
      const matchesSize = selectedSize === 'All' || product.size === selectedSize;
      const matchesColor = selectedColor === 'All' || product.color === selectedColor;
      const matchesAvailability = selectedAvailability === 'All' || product.availability === selectedAvailability;

      return matchesSearch && matchesRoom && matchesType && matchesMaterial && matchesStyle && matchesShape && matchesSize && matchesColor && matchesAvailability;
    }).sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      if (sortBy === 'popular') return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, selectedRoom, selectedType, selectedMaterial, selectedStyle, selectedShape, selectedSize, selectedColor, selectedAvailability, sortBy]);

  const triggerWhatsAppInquiry = (productName: string) => {
    const message = encodeURIComponent(`Hello Abdul Rahman Carpets, I am interested in inquiring about the "${productName}" from your collection page.`);
    window.open(`https://wa.me/919999999999?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50/60 text-stone-900 font-sans antialiased selection:bg-amber-800 selection:text-white">
      <Navbar />
      
      {/* Editorial Title Header */}
      <div className="bg-white border-b border-stone-200/60 py-16 px-6 text-center shadow-2xs relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
        <span className="text-[10px] font-bold tracking-[0.3em] text-amber-800 uppercase block mb-2 animate-fade-in">Bespoke Curation</span>
        <h1 className="text-4xl md:text-5xl font-serif font-black tracking-wide uppercase text-stone-950 max-w-2xl mx-auto leading-tight">
          Our Collections
        </h1>
        <div className="h-0.5 w-12 bg-amber-800 mx-auto mt-4 mb-4"></div>
        <p className="text-stone-500 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
          Discover masterfully composed carpets weaving together pristine architectural space requirements, ancestral processes, and luxurious natural textures.
        </p>
      </div>

      {/* ================= FOUR VISUAL ROOM CARDS SELECTION GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="font-serif font-black text-lg text-stone-950 uppercase tracking-wider">Shop By Ambiance</h2>
            <p className="text-stone-400 text-[11px]">Select a tailored space arrangement below to isolate compatible pile architectures.</p>
          </div>
          {selectedRoom && (
            <button 
              onClick={() => setSelectedRoom(null)}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors uppercase tracking-wider flex items-center gap-1 group"
            >
              Reset View <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {AMBIENCE_CARDS.map((card) => {
            const isTarget = selectedRoom === card.id;
            return (
              <button
                key={card.id}
                onClick={() => setSelectedRoom(isTarget ? null : card.id)}
                className={`group relative aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden text-left shadow-xs border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  isTarget ? 'border-amber-800 ring-2 ring-amber-800/30 ring-offset-2' : 'border-stone-200'
                }`}
              >
                {/* Background Image Layer with Zoom Logic */}
                <div className="absolute inset-0 bg-stone-900">
                  <img 
                    src={card.image} 
                    alt={card.name} 
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className={`absolute inset-0 transition-colors ${isTarget ? 'bg-amber-950/40 mix-blend-multiply' : 'bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent'}`}></div>
                </div>
                
                {/* Dynamic Content Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <h3 className="text-white font-serif font-black text-sm sm:text-base uppercase tracking-wider">
                    {card.name}
                  </h3>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isTarget ? 'bg-amber-800 border-amber-800 text-white' : 'border-white/40 text-white group-hover:bg-white group-hover:text-stone-950 group-hover:border-white'
                  }`}>
                    <span className="text-xs font-bold leading-none">{isTarget ? '✓' : '+'}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Structural Column Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters Component Block */}
        <aside className="bg-white border border-stone-200 rounded-xl p-6 h-fit lg:sticky lg:top-8 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="font-bold text-xs tracking-wider uppercase text-stone-950">Structural Specifiers</h2>
            <button 
              onClick={() => {
                setSelectedRoom(null); setSelectedType('All'); setSelectedMaterial('All'); 
                setSelectedStyle('All'); setSelectedShape('All'); setSelectedSize('All'); 
                setSelectedColor('All'); setSelectedAvailability('All');
              }}
              className="text-[10px] font-bold text-stone-400 hover:text-amber-800 transition-colors uppercase tracking-wider"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[10px] font-bold tracking-wider text-stone-500 uppercase mb-1.5">Carpet Type</label>
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-800 transition-colors">
                <option value="All">All Construction Typologies</option>
                <option value="Hand-Knotted">Hand-Knotted</option>
                <option value="Hand-Tufted">Hand-Tufted</option>
                <option value="Flatweave">Flatweave</option>
                <option value="Runner">Runner</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider text-stone-500 uppercase mb-1.5">Material Composition</label>
              <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-800 transition-colors">
                <option value="All">All Materials</option>
                <option value="Silk">Pure Silk</option>
                <option value="Wool">Fine Wool</option>
                <option value="Hemp">Hemp & Jute</option>
                <option value="Bamboo">Bamboo Silk</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider text-stone-500 uppercase mb-1.5">Design Philosophy</label>
              <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-800 transition-colors">
                <option value="All">All Design Styles</option>
                <option value="Modern">Modern Abstract</option>
                <option value="Traditional">Traditional Persian</option>
                <option value="Vintage">Vintage / Antique</option>
                <option value="Minimalist">Minimalist</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider text-stone-500 uppercase mb-1.5">Geometrical Shape</label>
              <select value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-800 transition-colors">
                <option value="All">All Geometries</option>
                <option value="Rectangular">Rectangular</option>
                <option value="Round">Round Circles</option>
                <option value="Oval">Oval</option>
                <option value="Square">Square</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider text-stone-500 uppercase mb-1.5">Dimension Metrics</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-800 transition-colors">
                <option value="All">All Standard Proportions</option>
                <option value="6x9 ft">6x9 ft</option>
                <option value="8x10 ft">8x10 ft</option>
                <option value="8x8 ft">8x8 ft</option>
                <option value="9x12 ft">9x12 ft</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider text-stone-500 uppercase mb-1.5">Availability Status</label>
              <select value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-800 transition-colors">
                <option value="All">All Availability Statuses</option>
                <option value="In Stock">Ready to Ship (In Stock)</option>
                <option value="Custom Order">Bespoke Production (Custom)</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Dynamic Catalog Panel */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Top Search & Filter Utility Header */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-2xs">
            <div className="w-full sm:max-w-md relative">
              <input 
                type="text" 
                placeholder="Search collection patterns, fibers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 pl-10 pr-4 py-2.5 rounded-lg text-xs focus:outline-none focus:border-amber-800 transition-colors"
              />
              <svg className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider whitespace-nowrap">Sort Configuration:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-amber-800 text-stone-800 transition-colors"
              >
                <option value="featured">Featured Masterpieces</option>
                <option value="latest">Latest Arrivals</option>
                <option value="popular">Popular Requests</option>
                <option value="alphabetical">Alphabetical Order</option>
              </select>
            </div>
          </div>

          {/* Core Mapping Product Stream with Scroll-Reveal Alignment */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-xl p-20 text-center shadow-2xs">
              <svg className="w-8 h-8 text-stone-300 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18" />
              </svg>
              <p className="text-stone-400 text-xs font-medium tracking-wide">No artisanal products match the selected parameter profiles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white border border-stone-200/90 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-0.5"
                >
                  {/* Photo Frame Container with Hover Action */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 border-b border-stone-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103" 
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className="bg-stone-950/90 text-white font-mono uppercase tracking-widest text-[9px] px-2.5 py-1 rounded shadow-xs font-semibold backdrop-blur-xs">
                        {product.carpetType}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Matrix */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[9px] font-bold tracking-[0.2em] text-amber-800 uppercase block">
                        {product.collectionName}
                      </span>
                      <h3 className="text-base font-serif font-black tracking-wide text-stone-950 mt-1 uppercase">
                        {product.name}
                      </h3>
                      <p className="text-stone-500 text-xs leading-relaxed mt-2 line-clamp-2 font-light">
                        {product.shortDescription}
                      </p>

                      {/* Explicit Space Localization Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {product.suitableRooms.map((room) => (
                          <span key={room} className="bg-stone-50 border border-stone-200 text-stone-500 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                            {room}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-x-2 text-[11px]">
                        <div>
                          <span className="text-stone-400 block uppercase text-[8px] tracking-wider font-bold">Composition</span>
                          <span className="text-stone-800 font-semibold truncate block mt-0.5">{product.material}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block uppercase text-[8px] tracking-wider font-bold">Standard Size</span>
                          <span className="text-stone-800 font-semibold block mt-0.5">{product.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 space-y-1.5">
                      <div className="grid grid-cols-2 gap-2">
                        <Link href={`/product-details?id=${product.id}`} className="border border-stone-200 hover:border-stone-400 text-center text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-lg text-stone-800 transition-colors bg-white">
                          View Specs
                        </Link>
                        <button onClick={() => triggerWhatsAppInquiry(product.name)} className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-center text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-1 transition-colors">
                          WhatsApp
                        </button>
                      </div>
                      <button onClick={() => setQuoteProduct(product)} className="w-full bg-stone-950 hover:bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-lg transition-all shadow-xs">
                        Request Private Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Quote Modal Overlay Frame */}
      {quoteProduct && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-100 scale-98 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif font-black text-base uppercase tracking-wide text-stone-950">Acquisition Form Matrix</h3>
                <p className="text-[11px] text-stone-400">Target Item: <span className="font-bold text-stone-700 uppercase">{quoteProduct.name}</span></p>
              </div>
              <button onClick={() => setQuoteProduct(null)} className="text-stone-400 hover:text-stone-700 text-xl leading-none transition-colors">&times;</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setQuoteProduct(null); }} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold uppercase text-[9px] tracking-wider mb-1">Full Identity *</label>
                <input required type="text" className="w-full border border-stone-200 p-2.5 bg-stone-50 rounded-lg focus:outline-none focus:border-amber-800" />
              </div>
              <div>
                <label className="block text-stone-600 font-semibold uppercase text-[9px] tracking-wider mb-1">Email Coordinates *</label>
                <input required type="email" className="w-full border border-stone-200 p-2.5 bg-stone-50 rounded-lg focus:outline-none focus:border-amber-800" />
              </div>
              <button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold uppercase tracking-widest py-3 rounded-lg mt-2 transition-colors">
                Register Order Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= PREMIUM EDITORIAL CORPORATE FOOTER COMPONENT ================= */}
      <footer className="bg-stone-950 text-stone-400 text-xs mt-24 border-t-4 border-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Corporate Profile Column */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="font-serif font-black text-white uppercase tracking-widest text-base">Abdul Rahman Carpets</h3>
            <p className="text-stone-500 max-w-sm font-light leading-relaxed text-[11px]">
              Preserving legacy artisanal weaving sequences across generations. We supply custom elite-tier floor assets for world-class residential and commercial installations.
            </p>
          </div>

          {/* Quick Links Navigation Column */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-stone-200 font-bold uppercase tracking-wider text-[10px]">Collection Sectors</h4>
            <ul className="space-y-1.5 text-[11px] font-medium">
              <li><button onClick={() => setSelectedRoom('Living Room')} className="hover:text-amber-600 transition-colors">Living Room Architectural Rugs</button></li>
              <li><button onClick={() => setSelectedRoom('Bedroom')} className="hover:text-amber-600 transition-colors">Bespoke Bedroom Comfort Elements</button></li>
              <li><button onClick={() => setSelectedRoom('Dining Room')} className="hover:text-amber-600 transition-colors">Traditional Fine Dining Accents</button></li>
              <li><Link href="/contact" className="hover:text-amber-600 transition-colors">Corporate Headquarters Portal</Link></li>
            </ul>
          </div>

          {/* Operational Support Coordinates */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-stone-200 font-bold uppercase tracking-wider text-[10px]">Support Coordinates</h4>
            <p className="text-[11px] font-light text-stone-500 leading-relaxed">
              Industrial Hub, Trade Galleria, Santacruz West, Mumbai, India<br />
              <span className="text-stone-300 font-medium">Inquiries:</span> concierge@abdulrahmancarpets.com
            </p>
          </div>
        </div>

        {/* Lower Meta Copyright Strip */}
        <div className="bg-stone-950 border-t border-stone-900/60 py-4 text-center text-stone-600 text-[10px] tracking-wider uppercase font-semibold">
          &copy; {new Date().getFullYear()} Abdul Rahman Carpets Co. All Project Specifications Retained.
        </div>
      </footer>
    </div>
  );
}