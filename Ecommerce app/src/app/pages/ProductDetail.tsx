import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { recordView } from '../utils/recentlyViewed';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Heart, ArrowLeft, Shield, Truck, RotateCcw, Award } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === Number(id));
  const isWishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => { if (product) recordView(product); }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: '#050510' }}>
        <h1 className="text-4xl font-bold text-white">Product not found</h1>
        <Link
          to="/products"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all duration-200"
          style={{ background: 'linear-gradient(135deg,#00b4d8,#7c3aed)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const relatedProducts = products.filter(p => p.country === product.country && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen" style={{ background: '#050510' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-all duration-200 group"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#00d4ff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="aspect-square rounded-3xl overflow-hidden relative group"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Country badge */}
              <div
                className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-white"
                style={{ background: 'rgba(5,5,16,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <span>{product.flag}</span>
                <span>{product.country}</span>
              </div>
              {/* Wishlist button */}
              <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: isWishlisted ? 'rgba(236,72,153,0.2)' : 'rgba(5,5,16,0.7)',
                  border: isWishlisted ? '1px solid rgba(236,72,153,0.4)' : '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={e => { if (!isWishlisted) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(236,72,153,0.35)'; }}
                onMouseLeave={e => { if (!isWishlisted) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
              >
                <Heart
                  className="w-5 h-5"
                  style={{ color: isWishlisted ? '#ec4899' : 'rgba(255,255,255,0.7)', fill: isWishlisted ? '#ec4899' : 'none' }}
                />
              </button>
            </div>

            {/* Thumbnail placeholders */}
            <div className="flex gap-3 mt-4">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)', border: i === 0 ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.08)' }}
                >
                  {i === 0 && <img src={product.image} alt="" className="w-full h-full object-cover opacity-70" />}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>{product.category}</p>
              <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      style={{
                        color: i < Math.floor(product.rating) ? '#f59e0b' : 'rgba(255,255,255,0.15)',
                        fill: i < Math.floor(product.rating) ? '#f59e0b' : 'none',
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-white">{product.rating}</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>{product.reviews} reviews</span>
              </div>

              <div className="text-4xl font-bold text-white mb-5">${product.price.toFixed(2)}</div>

              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{product.description}</p>
            </div>

            {/* Quantity selector */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.38)' }}>Quantity</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-medium transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-white text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-lg font-medium transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Total: <span className="text-white font-semibold">${(product.price * quantity).toFixed(2)}</span>
                </span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-semibold text-white transition-all duration-200"
                style={{ background: addedToCart ? 'rgba(0,212,255,0.2)' : 'linear-gradient(135deg,#00b4d8,#7c3aed)', boxShadow: addedToCart ? 'none' : '0 0 30px rgba(0,180,216,0.25)' }}
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
              </motion.button>

              <button
                onClick={handleWishlist}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-semibold transition-all duration-200"
                style={
                  isWishlisted
                    ? { background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.35)', color: '#ec4899' }
                    : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)' }
                }
                onMouseEnter={e => { if (!isWishlisted) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(236,72,153,0.3)'; (e.currentTarget as HTMLElement).style.color = '#ec4899'; } }}
                onMouseLeave={e => { if (!isWishlisted) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; } }}
              >
                <Heart className="w-5 h-5" style={{ fill: isWishlisted ? '#ec4899' : 'none' }} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Details */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.38)' }}>Included</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Truck, label: 'Free shipping on $100+' },
                  { icon: RotateCcw, label: '30-day returns' },
                  { icon: Shield, label: '1-year warranty' },
                  { icon: Award, label: 'Authenticity guaranteed' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <Icon className="w-4 h-4 shrink-0" style={{ color: '#00d4ff' }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xl">{product.flag}</span>
              <h2 className="text-xl font-bold text-white">More from {product.country}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.35 + i * 0.06 }}
                >
                  <Link
                    to={`/products/${p.id}`}
                    className="block rounded-2xl overflow-hidden group transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.25)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                  >
                    <div className="aspect-square overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{p.category}</p>
                      <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2">{p.name}</h3>
                      <span className="text-sm font-bold text-white">${p.price.toFixed(2)}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
