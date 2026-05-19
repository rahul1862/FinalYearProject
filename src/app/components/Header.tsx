import { Link } from 'react-router';
import { ShoppingCart, Menu, X, Search, User, Heart, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { CountrySelector } from './CountrySelector';

export function Header() {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY.current;
      const nearTop = currentScrollY < 24;
      const headerShouldStayVisible = mobileMenuOpen || searchOpen;

      if (headerShouldStayVisible || isScrollingUp || nearTop) {
        setIsVisible(true);
      } else if (currentScrollY - lastScrollY.current > 8) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen, searchOpen]);

  return (
    <header
      className={`bg-black/95 backdrop-blur-xl sticky top-0 z-50 shadow-lg border-b border-white/10 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold transition-colors flex items-center gap-2">
            <span className="text-red-600 text-2xl font-black">V</span>
            <span className="hidden sm:inline text-white">endr</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-neutral-400 hover:text-white text-sm transition-colors">Home</Link>
            <Link to="/products" className="text-neutral-400 hover:text-white text-sm transition-colors">Products</Link>
            <Link to="/pricing" className="text-neutral-400 hover:text-white text-sm transition-colors">Pricing</Link>
            <Link to="/comparison" className="text-neutral-400 hover:text-white text-sm transition-colors">Comparison</Link>
            <Link to="/deals" className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors">Deals</Link>
            <Link to="/about" className="text-neutral-400 hover:text-white text-sm transition-colors">About</Link>
            <Link to="/contact" className="text-neutral-400 hover:text-white text-sm transition-colors">Contact</Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-400" />
            </button>

            {/* Country Selector */}
            <div className="hidden sm:block">
              <CountrySelector />
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative hidden sm:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/10 transition-colors">
              <Heart className="w-5 h-5 text-gray-400" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-black">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-gray-300 font-medium">{user.name.split(' ')[0]}</span>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white">
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative group p-2 rounded-xl hover:bg-white/10 transition-colors">
              <ShoppingCart className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-400" />
              ) : (
                <Menu className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="hidden sm:block pb-6 border-t border-white/10">
            <div className="relative mt-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-white/10 bg-black/95 backdrop-blur-xl">
            <div className="pb-6 mb-6 border-b border-white/10">
              <CountrySelector />
            </div>

            {/* Mobile Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Link
                to="/"
                className="block py-3 text-gray-400 hover:text-white font-medium transition-colors hover:bg-white/5 rounded-lg px-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block py-3 text-gray-400 hover:text-white font-medium transition-colors hover:bg-white/5 rounded-lg px-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/pricing"
                className="block py-3 text-gray-400 hover:text-white font-medium transition-colors hover:bg-white/5 rounded-lg px-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/comparison"
                className="block py-3 text-gray-400 hover:text-white font-medium transition-colors hover:bg-white/5 rounded-lg px-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Comparison
              </Link>
              <Link
                to="/deals"
                className="block py-3 text-red-500 hover:text-red-400 font-bold transition-colors hover:bg-red-500/10 rounded-lg px-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                🔥 Deals
              </Link>
              <Link
                to="/about"
                className="block py-3 text-gray-400 hover:text-white font-medium transition-colors hover:bg-white/5 rounded-lg px-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block py-3 text-gray-400 hover:text-white font-medium transition-colors hover:bg-white/5 rounded-lg px-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/help"
                className="block py-3 text-gray-400 hover:text-white font-medium transition-colors hover:bg-white/5 rounded-lg px-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Help
              </Link>
              {user ? (
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 w-full py-3 text-gray-400 hover:text-white font-medium transition-colors hover:bg-white/5 rounded-lg px-4"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out ({user.name.split(' ')[0]})
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block py-3 text-red-500 hover:text-red-400 font-medium transition-colors hover:bg-red-500/10 rounded-lg px-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}