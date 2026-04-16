import { useState } from 'react';
import { Link } from 'react-router';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCountry } from '../context/CountryContext';
import { Globe, Grid3X3, LayoutList, ArrowUpDown, Star } from 'lucide-react';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocalCountry, setSelectedLocalCountry] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { selectedCountry: globalCountry } = useCountry();
  
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const countries = ['All', ...new Set(products.map(p => p.country))].sort();
  
  const activeCountryFilter = globalCountry || selectedLocalCountry;
  
  const filteredProducts = products
    .filter(p => {
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const countryMatch = activeCountryFilter === 'All' || p.country === activeCountryFilter;
      return categoryMatch && countryMatch;
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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Products</h1>
          <p className="text-neutral-400">
            {products.length} items from {countries.length - 1} countries
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filters */}
        <div className="mb-8 space-y-5">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
          </div>

            {!globalCountry && (
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Country</label>
                <div className="flex flex-wrap gap-2">
                  {countries.map(country => {
                    const product = products.find(p => p.country === country);
                    return (
                      <button
                        key={country}
                        onClick={() => setSelectedLocalCountry(country)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
                          selectedLocalCountry === country
                            ? 'bg-red-600 text-white'
                            : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        }`}
                      >
                        {country === 'All' ? (
                          <>
                            🌍 All Countries
                          </>
                        ) : (
                          <>
                            <span className="text-lg">{product?.flag}</span>
                            {country}
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {globalCountry && (
              <div className="px-4 py-3 bg-neutral-800 rounded-lg text-sm">
                <span className="text-neutral-300">Showing products from </span>
                <span className="text-white font-medium">{globalCountry}</span>
                <span className="text-neutral-500"> (change in header)</span>
              </div>
            )}
        </div>

      {/* Products Grid */}
      <div>
        {filteredProducts.length > 0 ? (
          <>
            {/* Toolbar: count + sort + view toggle */}
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-neutral-400 text-sm">{filteredProducts.length} products</p>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
                  >
                    <option value="default" className="bg-[#141414]">Default</option>
                    <option value="price-asc" className="bg-[#141414]">Price: Low → High</option>
                    <option value="price-desc" className="bg-[#141414]">Price: High → Low</option>
                    <option value="rating" className="bg-[#141414]">Top Rated</option>
                    <option value="name" className="bg-[#141414]">A → Z</option>
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    className="flex gap-5 bg-[#141414] rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors overflow-hidden group animate-fade-in"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="w-40 h-40 shrink-0 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="py-5 pr-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{product.flag}</span>
                        <span className="text-gray-500 text-sm">{product.country}</span>
                        <span className="text-gray-600 text-sm">•</span>
                        <span className="text-gray-500 text-sm">{product.category}</span>
                      </div>
                      <h3 className="text-white font-bold text-lg group-hover:text-red-400 transition-colors">{product.name}</h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-white font-bold text-lg">${product.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-red-500 text-red-500" />
                          <span className="text-gray-300 text-sm font-medium">{product.rating}</span>
                          <span className="text-gray-500 text-sm">({product.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Try different filters or reset everything.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedLocalCountry('All');
                }}
                className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Reset filters
              </button>
              <Link
                to="/"
                className="bg-neutral-800 text-white px-5 py-2.5 rounded-lg hover:bg-neutral-700 transition-colors text-sm font-medium"
              >
                Back to home
              </Link>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}