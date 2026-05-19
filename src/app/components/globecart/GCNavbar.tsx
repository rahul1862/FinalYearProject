import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router';
import { ShoppingCart, Search, Menu, X, Sparkles, Globe } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

interface NavLink {
  label: string;
  sectionId?: string;
  path?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Explore',   sectionId: 'hero' },
  { label: 'Countries', sectionId: 'countries' },
  { label: 'AI Shop',   sectionId: 'ai-shop' },
  { label: 'Trending',  sectionId: 'featured' },
  { label: 'Deals',     path: '/deals' },
];

export function GCNavbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate  = useNavigate();
  const location  = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const isHome    = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLink = (link: NavLink) => {
    setOpen(false);
    if (link.path) {
      navigate(link.path);
      return;
    }
    if (link.sectionId) {
      if (isHome) {
        scrollTo(link.sectionId);
      } else {
        // Navigate home first, then scroll after paint
        navigate('/');
        setTimeout(() => scrollTo(link.sectionId!), 200);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchVal.trim();
    if (!q) return;
    navigate(`/products?q=${encodeURIComponent(q)}`);
    setSearchVal('');
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="transition-all duration-500"
        style={{
          background:    scrolled ? 'rgba(5,5,16,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom:  scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
          boxShadow:     scrolled ? '0 0 40px rgba(0,212,255,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <button
              onClick={() => { isHome ? scrollTo('hero') : navigate('/'); }}
              className="flex items-center gap-3 flex-shrink-0 group"
            >
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)' }}
                >
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)' }}
                />
              </div>
              <span className="text-xl font-bold text-white">
                Globe
                <span style={{ background: 'linear-gradient(90deg,#00d4ff,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Cart
                </span>
              </span>
            </button>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleLink(link)}
                  className="relative text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
                    style={{ background: 'linear-gradient(90deg,#00d4ff,#8b5cf6)' }}
                  />
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Search form */}
              <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Search className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search products..."
                  className="bg-transparent text-xs text-white placeholder-white/30 outline-none w-28 focus:w-44 transition-all duration-300"
                />
              </form>

              {/* Cart */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2.5 rounded-xl transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.4)';
                  (e.currentTarget as HTMLElement).style.boxShadow   = '0 0 16px rgba(0,212,255,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLElement).style.boxShadow   = 'none';
                }}
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Start Exploring CTA */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/products')}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg,#00b4d8,#8b5cf6)', boxShadow: '0 0 20px rgba(0,180,216,0.28)' }}
              >
                <Sparkles className="w-4 h-4" />
                Start Exploring
              </motion.button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 text-white/80 hover:text-white"
                onClick={() => setOpen(!open)}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
              style={{ background: 'rgba(5,5,16,0.97)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {/* Mobile search */}
                <form onSubmit={handleSearch} className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Search className="w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                  />
                </form>

                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleLink(link)}
                    className="text-white/70 hover:text-white font-medium text-base text-left"
                  >
                    {link.label}
                  </motion.button>
                ))}

                <button
                  onClick={() => { navigate('/products'); setOpen(false); }}
                  className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white mt-2"
                  style={{ background: 'linear-gradient(135deg,#00b4d8,#8b5cf6)' }}
                >
                  <Sparkles className="w-4 h-4" />
                  Start Exploring
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
