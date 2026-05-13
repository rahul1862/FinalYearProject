import { Link } from 'react-router';
import { ArrowRight, Star, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useState } from 'react';

const reviews = [
  { name: 'Aisha M.', location: 'London', text: 'The Moroccan rug I ordered showed up in four days. Genuinely impressed with how well it was packaged too.', rating: 5 },
  { name: 'Carlos R.', location: 'São Paulo', text: 'Bought a few things over the past year. Quality has been consistent, which is rare for international shipping.', rating: 4 },
  { name: 'Yuki T.', location: 'Tokyo', text: 'I was skeptical about the skincare products being authentic but they were the real deal. Would order again.', rating: 5 },
  { name: 'Priya K.', location: 'Mumbai', text: 'Decent selection and reasonable prices. Shipping to India took about a week, which is fine.', rating: 4 },
];

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80', span: 'col-span-2 row-span-2' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1650542218150-5e59a58d4312?w=600&q=80', span: '' },
  { name: 'Home', image: 'https://images.unsplash.com/photo-1657524520861-0b2690efc2b2?w=600&q=80', span: '' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1686831451322-8d8e234a51e1?w=600&q=80', span: 'row-span-2' },
  { name: 'Food', image: 'https://images.unsplash.com/photo-1505498753650-ac9cb50b158d?w=600&q=80', span: '' },
];

export function Home() {
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(8, 14);
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[0.95] text-white">
                Products worth
                <br />
                crossing borders for
              </h1>

              <p className="text-lg mb-10 text-neutral-400 leading-relaxed max-w-lg">
                We work with makers and sellers in {' '}
                <span className="text-neutral-200">14 countries</span> to bring you
                things you won't find at your local mall.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-14">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-7 py-3.5 rounded-lg hover:bg-red-700 transition-colors font-semibold text-base"
                >
                  Browse products
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/deals"
                  className="inline-flex items-center justify-center gap-2 text-neutral-300 px-7 py-3.5 rounded-lg hover:bg-white/5 transition-colors font-medium border border-neutral-700"
                >
                  See current deals
                </Link>
              </div>

              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-red-500 text-red-500" />)}
                </div>
                <span>Based on 12,000+ reviews</span>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden aspect-[3/4]">
                    <img src={products[3]?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-square">
                    <img src={products[9]?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-3 pt-8">
                  <div className="rounded-xl overflow-hidden aspect-square">
                    <img src={products[5]?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-[3/4]">
                    <img src={products[7]?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-bold text-white">Shop by category</h2>
            <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors text-sm">
              All categories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] gap-3">
            {categories.map((cat) => (
              <Link
                to="/products"
                key={cat.name}
                className={`group relative rounded-xl overflow-hidden ${cat.span}`}
              >
                <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-white text-lg font-semibold">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white">Popular right now</h2>
              <p className="text-neutral-500 mt-2">What other people are buying this week</p>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-white">New arrivals</h2>
            <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors">
              See more <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory">
          {newArrivals.map((product) => (
            <div key={product.id} className="min-w-[260px] sm:min-w-[300px] snap-start shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Info strip */}
      <section className="border-y border-neutral-800 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
            {[
              { label: 'Free shipping', detail: 'On orders over $99' },
              { label: 'Verified sellers', detail: 'Every product checked' },
              { label: 'Fast delivery', detail: '5-10 business days' },
              { label: 'Easy returns', detail: '30-day return window' },
            ].map((item) => (
              <div key={item.label} className="py-6 lg:px-6">
                <p className="text-white text-sm font-medium">{item.label}</p>
                <p className="text-neutral-500 text-sm mt-0.5">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-10">What customers are saying</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((t, i) => (
              <div key={i} className="bg-[#141414] rounded-xl p-6 border border-neutral-800">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? 'fill-red-500 text-red-500' : 'text-neutral-700'}`} />
                  ))}
                </div>
                <p className="text-neutral-300 leading-relaxed mb-4">{t.text}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 text-xs font-medium">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-neutral-600 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-black">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Stay in the loop</h2>
          <p className="text-neutral-400 mb-8">
            We send one email a week with new products and occasional deals. That's it.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setEmail(''); alert('Thanks! You\'re signed up.'); }} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 text-sm"
            />
            <button type="submit" className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}