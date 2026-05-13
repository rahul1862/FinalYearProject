import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: '#050510' }}>
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-2"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <ShoppingBag className="w-9 h-9" style={{ color: 'rgba(255,255,255,0.25)' }} />
        </div>
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Add some products to get started.</p>
        <Link
          to="/products"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all duration-200"
          style={{ background: 'linear-gradient(135deg,#00b4d8,#7c3aed)', boxShadow: '0 0 24px rgba(0,180,216,0.2)' }}
        >
          Browse Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen" style={{ background: '#050510' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex gap-5 rounded-2xl p-5 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.2)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.category} · {item.flag} {item.country}</p>
                      <h3 className="font-semibold text-white text-base line-clamp-2">{item.name}</h3>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div
                        className="flex items-center gap-1 rounded-xl overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center transition-colors duration-200"
                          style={{ color: 'rgba(255,255,255,0.55)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center transition-colors duration-200"
                          style={{ color: 'rgba(255,255,255,0.55)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {/* Price + remove */}
                      <div className="text-right">
                        <div className="font-bold text-white text-base">${(item.price * item.quantity).toFixed(2)}</div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 text-xs mt-1 transition-colors duration-200"
                          style={{ color: 'rgba(255,255,255,0.3)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ec4899'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-1"
          >
            <div
              className="rounded-2xl p-6 sticky top-24"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h2 className="text-base font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-3 mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {[
                  { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                  { label: 'Shipping', value: shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` },
                  { label: 'Tax (8%)', value: `$${tax.toFixed(2)}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                    <span style={{ color: value === 'Free' ? '#00d4ff' : 'rgba(255,255,255,0.8)' }}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-white">Total</span>
                <span className="text-xl font-bold text-white">${total.toFixed(2)}</span>
              </div>

              {subtotal <= 100 && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs mb-5"
                  style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)', color: 'rgba(0,212,255,0.8)' }}
                >
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}

              <Link
                to="/checkout"
                className="block w-full text-center py-4 rounded-2xl text-sm font-semibold text-white mb-3 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg,#00b4d8,#7c3aed)', boxShadow: '0 0 24px rgba(0,180,216,0.2)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(0,180,216,0.35)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(0,180,216,0.2)'; }}
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/products"
                className="block w-full text-center py-3 rounded-2xl text-sm font-medium transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
