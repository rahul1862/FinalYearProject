import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCountry } from '../context/CountryContext';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { getCurrency } = useCountry();
  const currency = getCurrency();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center py-20">
          <ShoppingBag className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Your cart is empty</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Add some products to get started.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
      <p className="text-gray-400 mb-8">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div
              key={item.id}
              className="bg-[#141414] rounded-xl border border-neutral-800 p-5 flex gap-5 hover:border-neutral-700 transition-colors"
            >
              <div className="w-28 h-28 overflow-hidden rounded-lg bg-neutral-800 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl text-white mb-2 line-clamp-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 font-medium">{item.category} • {item.flag} {item.country}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-neutral-800 rounded-lg p-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-md hover:bg-neutral-700 transition-colors flex items-center justify-center"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-medium text-white">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-md hover:bg-neutral-700 transition-colors flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-white mb-1">
                      {currency.symbol}{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-500 p-1 rounded transition-colors flex items-center gap-1 text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#141414] rounded-xl border border-neutral-800 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-6">Order summary</h2>
            <div className="space-y-3 mb-6 pb-4 border-b border-neutral-800">
              <div className="flex justify-between text-gray-300">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">{currency.symbol}{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span className="font-medium">Shipping</span>
                <span className={`font-semibold ${getCartTotal() > 100 ? 'text-red-400' : 'text-white'}`}>
                  {getCartTotal() > 100 ? 'Free' : `${currency.symbol}9.99`}
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span className="font-medium">Tax</span>
                <span className="font-semibold">{currency.symbol}{(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span>
                  {currency.symbol}
                  {(
                    getCartTotal() +
                    (getCartTotal() > 100 ? 0 : 9.99) +
                    getCartTotal() * 0.08
                  ).toFixed(2)}
                </span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-red-600 text-white text-center px-5 py-3 rounded-lg hover:bg-red-700 transition-colors mb-3 font-medium"
            >
              Checkout
            </Link>
            <Link
              to="/products"
              className="block w-full text-center text-gray-400 hover:text-white font-medium transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
