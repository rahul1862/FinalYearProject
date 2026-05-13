import { Link } from 'react-router';
import { ArrowRight, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
  { name: 'Fashion',     image: 'https://images.unsplash.com/photo-1650542218150-5e59a58d4312?w=600&q=80', span: '' },
  { name: 'Home',        image: 'https://images.unsplash.com/photo-1657524520861-0b2690efc2b2?w=600&q=80', span: '' },
  { name: 'Beauty',      image: 'https://images.unsplash.com/photo-1686831451322-8d8e234a51e1?w=600&q=80', span: 'row-span-2' },
  { name: 'Food',        image: 'https://images.unsplash.com/photo-1505498753650-ac9cb50b158d?w=600&q=80', span: '' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
};

export function Home() {
  const featuredProducts = products.slice(0, 4);
  const newArrivals      = products.slice(8, 14);
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center bg-[#fafafa] border-b border-[#e4e4e7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a1a1aa] mb-7">
                14 countries · 150+ destinations
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-7 leading-[0.93] text-[#0a0a0a] tracking-tight">
                Products worth<br />crossing borders<br />for
              </h1>
              <p className="text-lg mb-10 text-[#71717a] leading-relaxed max-w-md">
                We work with makers and sellers in 14 countries to bring you things you won't find at your local mall.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-7 py-3.5 rounded-lg hover:bg-[#2a2a2a] transition-colors font-medium text-sm"
                >
                  Browse products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/deals"
                  className="inline-flex items-center justify-center gap-2 text-[#0a0a0a] px-7 py-3.5 rounded-lg hover:bg-[#f4f4f5] transition-colors font-medium text-sm border border-[#e4e4e7]"
                >
                  See current deals
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>Based on 12,000+ reviews</span>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden aspect-[3/4] bg-[#f0f0f0]">
                    <img src={products[3]?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-square bg-[#f0f0f0]">
                    <img src={products[9]?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-3 pt-8">
                  <div className="rounded-xl overflow-hidden aspect-square bg-[#f0f0f0]">
                    <img src={products[5]?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-[3/4] bg-[#f0f0f0]">
                    <img src={products[7]?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="border-b border-[#e4e4e7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#e4e4e7]">
            <div className="py-6 px-4 lg:px-6">
              <p className="text-[#0a0a0a] text-sm font-medium">Free shipping</p>
              <p className="text-[#a1a1aa] text-sm mt-0.5">On orders over $99</p>
            </div>
            <div className="py-6 px-4 lg:px-6">
              <p className="text-[#0a0a0a] text-sm font-medium">Verified sellers</p>
              <p className="text-[#a1a1aa] text-sm mt-0.5">Every product checked</p>
            </div>
            <div className="py-6 px-4 lg:px-6">
              <p className="text-[#0a0a0a] text-sm font-medium">Fast delivery</p>
              <p className="text-[#a1a1aa] text-sm mt-0.5">5–10 business days</p>
            </div>
            <div className="py-6 px-4 lg:px-6">
              <p className="text-[#0a0a0a] text-sm font-medium">Easy returns</p>
              <p className="text-[#a1a1aa] text-sm mt-0.5">30-day window</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-end justify-between mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-bold text-[#0a0a0a] tracking-tight">Popular right now</h2>
              <p className="text-[#71717a] mt-2 text-sm">What other people are buying this week</p>
            </div>
            <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-sm text-[#71717a] hover:text-[#0a0a0a] transition-colors">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {featuredProducts.map(product => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-20 bg-[#fafafa] border-y border-[#e4e4e7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-end justify-between mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#0a0a0a] tracking-tight">Shop by category</h2>
            <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-[#71717a] hover:text-[#0a0a0a] transition-colors text-sm">
              All categories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] gap-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                className={cat.span}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to="/products" className="group relative rounded-xl overflow-hidden block h-full">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="text-white text-base font-semibold">{cat.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <motion.div
            className="flex items-end justify-between"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#0a0a0a] tracking-tight">New arrivals</h2>
            <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-sm text-[#71717a] hover:text-[#0a0a0a] transition-colors">
              See more <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory">
          {newArrivals.map(product => (
            <div key={product.id} className="min-w-[260px] sm:min-w-[300px] snap-start shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 bg-[#fafafa] border-y border-[#e4e4e7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-[#0a0a0a] mb-10 tracking-tight"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            What customers are saying
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {reviews.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-xl p-6 border border-[#e4e4e7]">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? 'fill-amber-400 text-amber-400' : 'text-[#e4e4e7]'}`} />
                  ))}
                </div>
                <p className="text-[#3f3f46] leading-relaxed mb-4 text-sm">{t.text}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#f4f4f5] border border-[#e4e4e7] flex items-center justify-center text-[#71717a] text-xs font-semibold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-[#0a0a0a] text-sm font-medium">{t.name}</p>
                    <p className="text-[#a1a1aa] text-xs">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-24 bg-[#0a0a0a]">
        <motion.div
          className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Stay in the loop</h2>
          <p className="text-[#71717a] mb-8 text-sm">
            We send one email a week with new products and occasional deals. That's it.
          </p>
          <form
            onSubmit={e => { e.preventDefault(); setEmail(''); alert("Thanks! You're signed up."); }}
            className="flex gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 text-sm transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-[#0a0a0a] px-5 py-3 rounded-lg hover:bg-[#f0f0f0] transition-colors font-medium text-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
