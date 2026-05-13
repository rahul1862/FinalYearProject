import { useState, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, ShoppingBag, Search, LayoutDashboard, Heart, MapPin,
  CreditCard, Settings, LogOut, ChevronDown, ChevronUp, Download,
  RotateCcw, MessageSquare, Truck, CheckCircle, Clock, Menu, X,
  ShoppingCart, Zap, TrendingUp, Star, ArrowRight, RefreshCw,
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import type { Order } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import type { Product } from '../context/CartContext';
import { products } from '../data/products';
import { getRecentlyViewed } from '../utils/recentlyViewed';

// ── Types ──────────────────────────────────────────────────────────────────
type FilterMode = 'all' | 'active' | 'Delivered' | 'Cancelled';
type SortMode = 'latest' | 'oldest' | 'highest';

// ── Constants ──────────────────────────────────────────────────────────────
const TIMELINE_STEPS = ['Ordered', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

const STATUS_STEP: Record<string, number> = {
  Processing: 0, Packed: 1, Shipped: 2, 'Out for Delivery': 3, Delivered: 4,
};

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  Processing:        { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b',  border: 'rgba(245,158,11,0.3)' },
  Packed:            { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa',  border: 'rgba(59,130,246,0.3)' },
  Shipped:           { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa',  border: 'rgba(59,130,246,0.3)' },
  'Out for Delivery':{ bg: 'rgba(0,212,255,0.12)',   color: '#00d4ff',  border: 'rgba(0,212,255,0.3)' },
  Delivered:         { bg: 'rgba(34,197,94,0.12)',   color: '#22c55e',  border: 'rgba(34,197,94,0.3)' },
  Cancelled:         { bg: 'rgba(239,68,68,0.12)',   color: '#ef4444',  border: 'rgba(239,68,68,0.3)' },
  Returned:          { bg: 'rgba(168,85,247,0.12)',  color: '#a855f7',  border: 'rgba(168,85,247,0.3)' },
};

const SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: 'Dashboard',      path: '/' },
  { icon: Package,         label: 'My Orders',       path: '/orders' },
  { icon: Heart,           label: 'Wishlist',         path: '/wishlist' },
  { icon: MapPin,          label: 'Addresses',        path: null },
  { icon: CreditCard,      label: 'Payment Methods',  path: null },
  { icon: Settings,        label: 'Settings',         path: null },
];

const trending   = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 10);
const flashDeals = products.filter(p => p.price < 80).slice(0, 10);

// ── Timeline ───────────────────────────────────────────────────────────────
function Timeline({ status }: { status: string }) {
  const step = STATUS_STEP[status] ?? -1;
  if (step < 0) return null;
  return (
    <div className="py-5">
      <div className="flex items-start">
        {TIMELINE_STEPS.map((label, i) => {
          const done   = i <= step;
          const active = i === step;
          return (
            <div key={label} className="flex items-start flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <motion.div
                  initial={false}
                  animate={{
                    background: done ? 'linear-gradient(135deg,#00b4d8,#7c3aed)' : 'rgba(255,255,255,0.07)',
                    boxShadow:  active ? '0 0 14px rgba(0,212,255,0.45)' : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ border: done ? 'none' : '1px solid rgba(255,255,255,0.12)' }}
                >
                  {done
                    ? <CheckCircle className="w-4 h-4 text-white" />
                    : <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />}
                </motion.div>
                <span
                  className="text-[9px] font-medium text-center leading-tight"
                  style={{ color: done ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)', maxWidth: 52 }}
                >
                  {label}
                </span>
              </div>
              {i < TIMELINE_STEPS.length - 1 && (
                <div
                  className="flex-1 h-[2px] mt-4 mx-1"
                  style={{ background: i < step ? 'linear-gradient(90deg,#00b4d8,#7c3aed)' : 'rgba(255,255,255,0.07)' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Action button ──────────────────────────────────────────────────────────
function ActionBtn({
  icon: Icon, label, onClick, primary = false, danger = false,
}: {
  icon: React.ElementType; label: string; onClick: () => void;
  primary?: boolean; danger?: boolean;
}) {
  const style = primary
    ? { background: 'linear-gradient(135deg,#00b4d8,#7c3aed)', color: 'white', border: 'none' }
    : danger
    ? { background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)' }
    : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.1)' };
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
      style={style}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </motion.button>
  );
}

// ── Order card ─────────────────────────────────────────────────────────────
function OrderCard({
  order, onCancel, onReturn, onBuyAgain, onInvoice, onReview,
}: {
  order: Order;
  onCancel: () => void; onReturn: () => void; onBuyAgain: () => void;
  onInvoice: () => void; onReview: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const status    = order.status ?? 'Processing';
  const style     = STATUS_STYLE[status] ?? STATUS_STYLE['Processing'];
  const isClosed  = ['Cancelled', 'Returned'].includes(status);
  const isActive  = !['Delivered', 'Cancelled', 'Returned'].includes(status);
  const isDelivered = status === 'Delivered';

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors"
        style={{ background: expanded ? 'rgba(255,255,255,0.015)' : 'transparent' }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: style.bg, border: `1px solid ${style.border}` }}
        >
          <Package className="w-5 h-5" style={{ color: style.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-white">{order.id}</p>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
            >
              {status}
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
            {fmtDate(order.date)}
            {order.estimatedDelivery && !isClosed
              ? ` · Est. ${fmtDate(order.estimatedDelivery)}`
              : ''}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white">${order.total.toFixed(2)}</p>
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
            </p>
          </div>
          {expanded
            ? <ChevronUp  className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.38)' }} />
            : <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.38)' }} />}
        </div>
      </button>

      {/* Expanded body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {/* Timeline or cancelled banner */}
              {!isClosed
                ? <Timeline status={status} />
                : (
                  <div className="flex items-center gap-2 py-4">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: style.bg }}
                    >
                      <X className="w-3.5 h-3.5" style={{ color: style.color }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: style.color }}>
                      Order {status.toLowerCase()}
                    </span>
                  </div>
                )}

              {/* Items */}
              <div className="space-y-3 mb-5">
                {order.items.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div
                      className="w-14 h-14 rounded-xl overflow-hidden shrink-0"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                        {item.flag} {item.country} · Qty {item.quantity}
                      </p>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-2.5 h-2.5"
                            style={{
                              color: i < Math.floor(item.rating) ? '#f59e0b' : 'rgba(255,255,255,0.12)',
                              fill:  i < Math.floor(item.rating) ? '#f59e0b' : 'none',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-bold text-white shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals + shipping */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Subtotal', val: `$${order.subtotal.toFixed(2)}` },
                    { label: 'Shipping', val: order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}` },
                    { label: 'Tax',      val: `$${order.tax.toFixed(2)}` },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between">
                      <span style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
                      <span style={{ color: val === 'Free' ? '#00d4ff' : 'rgba(255,255,255,0.7)' }}>{val}</span>
                    </div>
                  ))}
                  <div
                    className="flex justify-between pt-2 font-bold text-white"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-xs space-y-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <p className="text-white font-semibold text-sm mb-2">Shipped to</p>
                  <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                  <p>{order.shippingInfo.address}</p>
                  <p>{order.shippingInfo.city}, {order.shippingInfo.zipCode}</p>
                  <p className="pt-0.5">{order.shippingInfo.email}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {isActive && (
                  <>
                    <ActionBtn primary icon={Truck} label="Track Order" onClick={() => {}} />
                    <ActionBtn danger  icon={X}     label="Cancel Order" onClick={onCancel} />
                  </>
                )}
                {isDelivered && (
                  <>
                    <ActionBtn icon={MessageSquare} label="Leave Review"      onClick={onReview} />
                    <ActionBtn icon={RotateCcw}     label="Return Item"       onClick={onReturn} />
                    <ActionBtn icon={Download}      label="Download Invoice"  onClick={onInvoice} />
                  </>
                )}
                <ActionBtn icon={RefreshCw} label="Buy Again" onClick={onBuyAgain} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon, label, value, color,
}: { icon: React.ElementType; label: string; value: string | number; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: `0 8px 32px ${color}22` }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl p-4 flex items-center gap-3"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}28` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-xl font-bold text-white leading-none mb-0.5">{value}</p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{label}</p>
      </div>
    </motion.div>
  );
}

// ── Product mini card ──────────────────────────────────────────────────────
function ProductMiniCard({ product }: { product: Product }) {
  const navigate    = useNavigate();
  const { addToCart } = useCart();
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/products/${product.id}`)}
      className="cursor-pointer rounded-2xl overflow-hidden shrink-0 w-44"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="w-full h-32 overflow-hidden bg-white/[0.02]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-3">
        <p className="text-[10px] mb-0.5" style={{ color: 'rgba(255,255,255,0.32)' }}>
          {product.flag} {product.country}
        </p>
        <p className="text-xs font-semibold text-white line-clamp-2 leading-snug mb-2">{product.name}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">${product.price.toFixed(2)}</span>
          <button
            onClick={e => { e.stopPropagation(); addToCart(product); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.25)' }}
          >
            <ShoppingCart className="w-3.5 h-3.5" style={{ color: '#00d4ff' }} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Product carousel ───────────────────────────────────────────────────────
function ProductCarousel({ title, items }: { title: string; items: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-white">{title}</h3>
        <Link
          to="/products"
          className="text-xs font-medium flex items-center gap-1"
          style={{ color: '#00d4ff' }}
        >
          See all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
      >
        {items.map(p => (
          <div key={p.id} className="snap-start">
            <ProductMiniCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────
function EmptyState() {
  const navigate = useNavigate();
  const recentlyViewed = getRecentlyViewed();
  return (
    <div>
      {/* Illustration */}
      <div className="text-center py-12">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block mb-7"
        >
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bag body */}
            <rect x="18" y="52" width="94" height="66" rx="14" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.35)" strokeWidth="1.5" />
            {/* Bag handle */}
            <path d="M42 52 Q42 24 65 24 Q88 24 88 52" fill="none" stroke="rgba(0,212,255,0.45)" strokeWidth="2" strokeLinecap="round" />
            {/* Item boxes */}
            <rect x="30" y="72" width="30" height="24" rx="7" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.3)" strokeWidth="1.5" />
            <rect x="70" y="72" width="30" height="24" rx="7" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" />
            {/* Lines inside items */}
            <line x1="37" y1="82" x2="53" y2="82" stroke="rgba(0,212,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="37" y1="88" x2="48" y2="88" stroke="rgba(0,212,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="77" y1="82" x2="93" y2="82" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="77" y1="88" x2="88" y2="88" stroke="rgba(124,58,237,0.2)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Sparkles */}
            <circle cx="108" cy="30" r="5" fill="rgba(245,158,11,0.18)" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5" />
            <circle cx="16"  cy="40" r="4" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.4)"  strokeWidth="1.5" />
            <circle cx="116" cy="65" r="3" fill="rgba(236,72,153,0.15)" stroke="rgba(236,72,153,0.4)" strokeWidth="1.5" />
            <circle cx="10"  cy="78" r="2.5" fill="rgba(124,58,237,0.15)" stroke="rgba(124,58,237,0.35)" strokeWidth="1.2" />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-white mb-3"
        >
          Looks like you haven't placed an order yet.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm mb-8 max-w-xs mx-auto"
          style={{ color: 'rgba(255,255,255,0.42)' }}
        >
          Discover amazing products from around the world and place your first order today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg,#00b4d8,#7c3aed)', boxShadow: '0 0 24px rgba(0,180,216,0.25)' }}
          >
            <ShoppingCart className="w-4 h-4" />
            Continue Shopping
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/deals')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.72)' }}
          >
            <Zap className="w-4 h-4" />
            Browse Deals
          </motion.button>
        </motion.div>
      </div>

      {/* Carousels */}
      {recentlyViewed.length > 0 && (
        <ProductCarousel title="Recently Viewed" items={recentlyViewed} />
      )}
      <ProductCarousel title="🔥 Trending Products"   items={trending} />
      <ProductCarousel title="⚡ Flash Deals"          items={flashDeals} />
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const nav = (
    <div className="h-full flex flex-col py-6">
      <div className="px-6 mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-1"
          style={{ color: 'rgba(255,255,255,0.28)' }}>My Account</p>
        <p className="text-sm font-bold text-white">Dashboard</p>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {SIDEBAR_LINKS.map(({ icon: Icon, label, path }) => {
          const active = path !== null && pathname === path;
          return (
            <button
              key={label}
              onClick={() => { if (path) { navigate(path); onClose(); } }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all"
              style={
                active
                  ? { background: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }
                  : {
                    color: path ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.22)',
                    cursor: path ? 'pointer' : 'default',
                    border: '1px solid transparent',
                  }
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {!path && (
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.28)' }}
                >
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ color: 'rgba(239,68,68,0.65)' }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden lg:flex flex-col w-60 shrink-0 sticky top-16 self-start"
        style={{
          height: 'calc(100vh - 4rem)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.015)',
        }}
      >
        {nav}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/65 lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              className="fixed top-0 left-0 h-full w-60 z-50 lg:hidden overflow-y-auto"
              style={{ background: '#0c0c1e', borderRight: '1px solid rgba(255,255,255,0.07)' }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg"
                style={{ color: 'rgba(255,255,255,0.38)', background: 'rgba(255,255,255,0.06)' }}
              >
                <X className="w-4 h-4" />
              </button>
              {nav}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export function MyOrders() {
  const navigate             = useNavigate();
  const { orders, updateOrderStatus } = useOrders();
  const { getWishlistCount } = useWishlist();
  const { addToCart }        = useCart();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search,  setSearch]  = useState('');
  const [filter,  setFilter]  = useState<FilterMode>('all');
  const [sort,    setSort]    = useState<SortMode>('latest');
  const [toast,   setToast]   = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Stats
  const totalSpent  = orders.reduce((s, o) => s + o.total, 0);
  const inProgress  = orders.filter(o =>
    !['Delivered', 'Cancelled', 'Returned'].includes(o.status ?? 'Processing')).length;
  const wishlistCnt = getWishlistCount();

  // Filter + sort
  const filtered = orders
    .filter(o => {
      const s = o.status ?? 'Processing';
      if (filter === 'active')    return !['Delivered', 'Cancelled', 'Returned'].includes(s);
      if (filter === 'Delivered') return s === 'Delivered';
      if (filter === 'Cancelled') return ['Cancelled', 'Returned'].includes(s);
      return true;
    })
    .filter(o => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return o.id.toLowerCase().includes(q) ||
        o.items.some(i => i.name.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      if (sort === 'oldest')  return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sort === 'highest') return b.total - a.total;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const handleBuyAgain = (order: Order) => {
    order.items.forEach(item => addToCart(item, item.quantity));
    showToast(`${order.items.length} item${order.items.length > 1 ? 's' : ''} added to cart`);
  };

  const handleInvoice = (order: Order) => {
    const html = `<!DOCTYPE html><html><head><title>Invoice ${order.id}</title>
<style>*{box-sizing:border-box}body{font-family:system-ui,sans-serif;padding:48px;color:#111;max-width:640px;margin:auto}
h1{font-size:1.5rem;margin-bottom:4px}p{margin:4px 0;font-size:.9rem;color:#555}
table{width:100%;border-collapse:collapse;margin:20px 0}th,td{text-align:left;padding:10px 8px;border-bottom:1px solid #eee;font-size:.875rem}
th{font-weight:600;color:#111;border-bottom:2px solid #ddd}.total{font-size:1rem;font-weight:700}hr{border:none;border-top:1px solid #eee;margin:16px 0}</style>
</head><body>
<h1>Invoice</h1>
<p><strong>Order:</strong> ${order.id}</p>
<p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
<hr/>
<p><strong>Ship to:</strong> ${order.shippingInfo.firstName} ${order.shippingInfo.lastName}</p>
<p>${order.shippingInfo.address}, ${order.shippingInfo.city} ${order.shippingInfo.zipCode}</p>
<p>${order.shippingInfo.email}</p>
<hr/>
<table>
  <tr><th>Product</th><th>Qty</th><th>Unit</th><th>Total</th></tr>
  ${order.items.map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>$${i.price.toFixed(2)}</td><td>$${(i.price * i.quantity).toFixed(2)}</td></tr>`).join('')}
</table>
<hr/>
<p>Subtotal: $${order.subtotal.toFixed(2)}</p>
<p>Shipping: ${order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</p>
<p>Tax: $${order.tax.toFixed(2)}</p>
<p class="total">Total: $${order.total.toFixed(2)}</p>
</body></html>`;
    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); win.print(); }
  };

  return (
    <div className="min-h-screen relative" style={{ background: '#050510' }}>
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute rounded-full" style={{ width: 700, height: 700, top: -150, left: -250, background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute rounded-full" style={{ width: 500, height: 500, bottom: 100, right: -150, background: 'radial-gradient(circle, rgba(0,180,216,0.09) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, top: '45%', left: '55%', background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Layout */}
      <div className="relative z-10 flex min-h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Mobile header bar */}
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.65)' }}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-white">My Orders</h1>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>Track your purchases</p>
              </div>
            </div>

            {/* Desktop header */}
            <div className="hidden lg:block mb-8">
              <h1 className="text-3xl font-bold text-white mb-1">My Orders</h1>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>Track and manage all your purchases</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              <StatCard icon={Package}     label="Total Orders"   value={orders.length}               color="#00d4ff" />
              <StatCard icon={Clock}       label="Pending Orders" value={inProgress}                  color="#f59e0b" />
              <StatCard icon={Heart}       label="Wishlist Items" value={wishlistCnt}                 color="#ec4899" />
              <StatCard icon={TrendingUp}  label="Total Spent"    value={`$${totalSpent.toFixed(0)}`} color="#a855f7" />
            </div>

            {/* Search + filters — shown only when there are orders */}
            {orders.length > 0 && (
              <div className="mb-6 space-y-3">
                {/* Search */}
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Search className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.28)' }} />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by order ID or product name…"
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} style={{ color: 'rgba(255,255,255,0.3)' }}>
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filters + sort */}
                <div className="flex flex-wrap items-center gap-2">
                  {(['all', 'active', 'Delivered', 'Cancelled'] as FilterMode[]).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={filter === f
                        ? { background: 'rgba(0,212,255,0.14)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.28)' }
                        : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.48)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {f === 'all' ? 'All Orders' : f === 'active' ? 'In Progress' : f}
                    </button>
                  ))}

                  <div className="ml-auto relative">
                    <select
                      value={sort}
                      onChange={e => setSort(e.target.value as SortMode)}
                      className="text-xs pl-3 pr-7 py-1.5 rounded-lg outline-none appearance-none cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.58)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <option value="latest">Latest first</option>
                      <option value="oldest">Oldest first</option>
                      <option value="highest">Highest price</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: 'rgba(255,255,255,0.38)' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            {orders.length === 0 ? (
              <EmptyState />
            ) : filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <ShoppingBag className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgba(255,255,255,0.12)' }} />
                <p className="text-white font-semibold mb-1">No orders match your filters</p>
                <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Try a different search or clear your filters
                </p>
                <button
                  onClick={() => { setSearch(''); setFilter('all'); }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold"
                  style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }}
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filtered.map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onCancel={() => { updateOrderStatus(order.id, 'Cancelled'); showToast('Order cancelled'); }}
                    onReturn={() => { updateOrderStatus(order.id, 'Returned'); showToast('Return initiated'); }}
                    onBuyAgain={() => handleBuyAgain(order)}
                    onInvoice={() => handleInvoice(order)}
                    onReview={() => showToast('Thank you for your review!')}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-semibold text-white shadow-2xl"
            style={{ background: 'linear-gradient(135deg,#00b4d8,#7c3aed)', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}
          >
            <CheckCircle className="w-4 h-4" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
