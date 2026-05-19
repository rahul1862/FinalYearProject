import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';

interface Country {
  flag: string;
  name: string;
  tagline: string;
  category: string;
  items: string[];
  gradient: string;
  accent: string;
  bgGlow: string;
  stats: string;
}

const COUNTRIES: Country[] = [
  {
    flag: '🇯🇵',
    name: 'Japan',
    tagline: 'Anime, Gaming & Tech',
    category: 'Electronics & Culture',
    items: ['Sony WF-1000XM5', 'Gundam Kits', 'Nintendo Merch'],
    gradient: 'linear-gradient(135deg, #1a0030 0%, #4a0070 50%, #9f0a8b 100%)',
    accent: '#ec4899',
    bgGlow: 'rgba(236,72,153,0.3)',
    stats: '2.1M products',
  },
  {
    flag: '🇰🇷',
    name: 'South Korea',
    tagline: 'K-Beauty & Fashion',
    category: 'Skincare & Apparel',
    items: ['Laneige Lip Mask', 'COSRX Serum', 'Hanbok Styles'],
    gradient: 'linear-gradient(135deg, #1a0015 0%, #5a0035 50%, #d4006a 100%)',
    accent: '#f472b6',
    bgGlow: 'rgba(244,114,182,0.3)',
    stats: '3.4M products',
  },
  {
    flag: '🇮🇹',
    name: 'Italy',
    tagline: 'Luxury Leather Goods',
    category: 'Fashion & Accessories',
    items: ['Handmade Wallets', 'Artisan Bags', 'Silk Scarves'],
    gradient: 'linear-gradient(135deg, #1a0000 0%, #6b1000 50%, #c0390a 100%)',
    accent: '#f97316',
    bgGlow: 'rgba(249,115,22,0.3)',
    stats: '1.8M products',
  },
  {
    flag: '🇦🇪',
    name: 'Dubai',
    tagline: 'Luxury Accessories',
    category: 'Jewelry & Gold',
    items: ['14K Gold Chains', 'Oud Perfumes', 'Diamond Rings'],
    gradient: 'linear-gradient(135deg, #1a0d00 0%, #7a4400 50%, #d4a017 100%)',
    accent: '#f59e0b',
    bgGlow: 'rgba(245,158,11,0.3)',
    stats: '950K products',
  },
  {
    flag: '🇨🇭',
    name: 'Switzerland',
    tagline: 'Precision Timepieces',
    category: 'Watches & Instruments',
    items: ['Swiss Automatics', 'Pocket Watches', 'Watch Accessories'],
    gradient: 'linear-gradient(135deg, #000d1a 0%, #00306b 50%, #0066cc 100%)',
    accent: '#38bdf8',
    bgGlow: 'rgba(56,189,248,0.3)',
    stats: '680K products',
  },
  {
    flag: '🇧🇷',
    name: 'Brazil',
    tagline: 'Streetwear & Décor',
    category: 'Fashion & Lifestyle',
    items: ['Havaianas Flip-Flops', 'Street Art Prints', 'Carnival Wear'],
    gradient: 'linear-gradient(135deg, #001a00 0%, #006b00 50%, #38a000 100%)',
    accent: '#4ade80',
    bgGlow: 'rgba(74,222,128,0.3)',
    stats: '1.5M products',
  },
];

function CountryCard({ country, index, onShopNow }: { country: Country; index: number; onShopNow: () => void }) {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Gradient image area */}
      <div className="relative h-48 overflow-hidden" style={{ background: country.gradient }}>
        {/* Floating flag */}
        <div className="absolute top-5 left-5 text-5xl select-none" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>
          {country.flag}
        </div>

        {/* Decorative circles */}
        <div
          className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${country.accent}, transparent 70%)` }}
        />
        <div
          className="absolute -right-4 bottom-0 w-24 h-24 rounded-full opacity-30"
          style={{ background: `radial-gradient(circle, ${country.accent}, transparent 70%)` }}
        />

        {/* Stats pill */}
        <div
          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: country.accent, border: `1px solid ${country.accent}40` }}
        >
          <TrendingUp className="w-3 h-3" />
          {country.stats}
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to top, ${country.bgGlow}, transparent)` }}
        />
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-white mb-0.5">{country.name}</h3>
            <p className="text-xs font-medium" style={{ color: country.accent }}>{country.tagline}</p>
          </div>
          <div
            className="px-2.5 py-1 rounded-full text-xs text-white/60"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {country.category}
          </div>
        </div>

        {/* Product list */}
        <div className="flex flex-col gap-1.5 mb-5">
          {country.items.map(item => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full" style={{ background: country.accent }} />
              <span className="text-xs text-white/50">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ x: 4 }}
          onClick={onShopNow}
          className="flex items-center gap-2 text-sm font-semibold group/btn"
          style={{ color: country.accent }}
        >
          Shop Now
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </motion.button>
      </div>

      {/* Bottom glow on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${country.accent}, transparent)` }}
      />

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 30px ${country.bgGlow}, inset 0 0 0 1px ${country.accent}30` }}
      />
    </motion.div>
  );
}

export function TrendingCountries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-28 relative" style={{ background: '#05050f' }}>
      {/* Section glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.6) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Trending Right Now
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Shop by{' '}
            <span style={{ background: 'linear-gradient(135deg,#8b5cf6,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Country
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            Handpicked collections from the world's most exciting shopping destinations.
          </p>
        </motion.div>

        {/* Country grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COUNTRIES.map((country, i) => (
            <CountryCard
              key={country.name}
              country={country}
              index={i}
              onShopNow={() => navigate(`/products?country=${encodeURIComponent(country.name)}`)}
            />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(139,92,246,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/products')}
            className="px-8 py-4 rounded-2xl text-sm font-semibold text-white"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(139,92,246,0.4)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Star className="inline w-4 h-4 mr-2" style={{ color: '#8b5cf6' }} />
            View All 195 Countries
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
