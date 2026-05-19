import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { label: 'Products',  path: '/products' },
  { label: 'Deals',     path: '/deals' },
  { label: 'Sell',      path: '/sell' },
  { label: 'My Orders', path: '/orders' },
  { label: 'About',     path: '/about' },
  { label: 'Contact',   path: '/contact' },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Header() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { getCartCount }     = useCart();
  const { getWishlistCount } = useWishlist();
  const { user, logout }     = useAuth();
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [searchOpen,    setSearchOpen]    = useState(false);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [userMenuOpen,  setUserMenuOpen]  = useState(false);

  const cartCount     = getCartCount();
  const wishlistCount = getWishlistCount();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/products?q=${encodeURIComponent(q)}`);
    setSearchQuery('');
    setSearchOpen(false);
    setMobileOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="sticky top-0 z-50"
    >
      <div
        className="transition-all duration-300"
        style={{
          background:     scrolled ? 'rgba(255,255,255,0.92)' : '#ffffff',
          borderBottom:   '1px solid #e4e4e7',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="text-xl font-bold tracking-tight text-[#0a0a0a] hover:opacity-70 transition-opacity"
            >
              Vendr
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: isActive(item.path) ? '#0a0a0a' : '#71717a' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a'; }}
                  onMouseLeave={e => { if (!isActive(item.path)) (e.currentTarget as HTMLElement).style.color = '#71717a'; }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="p-2 rounded-lg text-[#71717a] hover:text-[#0a0a0a] hover:bg-[#f4f4f5] transition-all"
                aria-label="Search"
              >
                <Search style={{ width: '1.05rem', height: '1.05rem' }} />
              </button>

              <button
                onClick={() => navigate('/wishlist')}
                className="relative p-2 rounded-lg text-[#71717a] hover:text-[#0a0a0a] hover:bg-[#f4f4f5] transition-all"
                aria-label="Wishlist"
              >
                <Heart style={{ width: '1.05rem', height: '1.05rem' }} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[17px] h-[17px] bg-[#0a0a0a] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 rounded-lg text-[#71717a] hover:text-[#0a0a0a] hover:bg-[#f4f4f5] transition-all"
                aria-label="Cart"
              >
                <ShoppingCart style={{ width: '1.05rem', height: '1.05rem' }} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[17px] h-[17px] bg-[#0a0a0a] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User / Sign in */}
              {user ? (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setUserMenuOpen(v => !v)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e4e4e7] hover:bg-[#f4f4f5] transition-all text-sm"
                  >
                    <span className="w-6 h-6 bg-[#0a0a0a] text-white rounded-full flex items-center justify-center text-[11px] font-bold shrink-0">
                      {user.name[0].toUpperCase()}
                    </span>
                    <span className="text-[#0a0a0a] font-medium max-w-[80px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#e4e4e7] rounded-xl shadow-lg py-1.5 z-50">
                        <div className="px-3.5 py-2.5 border-b border-[#e4e4e7]">
                          <p className="text-xs font-semibold text-[#0a0a0a] truncate">{user.name}</p>
                          <p className="text-xs text-[#a1a1aa] truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="w-full text-left px-3.5 py-2.5 text-sm text-[#71717a] hover:text-[#0a0a0a] hover:bg-[#f4f4f5] transition-colors flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> Sign out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="hidden sm:block px-3.5 py-2 text-sm font-medium text-[#71717a] hover:text-[#0a0a0a] border border-[#e4e4e7] rounded-lg hover:bg-[#f4f4f5] transition-all"
                >
                  Sign in
                </button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/products')}
                className="hidden sm:block ml-1 px-4 py-2 bg-[#0a0a0a] text-white text-sm font-medium rounded-lg hover:bg-[#2a2a2a] transition-colors"
              >
                Shop now
              </motion.button>

              <button
                onClick={() => setMobileOpen(v => !v)}
                className="md:hidden p-2 text-[#71717a] hover:text-[#0a0a0a] transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Desktop search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                key="search"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <form onSubmit={handleSearch} className="pb-4">
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa]">
                    <Search className="w-4 h-4 text-[#a1a1aa] flex-shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="flex-1 bg-transparent text-sm text-[#0a0a0a] placeholder-[#a1a1aa] outline-none"
                    />
                    {searchQuery && (
                      <button type="button" onClick={() => setSearchQuery('')} className="text-[#a1a1aa] hover:text-[#0a0a0a]">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden overflow-hidden border-t border-[#e4e4e7] bg-white"
            >
              <div className="px-6 py-6 flex flex-col gap-1">
                <form onSubmit={handleSearch} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] mb-4">
                  <Search className="w-4 h-4 text-[#a1a1aa]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 bg-transparent text-sm text-[#0a0a0a] placeholder-[#a1a1aa] outline-none"
                  />
                </form>

                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.path}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => { navigate(item.path); setMobileOpen(false); }}
                    className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      color:      isActive(item.path) ? '#0a0a0a' : '#71717a',
                      background: isActive(item.path) ? '#f4f4f5'  : 'transparent',
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                <button
                  onClick={() => { navigate('/products'); setMobileOpen(false); }}
                  className="mt-4 px-5 py-3 bg-[#0a0a0a] text-white text-sm font-medium rounded-lg hover:bg-[#2a2a2a] transition-colors"
                >
                  Shop now
                </button>

                {/* Mobile auth */}
                {user ? (
                  <div className="mt-4 pt-4 border-t border-[#e4e4e7]">
                    <div className="flex items-center gap-3 px-2 py-2 mb-2">
                      <span className="w-8 h-8 bg-[#0a0a0a] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                        {user.name[0].toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#0a0a0a] truncate">{user.name}</p>
                        <p className="text-xs text-[#a1a1aa] truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-[#71717a] hover:text-[#0a0a0a] hover:bg-[#f4f4f5] transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 pt-4 border-t border-[#e4e4e7] flex flex-col gap-2">
                    <button
                      onClick={() => { navigate('/login'); setMobileOpen(false); }}
                      className="px-5 py-3 border border-[#e4e4e7] text-[#0a0a0a] text-sm font-medium rounded-lg hover:bg-[#f4f4f5] transition-colors"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={() => { navigate('/register'); setMobileOpen(false); }}
                      className="px-5 py-3 bg-[#0a0a0a] text-white text-sm font-medium rounded-lg hover:bg-[#2a2a2a] transition-colors"
                    >
                      Create account
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
