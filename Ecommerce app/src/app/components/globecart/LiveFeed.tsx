import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Globe2, ShoppingBag } from 'lucide-react';

interface FeedItem {
  id: number;
  flag: string;
  from: string;
  to: string;
  product: string;
  price: string;
  time: string;
  color: string;
}

const FEED_ITEMS: Omit<FeedItem, 'id'>[] = [
  { flag: '🇰🇷', from: 'Seoul', to: 'Toronto', product: 'Laneige Lip Sleeping Mask', price: '$24', time: '2s ago', color: '#f472b6' },
  { flag: '🇯🇵', from: 'Tokyo', to: 'New York', product: 'Sony WF-1000XM5', price: '$279', time: '5s ago', color: '#00d4ff' },
  { flag: '🇮🇹', from: 'Milan', to: 'Miami', product: 'Italian Leather Tote Bag', price: '$345', time: '11s ago', color: '#f97316' },
  { flag: '🇨🇭', from: 'Zurich', to: 'London', product: 'Swiss Automatic Watch', price: '$1,200', time: '18s ago', color: '#38bdf8' },
  { flag: '🇦🇪', from: 'Dubai', to: 'Los Angeles', product: '14K Gold Chain Necklace', price: '$680', time: '23s ago', color: '#f59e0b' },
  { flag: '🇧🇷', from: 'São Paulo', to: 'Berlin', product: 'Havaianas Limited Edition', price: '$65', time: '29s ago', color: '#4ade80' },
  { flag: '🇫🇷', from: 'Paris', to: 'Singapore', product: 'Hermès Silk Scarf', price: '$420', time: '35s ago', color: '#a78bfa' },
  { flag: '🇮🇳', from: 'Mumbai', to: 'Sydney', product: 'Handwoven Pashmina Shawl', price: '$89', time: '42s ago', color: '#fb923c' },
  { flag: '🇲🇽', from: 'Mexico City', to: 'Chicago', product: 'Artisan Silver Earrings', price: '$48', time: '51s ago', color: '#34d399' },
  { flag: '🇸🇪', from: 'Stockholm', to: 'Montreal', product: 'IKEA Artist Collection', price: '$32', time: '58s ago', color: '#60a5fa' },
  { flag: '🇹🇭', from: 'Bangkok', to: 'Dubai', product: 'Thai Silk Kimono Dress', price: '$155', time: '1m ago', color: '#f472b6' },
  { flag: '🇳🇬', from: 'Lagos', to: 'London', product: 'Ankara Print Jumpsuit', price: '$78', time: '1m ago', color: '#4ade80' },
];

export function LiveFeed() {
  const [items, setItems] = useState<FeedItem[]>(
    FEED_ITEMS.slice(0, 6).map((item, i) => ({ ...item, id: i }))
  );
  const counterRef = useRef(FEED_ITEMS.length);
  const [total, setTotal] = useState(14_847);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = FEED_ITEMS[counterRef.current % FEED_ITEMS.length];
      counterRef.current++;
      setItems(prev => [{ ...next, id: counterRef.current }, ...prev.slice(0, 7)]);
      setTotal(t => t + Math.floor(Math.random() * 3 + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #05050f 0%, #070718 50%, #05050f 100%)' }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.5), transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00d4ff' }} />
              Live Global Activity
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              The World Is{' '}
              <span style={{ background: 'linear-gradient(90deg,#00d4ff,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Shopping Right Now
              </span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-md">
              Real-time purchases happening across the globe. Every second, someone discovers something extraordinary from another culture.
            </p>

            {/* Counter cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: ShoppingBag, label: 'Orders Today', value: total.toLocaleString(), color: '#00d4ff' },
                { icon: Globe2, label: 'Countries Active', value: '142', color: '#8b5cf6' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  className="px-5 py-4 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Icon className="w-5 h-5 mb-2" style={{ color }} />
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Live feed */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          >
            <div
              className="relative rounded-3xl overflow-hidden p-1"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 0 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Header bar */}
              <div
                className="flex items-center justify-between px-5 py-4 rounded-t-2xl mb-1"
                style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: '#00d4ff' }} />
                  <span className="text-sm font-semibold text-white">Global Purchase Feed</span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                  style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00d4ff' }} />
                  LIVE
                </div>
              </div>

              {/* Feed list */}
              <div className="px-2 pb-2 overflow-hidden" style={{ maxHeight: '420px' }}>
                <AnimatePresence initial={false}>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ height: 0, opacity: 0, y: -20 }}
                      animate={{ height: 'auto', opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="flex items-center gap-4 px-4 py-3 rounded-xl mb-1 group hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                      >
                        {/* Flag circle */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl"
                          style={{
                            background: `${item.color}15`,
                            border: `1px solid ${item.color}30`,
                          }}
                        >
                          {item.flag}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate">{item.product}</div>
                          <div className="text-xs text-white/40 mt-0.5">
                            <span style={{ color: item.color }}>{item.from}</span>
                            {' → '}
                            {item.to}
                          </div>
                        </div>

                        {/* Price + time */}
                        <div className="flex-shrink-0 text-right">
                          <div className="text-sm font-bold" style={{ color: item.color }}>{item.price}</div>
                          <div className="text-xs text-white/30 mt-0.5">{item.time}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 rounded-b-3xl pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(7,7,24,0.9), transparent)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
