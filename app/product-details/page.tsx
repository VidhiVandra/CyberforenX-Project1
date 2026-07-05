'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
// Import the exact shared component layout
import Navbar from '@/components/mostused/Navbar';

interface DetailedProduct {
  id: string;
  name: string;
  collectionName: string;
  description: string;
  material: string;
  constructionType: string;
  designStyle: string;
  availableSizes: string[];
  colorVariants: string[];
  customizationAvailability: string;
  productFeatures: string[];
  careInstructions: string[];
  images: string[];
}

const PRODUCT_CATALOG: Record<string, DetailedProduct> = {
  '1': {
    id: '1',
    name: 'Oasis Medallion',
    collectionName: 'Heritage Silk Collection',
    description: 'The Oasis Medallion stands as a premier example of elite flooring artwork. Each piece undergoes months of painstaking craftsmanship, utilizing intricate organic hand-knotting sequences to embed rich historic storytelling motifs directly into the luxury textile surface.',
    material: 'Pure Chinese Silk & Premium New Zealand Wool blend',
    constructionType: '100% Traditional Hand-Knotted (150 Knots per square inch)',
    designStyle: 'Classical Persian / Royal Antique Heritage',
    availableSizes: ['5x8 ft', '6x9 ft', '8x10 ft', '9x12 ft', '10x14 ft'],
    colorVariants: ['Crimson Red', 'Royal Indigo', 'Antique Gold', 'Ivory Cream'],
    customizationAvailability: 'Bespoke bespoke tailoring available for custom proportions, alternative primary backgrounds, and density scaling upon corporate request.',
    productFeatures: [
      'Zero synthetic fibers or modern artificial color processing',
      'Naturally stain-resistant wool structure with premium silk luster highlights',
      'Extremely dense pile delivering remarkable acoustic insulation and soft underfoot depth',
      'Reinforced hand-bound selvedges preventing corner curling over lifetimes of use'
    ],
    careInstructions: [
      'Vacuum regularly on low-suction settings without a rotating beater-bar attachment.',
      'Blot fresh spills instantly with a clean, un-dyed cloth; do not scrub or apply harsh chemical detergents.',
      'Rotate the carpet 180 degrees once every 12 months to manage sunlight exposure and foot traffic wear evenly.',
      'Professional specialized wet-cleaning is highly recommended once every 3 to 5 years.'
    ],
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=800&auto=format&fit=crop'
    ]
  }
};

const DEFAULT_PRODUCT = PRODUCT_CATALOG['1'];

