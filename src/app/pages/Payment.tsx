import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Lock, ArrowLeft, CheckCircle, AlertCircle, ShieldCheck, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCountry } from '../context/CountryContext';

function formatCardNumber(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2);
  if (digits.length === 2 && value.endsWith('/')) return digits + ' / ';
  return digits;
}

function getCardType(number: string): string {
  const n = number.replace(/\s/g, '');
  if (/^4/.test(n)) return 'Visa';
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'Mastercard';
  if (/^3[47]/.test(n)) return 'Amex';
  if (/^6(?:011|5)/.test(n)) return 'Discover';
  return '';
}

function validateCard(number: string, expiry: string, cvc: string, name: string) {
  const digits = number.replace(/\s/g, '');
  if (digits.length < 16) return 'Card number must be 16 digits.';
  const parts = expiry.replace(/\s/g, '').split('/');
  if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) return 'Expiry must be MM / YY.';
  const month = parseInt(parts[0], 10);
  const year = parseInt('20' + parts[1], 10);
  const now = new Date();
  if (month < 1 || month > 12) return 'Invalid expiry month.';
  if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) return 'Card has expired.';
  if (cvc.length < 3) return 'CVC must be 3 digits.';
  if (!name.trim()) return 'Cardholder name is required.';
  return null;
}

const cardStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
};

export function Payment() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { getCurrency } = useCountry();
  const currency = getCurrency();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const cardType = getCardType(cardNumber);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const validationError = validateCard(cardNumber, expiry, cvc, name);
    if (validationError) { setError(validationError); return; }
    setProcessing(true);
    await new Promise(res => setTimeout(res, 1800));
    setProcessing(false);
    setSucceeded(true);
    clearCart();
    setTimeout(() => navigate('/products'), 3500);
  };

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

  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.45)' };

  if (cart.length === 0 && !succeeded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050510' }}>
        <div className="text-center">
          <p className="mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Your cart is empty.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#00b4d8,#7c3aed)' }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (succeeded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050510' }}>
        <div className="text-center py-12">
          <div className="relative inline-flex mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)' }}>
              <CheckCircle className="w-12 h-12" style={{ color: '#00d4ff' }} />
            </div>
            <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(0,212,255,0.06)' }} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Thank you for your order.</p>
          <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Redirecting you to products…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#050510' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff' }}>
            🔒 Secure Payment
          </div>
          <h1 className="text-4xl font-bold text-white mb-1">Payment</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Complete your purchase securely.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 space-y-5">
              {/* Contact */}
              <div className="rounded-2xl p-6" style={cardStyle}>
                <h2 className="text-sm font-bold text-white mb-5">Contact</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Full name', state: name, setState: setName, type: 'text', placeholder: 'Jane Smith' },
                    { label: 'Email', state: email, setState: setEmail, type: 'email', placeholder: 'jane@example.com' },
                  ].map(({ label, state, setState, type, placeholder }) => (
                    <div key={label}>
                      <label style={labelStyle}>{label}</label>
                      <input
                        type={type}
                        required
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder={placeholder}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card details */}
              <div className="rounded-2xl p-6" style={cardStyle}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-bold text-white">Card Details</h2>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <Lock className="w-3.5 h-3.5" /> Secured by Stripe
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label style={labelStyle}>Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={cardNumber}
                        onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        style={{ ...inputStyle, paddingLeft: '2.75rem', paddingRight: '4rem' }}
                        onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                      />
                      {cardType && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}>
                          {cardType}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Expiry</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={expiry}
                        onChange={e => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM / YY"
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>CVC</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={cvc}
                        onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="123"
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: '#ec4899' }}>
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div className="mt-5 flex items-center gap-5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> 256-bit SSL</span>
                  <span>Visa · Mastercard · Amex · Discover</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
                style={{ background: 'linear-gradient(135deg,#00b4d8,#7c3aed)', boxShadow: '0 0 30px rgba(0,180,216,0.25)' }}
              >
                {processing ? (
                  <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg> Processing…</>
                ) : (
                  <><Lock className="w-4 h-4" /> Pay {currency.symbol}{total.toFixed(2)}</>
                )}
              </button>

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-1.5 text-sm transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                <ArrowLeft className="w-4 h-4" /> Back to checkout
              </Link>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl p-6 sticky top-24" style={cardStyle}>
                <h2 className="text-sm font-bold text-white mb-5">Order Summary</h2>
                <div className="space-y-3 mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)' }}>
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">{item.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.flag} {item.country}</p>
                      </div>
                      <p className="text-xs font-bold text-white shrink-0">{currency.symbol}{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2.5 text-sm">
                  {[
                    { label: 'Subtotal', value: `${currency.symbol}${subtotal.toFixed(2)}` },
                    { label: 'Shipping', value: shipping === 0 ? 'Free' : `${currency.symbol}${shipping.toFixed(2)}` },
                    { label: 'Tax (8%)', value: `${currency.symbol}${tax.toFixed(2)}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                      <span style={{ color: value === 'Free' ? '#00d4ff' : 'rgba(255,255,255,0.8)' }}>{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3 font-bold" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <span className="text-white">Total</span>
                    <span className="text-white">{currency.symbol}{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
