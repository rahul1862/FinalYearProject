import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { CreditCard, Lock, Wallet, Smartphone, CheckCircle } from 'lucide-react';

type PaymentMethod = 'card' | 'paypal' | 'applepay' | 'googlepay';

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '0.75rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'white',
  fontSize: '0.875rem',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '0.5rem',
  color: 'rgba(255,255,255,0.38)',
};

const cardStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '1rem',
  padding: '1.5rem',
};

export function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    await addOrder({
      items: cart,
      subtotal,
      shipping,
      tax,
      total,
      shippingInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      },
      paymentMethod,
    });
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => navigate('/orders'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050510' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="relative inline-flex mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)' }}>
              <CheckCircle className="w-12 h-12" style={{ color: '#00d4ff' }} />
            </div>
            <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(0,212,255,0.05)' }} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Order Placed!</h2>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>You'll receive a confirmation email shortly.</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Redirecting…</p>
        </motion.div>
      </div>
    );
  }

  const PAYMENT_METHODS = [
    { id: 'card' as PaymentMethod, label: 'Card', Icon: CreditCard },
    { id: 'paypal' as PaymentMethod, label: 'PayPal', Icon: Wallet },
    { id: 'applepay' as PaymentMethod, label: 'Apple Pay', Icon: Smartphone },
    { id: 'googlepay' as PaymentMethod, label: 'Google Pay', Icon: Smartphone },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#050510' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Checkout</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Complete your purchase securely</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Shipping */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                style={cardStyle}
              >
                <h2 className="text-sm font-bold text-white mb-5">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'firstName', label: 'First name', type: 'text' },
                    { name: 'lastName',  label: 'Last name',  type: 'text' },
                  ].map(field => (
                    <div key={field.name}>
                      <label style={labelStyle}>{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label style={labelStyle}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label style={labelStyle}>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>ZIP / Postal code</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={cardStyle}
              >
                <h2 className="text-sm font-bold text-white mb-5">Payment</h2>

                {/* Method selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {PAYMENT_METHODS.map(({ id, label, Icon }) => {
                    const active = paymentMethod === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl text-sm font-medium transition-all duration-200"
                        style={
                          active
                            ? { background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.35)', color: '#00d4ff' }
                            : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }
                        }
                      >
                        <Icon className="w-5 h-5" />
                        {label}
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label style={labelStyle}>Card number</label>
                      <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" required style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label style={labelStyle}>Expiry</label>
                        <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" required style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>CVV</label>
                        <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" required style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod !== 'card' && (
                  <div className="text-center py-8 space-y-3">
                    {paymentMethod === 'paypal' && <Wallet className="w-10 h-10 mx-auto" style={{ color: '#60a5fa' }} />}
                    {(paymentMethod === 'applepay' || paymentMethod === 'googlepay') && <Smartphone className="w-10 h-10 mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }} />}
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {paymentMethod === 'paypal' && "You'll be redirected to PayPal after placing your order."}
                      {paymentMethod === 'applepay' && "Confirm with Apple Pay when prompted."}
                      {paymentMethod === 'googlepay' && "Confirm with Google Pay when prompted."}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  <Lock className="w-3.5 h-3.5" />
                  256-bit SSL encrypted
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold text-white transition-all"
                style={{ background: 'linear-gradient(135deg,#00b4d8,#7c3aed)', boxShadow: '0 0 30px rgba(0,180,216,0.25)' }}
              >
                <Lock className="w-4 h-4" />
                Place Order — ${total.toFixed(2)}
              </motion.button>
            </form>
          </div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="rounded-2xl p-6 sticky top-24" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2 className="text-sm font-bold text-white mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">{item.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>{item.flag} {item.country} · Qty {item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold text-white shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 text-sm">
                {[
                  { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                  { label: 'Shipping', value: shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` },
                  { label: 'Tax (8%)', value: `$${tax.toFixed(2)}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                    <span style={{ color: value === 'Free' ? '#00d4ff' : 'rgba(255,255,255,0.8)' }}>{value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 font-bold text-white" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