export default function ProductDetailsPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id') || '1';
  const product = PRODUCT_CATALOG[productId] || DEFAULT_PRODUCT;

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', transformOrigin: 'center' });
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colorVariants[0]);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ display: 'block', transformOrigin: `${x}% ${y}%` });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', transformOrigin: 'center' });
  };

  const openWhatsAppInquiry = () => {
    const textMessage = encodeURIComponent(
      `Hello Abdul Rahman Carpets,\n\nI am inquiring regarding the "${product.name}" from the ${product.collectionName}.\n\nSpecifications Selected:\n- Dimension Size: ${selectedSize}\n- Color Tone Variant: ${selectedColor}`
    );
    window.open(`https://wa.me/919999999999?text=${textMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50/60 text-stone-900 font-sans pb-20">
      {/* Exact global navbar rendering directly on top */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-stone-400">
          <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collection" className="hover:text-stone-900 transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-stone-600 truncate">{product.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <section className="lg:col-span-7 space-y-4">
          <div 
            className="relative aspect-4/3 w-full bg-white border border-stone-200 rounded-xl overflow-hidden cursor-zoom-in shadow-xs select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              src={activeImage} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-100 ease-out"
              style={{
                transform: zoomStyle.display === 'block' ? 'scale(2)' : 'scale(1)',
                transformOrigin: zoomStyle.transformOrigin
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {product.images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(imgUrl)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden border bg-white transition-all ${
                  activeImage === imgUrl ? 'border-amber-800 ring-2 ring-amber-800/20' : 'border-stone-200 opacity-70'
                }`}
              >
                <img src={imgUrl} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        <section className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white p-6 md:p-8 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-amber-800 uppercase block">
                {product.collectionName}
              </span>
              <h1 className="text-2xl md:text-3xl font-serif font-black tracking-wide text-stone-950 uppercase mt-1">
                {product.name}
              </h1>
            </div>

            <p className="text-stone-600 text-xs leading-relaxed">{product.description}</p>
            <hr className="border-stone-100" />

            <div>
              <label className="block text-xs font-bold tracking-wider text-stone-500 uppercase mb-2">Available Dimensions</label>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs px-3 py-2 rounded-md font-medium uppercase border transition-all ${
                      selectedSize === size ? 'bg-stone-950 border-stone-950 text-white' : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-stone-500 uppercase mb-2">Color Palette</label>
              <div className="flex flex-wrap gap-2">
                {product.colorVariants.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`text-xs px-3 py-2 rounded-md font-medium border transition-all ${
                      selectedColor === color ? 'bg-amber-800 border-amber-800 text-white' : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-stone-100" />

            <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs pt-2">
              <div>
                <dt className="text-stone-400 font-medium uppercase text-[9px] tracking-wider">Material Makeup</dt>
                <dd className="text-stone-800 font-bold mt-0.5">{product.material}</dd>
              </div>
              <div>
                <dt className="text-stone-400 font-medium uppercase text-[9px] tracking-wider">Construction Type</dt>
                <dd className="text-stone-800 font-bold mt-0.5">{product.constructionType}</dd>
              </div>
              <div>
                <dt className="text-stone-400 font-medium uppercase text-[9px] tracking-wider">Design Style</dt>
                <dd className="text-stone-800 font-bold mt-0.5">{product.designStyle}</dd>
              </div>
              <div>
                <dt className="text-stone-400 font-medium uppercase text-[9px] tracking-wider">Customization</dt>
                <dd className="text-stone-800 font-bold mt-0.5">{product.customizationAvailability}</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-2 pt-6 border-t border-stone-100">
            <button onClick={openWhatsAppInquiry} className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
              Inquire via WhatsApp
            </button>
            <button onClick={() => setIsQuoteOpen(true)} className="w-full bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition-colors">
              Request Custom Quotation
            </button>
          </div>
        </section>
      </main>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-stone-200 p-6 md:p-8 rounded-xl shadow-xs">
          <h3 className="font-serif font-black text-base uppercase tracking-wider text-stone-950 mb-4 pb-2 border-b border-stone-100">
            Product Features
          </h3>
          <ul className="space-y-2.5 text-xs text-stone-600 list-disc pl-4">
            {product.productFeatures.map((feature, index) => (
              <li key={index} className="leading-relaxed"><span className="font-medium text-stone-800">{feature}</span></li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-stone-200 p-6 md:p-8 rounded-xl shadow-xs">
          <h3 className="font-serif font-black text-base uppercase tracking-wider text-stone-950 mb-4 pb-2 border-b border-stone-100">
            Care & Maintenance Instructions
          </h3>
          <ul className="space-y-2.5 text-xs text-stone-600 list-decimal pl-4">
            {product.careInstructions.map((instruction, index) => (
              <li key={index} className="leading-relaxed"><span className="font-medium text-stone-800">{instruction}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h3 className="font-serif font-black text-lg uppercase tracking-wider text-stone-950 mb-6 text-center lg:text-left">
          Related Artistic Creations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden p-4 space-y-3 shadow-xs">
            <div className="aspect-4/3 rounded-lg overflow-hidden bg-stone-100">
              <img src="https://images.unsplash.com/photo-1579656335182-c778853355c2?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Nordic Horizon" />
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-wider uppercase text-amber-800">Minimalist Earth Line</span>
              <h4 className="font-serif font-bold text-sm text-stone-950 uppercase mt-0.5">Nordic Horizon</h4>
            </div>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden p-4 space-y-3 shadow-xs">
            <div className="aspect-4/3 rounded-lg overflow-hidden bg-stone-100">
              <img src="https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Abstract Twilight" />
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-wider uppercase text-amber-800">Metropolitan Tufts</span>
              <h4 className="font-serif font-bold text-sm text-stone-950 uppercase mt-0.5">Abstract Twilight</h4>
            </div>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden p-4 space-y-3 shadow-xs">
            <div className="aspect-4/3 rounded-lg overflow-hidden bg-stone-100">
              <img src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Elysian Mandala" />
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-wider uppercase text-amber-800">Imperial Rounds</span>
              <h4 className="font-serif font-bold text-sm text-stone-950 uppercase mt-0.5">Elysian Mandala</h4>
            </div>
          </div>
        </div>
      </section>

      {isQuoteOpen && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif font-black text-lg uppercase tracking-wide text-stone-950">Request Corporate Price Quote</h3>
                <p className="text-xs text-stone-500">Inquiring Item: <span className="font-bold text-stone-800">{product.name} ({selectedSize})</span></p>
              </div>
              <button onClick={() => setIsQuoteOpen(false)} className="text-stone-400 hover:text-stone-700 font-bold text-xl leading-none">&times;</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert(`Pricing registered for ${product.name}.`); setIsQuoteOpen(false); }} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 font-medium mb-1">Your Full Name</label>
                <input required type="text" className="w-full border border-stone-200 p-2.5 rounded-lg" />
              </div>
              <div>
                <label className="block text-stone-600 font-medium mb-1">Contact Email Address</label>
                <input required type="email" className="w-full border border-stone-200 p-2.5 rounded-lg" />
              </div>
              <div>
                <label className="block text-stone-600 font-medium mb-1">Project Specification Log</label>
                <textarea rows={3} className="w-full border border-stone-200 p-2.5 rounded-lg" />
              </div>
              <button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold uppercase tracking-widest py-3 rounded-lg mt-2">
                Submit Formal Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}