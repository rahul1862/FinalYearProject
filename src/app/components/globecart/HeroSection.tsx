import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, TrendingUp, Globe2, Users, Package } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Globe3D } from './Globe3D';

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const STATS = [
  { icon: Globe2,  label: '195 Countries',  value: '195+' },
  { icon: Package, label: 'Products',        value: '12M+' },
  { icon: Users,   label: 'Global Buyers',   value: '2.4M+' },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.12, duration: 0.7, ease: EASE },
  }),
};

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{ background: 'linear-gradient(to bottom, #050510 0%, #070720 60%, #050510 100%)' }}
    >
      {/* Background glows — own overflow-hidden layer so cards never get clipped */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.22) 0%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: 0.25,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: 0.18,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center min-h-[calc(100vh-9rem)]">

          {/* ── Left: text ─────────────────────────────────────────── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">

            {/* Live badge */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="show"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 w-fit"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00d4ff' }} />
              <span className="text-xs font-semibold" style={{ color: '#00d4ff' }}>
                🌍 500M+ Products Worldwide — Live Now
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="show"
              className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.06] mb-6 text-white"
            >
              Shop Products From{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg,#00d4ff 0%,#8b5cf6 50%,#ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Every Corner
              </span>{' '}
              of the World
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="show"
              className="text-lg leading-relaxed mb-10 max-w-[480px]"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Discover culture through commerce. Authentic products curated from 195 countries,
              delivered to your door with zero compromise on quality.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-wrap gap-4 mb-14"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(0,180,216,0.45)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/products')}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white"
                style={{ background: 'linear-gradient(135deg,#00b4d8,#7c3aed)' }}
              >
                <Globe2 className="w-5 h-5" />
                Explore the Globe
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('countries')}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: '#00d4ff' }} />
                Shop Trending Countries
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-wrap gap-8"
            >
              {STATS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.22)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#00d4ff' }} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{value}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: globe + floating cards ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="relative order-1 lg:order-2 flex items-center justify-center"
          >
            {/* Globe canvas wrapper — responsive square */}
            <div
              className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px] xl:max-w-[580px]"
              style={{ aspectRatio: '1 / 1' }}
            >
              {/* Ambient glow behind globe */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(0,212,255,0.12) 50%, transparent 100%)',
                  filter: 'blur(28px)',
                  animation: 'gc-float 6s ease-in-out infinite',
                }}
              />
              <Globe3D />

              {/* Floating toast: Tokyo → New York */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}
                className="absolute z-10 px-4 py-3 rounded-2xl"
                style={{
                  top: '18%',
                  left: '-8%',
                  background: 'rgba(4,4,18,0.88)',
                  border: '1px solid rgba(0,212,255,0.28)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
                  minWidth: '190px',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇯🇵</span>
                  <div>
                    <div className="text-white font-semibold text-xs">Tokyo → New York</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Sony XM5 · Just shipped</div>
                  </div>
                  <div className="w-2 h-2 rounded-full animate-pulse ml-1" style={{ background: '#00d4ff' }} />
                </div>
              </motion.div>

              {/* Floating toast: K-Beauty */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4.3, ease: 'easeInOut', delay: 1 }}
                className="absolute z-10 px-4 py-3 rounded-2xl"
                style={{
                  bottom: '26%',
                  right: '-8%',
                  background: 'rgba(4,4,18,0.88)',
                  border: '1px solid rgba(139,92,246,0.32)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
                  minWidth: '180px',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇰🇷</span>
                  <div>
                    <div className="text-white font-semibold text-xs">K-Beauty Drop</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Laneige · 847 sold today</div>
                  </div>
                  <div className="w-2 h-2 rounded-full animate-pulse ml-1" style={{ background: '#8b5cf6' }} />
                </div>
              </motion.div>

              {/* Floating toast: Dubai Gold */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 3.9, ease: 'easeInOut', delay: 0.6 }}
                className="absolute z-10 px-4 py-3 rounded-2xl"
                style={{
                  bottom: '-4%',
                  left: '8%',
                  background: 'rgba(4,4,18,0.88)',
                  border: '1px solid rgba(245,158,11,0.32)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
                  minWidth: '180px',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇦🇪</span>
                  <div>
                    <div className="text-white font-semibold text-xs">Dubai Gold Rush</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>14K Chain · Live</div>
                  </div>
                  <div className="w-2 h-2 rounded-full animate-pulse ml-1" style={{ background: '#f59e0b' }} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>
          Scroll to explore
        </div>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-8 rounded-full"
          style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
