import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useCountry } from '../context/CountryContext';
import { CreditCard, Lock, Wallet, Smartphone } from 'lucide-react';

type PaymentMethod = 'card' | 'paypal' | 'applepay' | 'googlepay';

export function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { getCurrency } = useCountry();
  const currency = getCurrency();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      navigate('/products');
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-neutral-800 rounded-xl p-8 text-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Order placed</h2>
          <p className="text-neutral-400 text-sm mb-4">
            You'll get a confirmation email with your order details.
          </p>
          <p className="text-xs text-neutral-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  const total =
    getCartTotal() +
    (getCartTotal() > 100 ? 0 : 9.99) +
    getCartTotal() * 0.08;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">Checkout</h1>
      <p className="text-gray-400 mb-8">Complete your purchase securely</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-[#141414] rounded-xl border border-neutral-800 p-6">
              <h2 className="text-lg font-semibold text-white mb-5">Shipping</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1.5">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-neutral-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1.5">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-neutral-800 text-white text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-neutral-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-neutral-800 text-white text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-neutral-400 mb-1.5">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-neutral-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1.5">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-neutral-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1.5">ZIP code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-neutral-800 text-white text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#141414] rounded-xl border border-neutral-800 p-6">
              <h2 className="text-lg font-semibold text-white mb-5">Payment</h2>

              {/* Method selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {([
                  { id: 'card' as PaymentMethod, label: 'Card', icon: <CreditCard className="w-5 h-5" /> },
                  { id: 'paypal' as PaymentMethod, label: 'PayPal', icon: <Wallet className="w-5 h-5" /> },
                  { id: 'applepay' as PaymentMethod, label: 'Apple Pay', icon: <Smartphone className="w-5 h-5" /> },
                  { id: 'googlepay' as PaymentMethod, label: 'Google Pay', icon: <Smartphone className="w-5 h-5" /> },
                ]).map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-sm font-medium transition-colors ${
                      paymentMethod === method.id
                        ? 'border-red-600 bg-red-600/10 text-white'
                        : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:border-neutral-600'
                    }`}
                  >
                    {method.icon}
                    {method.label}
                  </button>
                ))}
              </div>

              {/* Card fields */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-neutral-400 mb-1.5">Card number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full px-3 py-2.5 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-neutral-800 text-white text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-neutral-400 mb-1.5">Expiry</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                        className="w-full px-3 py-2.5 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-neutral-800 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-400 mb-1.5">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        required
                        className="w-full px-3 py-2.5 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-neutral-800 text-white text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal */}
              {paymentMethod === 'paypal' && (
                <div className="text-center py-6 space-y-3">
                  <Wallet className="w-10 h-10 text-blue-400 mx-auto" />
                  <p className="text-sm text-neutral-400">
                    You'll be redirected to PayPal to complete payment after placing your order.
                  </p>
                </div>
              )}

              {/* Apple Pay */}
              {paymentMethod === 'applepay' && (
                <div className="text-center py-6 space-y-3">
                  <Smartphone className="w-10 h-10 text-white mx-auto" />
                  <p className="text-sm text-neutral-400">
                    Confirm with Apple Pay on your device when prompted.
                  </p>
                </div>
              )}

              {/* Google Pay */}
              {paymentMethod === 'googlepay' && (
                <div className="text-center py-6 space-y-3">
                  <Smartphone className="w-10 h-10 text-green-400 mx-auto" />
                  <p className="text-sm text-neutral-400">
                    Confirm with Google Pay on your device when prompted.
                  </p>
                </div>
              )}
              <div className="mt-5 flex items-center gap-2 text-xs text-neutral-500">
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypted with 256-bit SSL</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Place order — {currency.symbol}{total.toFixed(2)}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#141414] rounded-xl border border-neutral-800 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-5">Order summary</h2>
            <div className="space-y-3 mb-5 pb-4 border-b border-neutral-800">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 p-2 bg-neutral-800/50 rounded-lg">
                  <div className="w-14 h-14 overflow-hidden rounded-lg bg-neutral-800 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white line-clamp-2">{item.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Qty: {item.quantity} • {item.flag} {item.country}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-red-400">
                    {currency.symbol}{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-neutral-400 text-sm">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">{currency.symbol}{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400 text-sm">
                <span className="font-medium">Shipping</span>
                <span className={`font-semibold ${getCartTotal() > 100 ? 'text-red-400' : 'text-white'}`}>
                  {getCartTotal() > 100 ? 'Free' : `${currency.symbol}9.99`}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400 text-sm">
                <span className="font-medium">Tax</span>
                <span className="font-semibold">{currency.symbol}{(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-neutral-800">
                <span>Total</span>
                <span>{currency.symbol}{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
