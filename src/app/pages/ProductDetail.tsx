import { useParams, Link } from 'react-router';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useCountry } from '../context/CountryContext';
import { useState } from 'react';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { getCurrency } = useCountry();
  const currency = getCurrency();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Product not found</h1>
        <Link to="/products" className="text-white hover:text-gray-300 font-semibold text-lg">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-red-500 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-neutral-900 rounded-xl overflow-hidden relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center gap-1.5">
                <span>{product.flag}</span>
                <span>{product.country}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <div className="w-16 h-16 bg-neutral-800 rounded-lg cursor-pointer hover:ring-1 hover:ring-neutral-600 transition-all"></div>
              <div className="w-16 h-16 bg-neutral-800 rounded-lg cursor-pointer hover:ring-1 hover:ring-neutral-600 transition-all"></div>
              <div className="w-16 h-16 bg-neutral-800 rounded-lg cursor-pointer hover:ring-1 hover:ring-neutral-600 transition-all"></div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs text-neutral-500 mb-1">{product.category}</p>
              <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-red-500 text-red-500" />
                  <span className="text-sm font-medium text-white">{product.rating}</span>
                </div>
                <span className="text-sm text-neutral-500">{product.reviews} reviews</span>
              </div>

              <div className="text-3xl font-bold text-white mb-6">
                {currency.symbol}{product.price.toFixed(2)}
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed mb-6">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="bg-[#141414] rounded-xl p-5 border border-neutral-800">
              <label className="block text-sm text-neutral-400 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-neutral-800 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-md hover:bg-neutral-700 transition-colors flex items-center justify-center text-neutral-300"
                  >
                    <span className="text-lg">−</span>
                  </button>
                  <span className="text-lg font-bold w-10 text-center text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-md hover:bg-neutral-700 transition-colors flex items-center justify-center text-neutral-300"
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
                <p className="text-sm text-neutral-400">
                  Total: {currency.symbol}{(product.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to cart
              </button>

              {addedToCart && (
                <div className="mt-3 bg-neutral-800 text-white px-4 py-3 rounded-lg text-sm text-center animate-fade-in">
                  Added to cart
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="bg-[#141414] rounded-xl p-5 border border-neutral-800">
              <h3 className="text-sm font-medium text-white mb-4">Details</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✓</span>
                  Free shipping on orders over $100
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✓</span>
                  30-day return policy
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✓</span>
                  1-year warranty included
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✓</span>
                  Secure payment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✓</span>
                  Authenticity guaranteed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}