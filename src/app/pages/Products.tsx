import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Globe, Grid3X3, LayoutList, ArrowUpDown, Star, X } from 'lucide-react';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocalCountry, setSelectedLocalCountry] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q')?.trim() ?? '';
  const countryParam = searchParams.get('country')?.trim() ?? '';

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const countries = ['All', ...new Set(products.map(p => p.country))].sort();

  const activeCountryFilter = countryParam || selectedLocalCountry;

  const filteredProducts = products
    .filter(p => {
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const countryMatch = activeCountryFilter === 'All' || p.country === activeCountryFilter;
      const normalizedQuery = searchQuery.toLowerCase();
      const searchMatch = !normalizedQuery || [p.name, p.description, p.category, p.country].some(v => v.toLowerCase().includes(normalizedQuery));
      return categoryMatch && countryMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen" style={{ background: '#050510' }}>
      {/* Page header */}
      <div className="pt-16 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <div
                className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}
              >
                <Globe className="w-3 h-3" />
                Global Marketplace
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">All Products</h1>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>
                {products.length} items from {countries.length - 1} countries
              </p>
            </div>
            {(searchQuery || countryParam) && (
              <div className="flex gap-2 flex-wrap">
                {searchQuery && (
                  <button
                    onClick={() => setSearchParams(p => { p.delete('q'); return p; })}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
                  >
                    <X className="w-3.5 h-3.5" />
                    Clear: "{searchQuery}"
                  </button>
                )}
                {countryParam && (
                  <button
                    onClick={() => setSearchParams(p => { p.delete('country'); return p; })}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
                  >
                    <X className="w-3.5 h-3.5" />
                    Clear: {countryParam}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 space-y-5"
        >
          {/* Category filter */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                    style={
                      active
                        ? { background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.35)', color: '#00d4ff' }
                        : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }
                    }
                    onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.color = 'white'; } }}
                    onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; } }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Country filter (only when no URL country param) */}
          {!countryParam && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>Country</p>
              <div className="flex flex-wrap gap-2">
                {countries.map(country => {
                  const flag = products.find(p => p.country === country)?.flag;
                  const active = selectedLocalCountry === country;
                  return (
                    <button
                      key={country}
                      onClick={() => setSelectedLocalCountry(country)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                      style={
                        active
                          ? { background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.35)', color: '#a78bfa' }
                          : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }
                      }
                      onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.color = 'white'; } }}
                      onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; } }}
                    >
                      {country === 'All' ? '🌍' : <span>{flag}</span>}
                      {country === 'All' ? 'All Countries' : country}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active country param banner */}
          {countryParam && (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: 'rgba(255,255,255,0.6)' }}
            >
              <Globe className="w-4 h-4" style={{ color: '#a78bfa' }} />
              Showing products from <span className="text-white font-medium ml-1">{countryParam}</span>
            </div>
          )}
        </motion.div>

        {/* Product grid / list */}
        {filteredProducts.length > 0 ? (
          <>
            {/* Toolbar */}
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'}
                {searchQuery && <span> matching "<span className="text-white">{searchQuery}</span>"</span>}
              </p>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as SortOption)}
                    className="appearance-none text-sm px-4 py-2.5 pr-10 rounded-xl outline-none cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    <option value="default" style={{ background: '#050510' }}>Default</option>
                    <option value="price-asc" style={{ background: '#050510' }}>Price: Low → High</option>
                    <option value="price-desc" style={{ background: '#050510' }}>Price: High → Low</option>
                    <option value="rating" style={{ background: '#050510' }}>Top Rated</option>
                    <option value="name" style={{ background: '#050510' }}>A → Z</option>
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)' }} />
                </div>

                {/* View toggle */}
                <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  <button
                    onClick={() => setViewMode('grid')}
                    className="p-2.5 transition-all duration-200"
                    style={viewMode === 'grid' ? { background: 'rgba(0,212,255,0.15)', color: '#00d4ff' } : { color: 'rgba(255,255,255,0.4)' }}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className="p-2.5 transition-all duration-200"
                    style={viewMode === 'list' ? { background: 'rgba(0,212,255,0.15)', color: '#00d4ff' } : { color: 'rgba(255,255,255,0.4)' }}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <Link
                      to={`/products/${product.id}`}
                      className="flex gap-5 rounded-2xl overflow-hidden group transition-all duration-300"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.25)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(0,212,255,0.07)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      }}
                    >
                      <div className="w-36 h-36 shrink-0 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="py-5 pr-6 flex flex-col justify-center flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span>{product.flag}</span>
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{product.country}</span>
                          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{product.category}</span>
                        </div>
                        <h3 className="font-semibold text-white text-base mb-1 group-hover:text-cyan-300 transition-colors duration-200">{product.name}</h3>
                        <p className="text-sm line-clamp-2 mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>{product.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-base font-bold text-white">${product.price.toFixed(2)}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5" style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                            <span className="text-sm font-medium text-white">{product.rating}</span>
                            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>({product.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Globe className="w-7 h-7" style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.38)' }}>Try different filters or reset everything.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedLocalCountry('All'); }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                style={{ background: 'linear-gradient(135deg,#00b4d8,#7c3aed)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,180,216,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                Reset filters
              </button>
              <Link
                to="/"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                Back to home
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
