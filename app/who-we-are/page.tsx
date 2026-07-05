import Navbar from '@/components/mostused/Navbar';
import Footer from '@/components/mostused/Footer';
import Link from 'next/link';

export default function WhoWeAre() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans select-none text-stone-900 relative">
      {/* Navigation Header */}
      <Navbar />

      <main className="flex-grow px-4 md:px-6 pt-24 pb-20 space-y-24">
        
        {/* 1. COMPANY INTRODUCTION */}
        <section className="text-center space-y-4 py-12 max-w-4xl mx-auto">
          <span className="text-xs font-bold tracking-[0.3em] text-amber-800 uppercase block">
            Our Legacy & Identity
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-wide text-stone-950 uppercase leading-tight">
            Who We Are
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
            Welcome to Carpet Planet. We are a premier textile design collective dedicated to creating exceptional, hand-knotted luxury rugs and architectural floor coverings that transform ordinary environments into extraordinary living spaces.
          </p>
        </section>

        {/* 2. COMPANY HISTORY & MILESTONES */}
        <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-amber-800 uppercase block mb-2">Our Timeline</span>
            <h2 className="text-3xl font-serif font-bold text-stone-950 mb-6">A History Woven Across Generations</h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Founded over three decades ago as a modest collective of independent regional weavers, Carpet Planet was built on a foundational promise: to preserve the delicate, dying art of traditional hand-knotting while integrating contemporary design systems.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              By working closely with generational artisans across historical weaving hubs, we converted ancient loom traditions into an organized international design house trusted by luxury architectural firms across 24 countries.
            </p>
          </div>
          
          {/* Company Achievements / Milestones Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <p className="text-3xl font-serif font-bold text-amber-800 mb-1">1991</p>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-1">The First Loom</h4>
              <p className="text-stone-500 text-[11px] leading-relaxed">Established our core collective with 12 generational master weavers.</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <p className="text-3xl font-serif font-bold text-amber-800 mb-1">2008</p>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-1">Global Studio Expansion</h4>
              <p className="text-stone-500 text-[11px] leading-relaxed">Opened premium dedicated design fulfillment hubs overseas.</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <p className="text-3xl font-serif font-bold text-amber-800 mb-1">10k+</p>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-1">Bespoke Creations</h4>
              <p className="text-stone-500 text-[11px] leading-relaxed">Successfully delivered premium custom-scale architectural installations worldwide.</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <p className="text-3xl font-serif font-bold text-amber-800 mb-1">Top Tier</p>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-1">Sustainability Award</h4>
              <p className="text-stone-500 text-[11px] leading-relaxed">Recognized internationally for 100% traceably organic structural supply loops.</p>
            </div>
          </div>
        </section>

        {/* NEW REQUIREMENT: PREMIUM IMAGE GALLERY */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-[0.25em] text-amber-800 uppercase block mb-2">Studio Glimpse</span>
            <h2 className="text-3xl font-serif font-bold text-stone-950">Atelier Image Gallery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-80 rounded-2xl bg-stone-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=600')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6" />
            </div>
            <div className="h-80 rounded-2xl bg-stone-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6" />
            </div>
            <div className="h-80 rounded-2xl bg-stone-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=600')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6" />
            </div>
          </div>
        </section>

        {/* 3. MISSION, VISION & BUSINESS PHILOSOPHY */}
        <section className="bg-stone-950 text-white rounded-[2.5rem] p-12 lg:p-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <span className="text-amber-400 font-serif italic text-2xl">01</span>
            <h3 className="text-lg font-bold tracking-wider uppercase">Mission Statement</h3>
            <p className="text-stone-400 text-xs leading-relaxed">
              To supply the global interior landscape with ethically conscious luxury floor pieces that honor ancestral weaving communities while setting the supreme standard for residential durability.
            </p>
          </div>
          <div className="space-y-3 md:border-x md:border-white/10 md:px-8">
            <span className="text-amber-400 font-serif italic text-2xl">02</span>
            <h3 className="text-lg font-bold tracking-wider uppercase">Vision Statement</h3>
            <p className="text-stone-400 text-xs leading-relaxed">
              To become the ultimate global destination for custom textile art, where ancient human craftsmanship effortlessly enriches the footprints of visionary spaces.
            </p>
          </div>
          <div className="space-y-3 md:pl-8">
            <span className="text-amber-400 font-serif italic text-2xl">03</span>
            <h3 className="text-lg font-bold tracking-wider uppercase">Business Philosophy</h3>
            <p className="text-stone-400 text-xs leading-relaxed">
              We operate under a simple ethos: real luxury requires time, patience, and absolute fair compensation. A product only truly shines if the hands that created it thrive.
            </p>
          </div>
        </section>

        {/* 4. CORE VALUES */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.25em] text-amber-800 uppercase block mb-2">Our Foundation</span>
            <h2 className="text-3xl font-serif font-bold text-stone-950">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Artisanal Preservation', text: 'Protecting traditional hand-knotting variants from machine replacement.' },
              { title: 'Radical Traceability', text: 'Ensuring 100% transparency in organic yarn sourcing and processing paths.' },
              { title: 'Design Innovation', text: 'Adapting ancient textures seamlessly with modern minimalist environments.' },
              { title: 'Ethical Accountability', text: 'Guaranteeing premium living wages and safe conditions across all regional looms.' }
            ].map((value, i) => (
              <div key={i} className="bg-stone-50/50 border border-stone-100 rounded-2xl p-6">
                <div className="text-amber-800 font-bold mb-3 text-lg">✦</div>
                <h4 className="font-bold text-sm text-stone-900 mb-2">{value.title}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. MANUFACTURING EXPERTISE & QUALITY STANDARDS */}
        <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-stone-100 h-96 rounded-[2rem] overflow-hidden bg-cover bg-center order-last lg:order-first" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?q=80&w=600')` }} />
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] text-amber-800 uppercase block mb-2">Production Rigor</span>
              <h2 className="text-3xl font-serif font-bold text-stone-950">Manufacturing Expertise & Quality Standards</h2>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed">
              Our manufacturing superiority rests within our meticulous processing guidelines. We process only long-staple New Zealand wool and pure silken thread blocks. This meticulous choice drastically limits pile-shedding while vastly enhancing natural spill resilience over time.
            </p>
            <div className="space-y-4 text-xs">
              <div className="flex gap-3">
                <span className="text-amber-800 font-bold">✓</span>
                <p className="text-stone-600"><strong className="text-stone-900">Zero Synthetic Fillers:</strong> Absolutely no latex backing glues or artificial binding yarns are permitted across production lines.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-amber-800 font-bold">✓</span>
                <p className="text-stone-600"><strong className="text-stone-900">High Knot Density Metrics:</strong> Hand-tied loops up to 150-300 knots per square inch handle immense foot traffic effortlessly.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-amber-800 font-bold">✓</span>
                <p className="text-stone-600"><strong className="text-stone-900">Double Luster Wash:</strong> Every single carpet undergoes mountain-water wash treatments to set color vibrance safely.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CUSTOMER COMMITMENT & NEW INTERNAL ROUTING LINKING PATHS */}
        <section className="max-w-5xl mx-auto px-4 text-center bg-amber-50/60 rounded-[2.5rem] p-12 border border-amber-100/50 space-y-6">
          <span className="text-xs font-bold tracking-[0.25em] text-amber-800 uppercase block">Our Promise</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-950">Our Customer Commitment</h2>
          <p className="text-stone-600 text-sm max-w-xl mx-auto leading-relaxed">
            Investing in a premium carpet is a lifelong decision. We promise absolute precision from layout matching to delivery setup. Each selection includes a signed certification passport detailing its artisan group history, knot metrics, and specialized restoration care assurances.
          </p>
          
          {/* NEW NAVIGATION TO SERVICES AND CONTACT PAGES */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/" className="bg-stone-950 text-white px-6 py-3 text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors">
              Explore Our Services
            </Link>
            <Link href="/contact" className="border border-stone-950 text-stone-950 px-6 py-3 text-xs font-semibold tracking-wider uppercase hover:bg-stone-950 hover:text-white transition-all">
              Get In Touch (Contact)
            </Link>
          </div>
        </section>

      </main>

      {/* NEW REQUIREMENT: FLOATING WHATSAPP INQUIRY BUTTON */}
      <a 
        href="https://wa.me/1234567890" // Replace with your actual WhatsApp business number format layout
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
        aria-label="Inquire on WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 12.008 0c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 12.004-11.948 12.004-1.998-.001-3.951-.5-5.688-1.448L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.428 1.977 13.963 1.95 11.33 1.95c-5.436 0-9.86 4.37-9.864 9.8.001 1.716.463 3.39 1.337 4.866L1.725 20.3l3.922-1.146zm11.236-3.868c-.3-.15-1.774-.875-2.05-.975s-.477-.15-.677.15c-.2.3-.775.975-.95 1.175s-.35.225-.65.075c-.3-.15-1.267-.467-2.414-1.492-.893-.797-1.496-1.783-1.672-2.083s-.018-.462.133-.611c.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525c-.075-.15-.677-1.631-.927-2.23-.243-.586-.49-.507-.677-.517s-.399-.01-.599-.01-.525.075-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.224 5.112 4.521.714.309 1.272.494 1.707.633.717.228 1.368.196 1.884.119.574-.085 1.774-.725 2.025-1.425s.25-1.3.175-1.425-.275-.2-.575-.35z"/>
        </svg>
      </a>

      {/* Footer Wrapper */}
      <Footer />
    </div>
  );
}