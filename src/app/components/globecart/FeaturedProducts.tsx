import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { ShoppingCart, Star, Heart, Eye, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface Product {
  id: number;
  flag: string;
  country: string;
  name: string;
  category: string;
  price: string;
  priceNum: number;
  originalPrice?: string;
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  gradient: string;
  accent: string;
  icon: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    flag: '🇯🇵',
    country: 'Japan',
    name: 'Sony WF-1000XM5 ANC Earbuds',
    category: 'Electronics',
    price: '$279',
    priceNum: 279,
    originalPrice: '$349',
    rating: 4.9,
    reviews: 8420,
    badge: 'Best Seller',
    badgeColor: '#00d4ff',
    gradient: 'linear-gradient(135deg, #0a001a 0%, #1e0050 60%, #3d0099 100%)',
    accent: '#8b5cf6',
    icon: '🎧',
  },
  {
    id: 2,
    flag: '🇰🇷',
    country: 'South Korea',
    name: 'COSRX Advanced Snail 96 Mucin',
    category: 'Skincare',
    price: '$28',
    priceNum: 28,
    rating: 4.8,
    reviews: 22100,
    badge: 'Viral',
    badgeColor: '#ec4899',
    gradient: 'linear-gradient(135deg, #1a0010 0%, #5a0040 60%, #c00080 100%)',
    accent: '#f472b6',
    icon: '✨',
  },
  {
    id: 3,
    flag: '🇮🇹',
    country: 'Italy',
    name: 'Artisan Full-Grain Leather Tote',
    category: 'Fashion',
    price: '$345',
    priceNum: 345,
    rating: 4.7,
    reviews: 3200,
    badge: 'Handmade',
    badgeColor: '#f97316',
    gradient: 'linear-gradient(135deg, #1a0500 0%, #5a1500 60%, #b03000 100%)',
    accent: '#f97316',
    icon: '👜',
  },
  {
    id: 4,
    flag: '🇨🇭',
    country: 'Switzerland',
    name: 'Hamilton Khaki Field Auto 38mm',
    category: 'Watches',
    price: '$495',
    priceNum: 495,
    originalPrice: '$595',
    rating: 4.9,
    reviews: 5670,
    badge: 'Premium',
    badgeColor: '#38bdf8',
    gradient: 'linear-gradient(135deg, #000e20 0%, #003060 60%, #005080 100%)',
    accent: '#38bdf8',
    icon: '⌚',
  },
  {
    id: 5,
    flag: '🇦🇪',
    country: 'Dubai',
    name: '14K Gold Cuban Link Chain 20"',
    category: 'Jewelry',
    price: '$680',
    priceNum: 680,
    rating: 4.8,
    reviews: 1890,
    badge: 'Luxury',
    badgeColor: '#f59e0b',
    gradient: 'linear-gradient(135deg, #1a0d00 0%, #5a3000 60%, #a06000 100%)',
    accent: '#f59e0b',
    icon: '💎',
  },
  {
    id: 6,
    flag: '🇧🇷',
    country: 'Brazil',
    name: 'Havaianas × Artist Collab Edition',
    category: 'Footwear',
    price: '$65',
    priceNum: 65,
    rating: 4.6,
    reviews: 7340,
    badge: 'Limited',
    badgeColor: '#4ade80',
    gradient: 'linear-gradient(135deg, #001500 0%, #003800 60%, #006600 100%)',
    accent: '#4ade80',
    icon: '👟',
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.priceNum,
      image: product.icon,
      description: `${product.category} from ${product.country}`,
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
      country: product.country,
      flag: product.flag,
    });
    setAdded(true);
    setTimeout(() => { setAdded(false); navigate('/cart'); }, 1000);
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden flex-shrink-0" style={{ background: product.gradient }}>
        {/* Main icon */}
        <div
          className="absolute inset-0 flex items-center justify-center text-7xl select-none"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }}
        >
          {product.icon}
        </div>

        {/* Decorative glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at 70% 30%, ${product.accent}, transparent 60%)` }}
        />

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: `${product.badgeColor}25`, border: `1px solid ${product.badgeColor}50`, color: product.badgeColor }}
          >
            {product.badge}
          </div>
        )}

        {/* Original price ribbon */}
        {product.originalPrice && (
          <div
            className="absolute top-4 right-4 px-2 py-1 rounded-lg text-xs text-white/60 line-through"
            style={{ background: 'rgba(0,0,0,0.4)' }}
          >
            {product.originalPrice}
          </div>
        )}

        {/* Wishlist & Quick view (show on hover) */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={e => { e.stopPropagation(); setWishlisted(!wishlisted); }}
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          >
            <Heart
              className="w-4 h-4"
              style={{ color: wishlisted ? '#ec4899' : 'rgba(255,255,255,0.7)', fill: wishlisted ? '#ec4899' : 'none' }}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          >
            <Eye className="w-4 h-4 text-white/70" />
          </motion.button>
        </div>

        {/* Hover bottom glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to top, ${product.accent}20, transparent 50%)` }}
        />
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Country tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">{product.flag}</span>
          <span className="text-xs text-white/40">{product.country}</span>
          <span className="text-white/20">·</span>
          <span className="text-xs text-white/40">{product.category}</span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-white mb-3 line-clamp-2 leading-snug flex-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(s => (
              <Star
                key={s}
                className="w-3.5 h-3.5"
                style={{
                  color: s <= Math.floor(product.rating) ? '#f59e0b' : 'rgba(255,255,255,0.15)',
                  fill: s <= Math.floor(product.rating) ? '#f59e0b' : 'none',
                }}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-white/60">{product.rating}</span>
          <span className="text-xs text-white/30">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-xl font-bold text-white">{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-white/30 ml-2 line-through">{product.originalPrice}</span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-300"
            style={{
              background: added ? `${product.accent}30` : `${product.accent}20`,
              border: `1px solid ${product.accent}40`,
              boxShadow: added ? `0 0 16px ${product.accent}30` : 'none',
            }}
          >
            {added ? (
              <>
                <Zap className="w-3.5 h-3.5" style={{ color: product.accent }} />
                <span style={{ color: product.accent }}>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" style={{ color: product.accent }} />
                <span style={{ color: product.accent }}>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 30px ${product.accent}20, inset 0 0 0 1px ${product.accent}20` }}
      />
    </motion.div>
  );
}

export function FeaturedProducts() {
  const navigate = useNavigate();
  return (
    <section
      className="py-28 relative"
      style={{ background: 'linear-gradient(180deg, #05050f 0%, #070718 50%, #05050f 100%)' }}
    >
      {/* Decorative glows */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.4), transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6"
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-5"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff' }}
            >
              <Zap className="w-3.5 h-3.5" />
              Curated Globally
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Featured{' '}
              <span style={{ background: 'linear-gradient(90deg,#00d4ff,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Products
              </span>
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white self-start sm:self-auto"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            View All Products
          </motion.button>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
