import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Globe, Twitter, Instagram, Youtube, Github, ArrowRight, Mail, MapPin, ChevronDown } from 'lucide-react';

const FOOTER_LINKS: Record<string, { label: string; path: string }[]> = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/about' },
    { label: 'Press', path: '/about' },
    { label: 'Blog', path: '/about' },
    { label: 'Investors', path: '/about' },
  ],
  Products: [
    { label: 'Featured', path: '/products' },
    { label: 'New Arrivals', path: '/products' },
    { label: 'Best Sellers', path: '/products' },
    { label: 'Flash Deals', path: '/deals' },
    { label: 'Gift Cards', path: '/products' },
  ],
  Countries: [
    { label: 'Japan', path: '/products?country=Japan' },
    { label: 'South Korea', path: '/products?country=South+Korea' },
    { label: 'Italy', path: '/products?country=Italy' },
    { label: 'Dubai', path: '/products?country=Dubai' },
    { label: 'Switzerland', path: '/products?country=Switzerland' },
    { label: 'Brazil', path: '/products?country=Brazil' },
  ],
  Support: [
    { label: 'Help Center', path: '/help' },
    { label: 'Shipping Info', path: '/help' },
    { label: 'Returns', path: '/help' },
    { label: 'Track Order', path: '/help' },
    { label: 'Contact Us', path: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/about' },
    { label: 'Terms of Use', path: '/about' },
    { label: 'Cookie Policy', path: '/about' },
    { label: 'Accessibility', path: '/about' },
  ],
};

const SOCIAL = [
  { Icon: Twitter, label: 'Twitter', color: '#00d4ff' },
  { Icon: Instagram, label: 'Instagram', color: '#ec4899' },
  { Icon: Youtube, label: 'YouTube', color: '#f97316' },
  { Icon: Github, label: 'GitHub', color: '#a78bfa' },
];

const COUNTRIES_SELECT = ['🇺🇸 United States', '🇬🇧 United Kingdom', '🇨🇦 Canada', '🇦🇺 Australia', '🇩🇪 Germany', '🇫🇷 France', '🇸🇬 Singapore', '🇯🇵 Japan'];

export function GCFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [country, setCountry] = useState('🇺🇸 United States');
  const navigate = useNavigate();

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer style={{ background: '#030310' }}>
      {/* Newsletter band */}
      <div
        className="relative overflow-hidden"
        style={{ borderTop: '1px solid rgba(0,212,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(0,212,255,0.06), transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay ahead of global trends
              </h3>
              <p className="text-white/50 text-sm">
                Get weekly drops from the world's best markets — curated, personalised, and delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
              {subscribed ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff' }}
                >
                  ✓ You're subscribed — expect the unexpected.
                </motion.div>
              ) : (
                <>
                  <div
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl w-full sm:w-72"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <Mail className="w-4 h-4 text-white/30 flex-shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                      placeholder="your@email.com"
                      className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,212,255,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubscribe}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white whitespace-nowrap"
                    style={{ background: 'linear-gradient(135deg,#00b4d8,#7c3aed)' }}
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">

          {/* Logo column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)' }}
              >
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Globe<span style={{ background: 'linear-gradient(90deg,#00d4ff,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Cart</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Shopping without borders. Discover authentic products from 195 countries.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs text-white/30 mb-6">
              <MapPin className="w-3.5 h-3.5" />
              <span>Available in 195 countries</span>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL.map(({ Icon, label, color }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.12, y: -2 }}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${color}30`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <button
                      onClick={() => navigate(path)}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">
              © 2026 GlobeCart Inc. All rights reserved. Designed for the world.
            </p>

            {/* Country selector */}
            <div className="relative">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/50 cursor-pointer hover:text-white/70 transition-colors duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Globe className="w-3.5 h-3.5" />
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer appearance-none text-xs"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {COUNTRIES_SELECT.map(c => (
                    <option key={c} value={c} style={{ background: '#050510', color: 'white' }}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>

            {/* Payment icons */}
            <div className="flex items-center gap-2">
              {['Visa', 'MC', 'PayPal', 'AMEX', 'Crypto'].map(method => (
                <div
                  key={method}
                  className="px-2 py-1 rounded text-[9px] font-bold text-white/30"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
