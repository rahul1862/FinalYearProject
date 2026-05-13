import { Link } from 'react-router';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wishlist</h1>
          <p className="text-neutral-400 text-sm">
            {wishlist.length === 0 ? "Nothing saved yet." : `${wishlist.length} item${wishlist.length > 1 ? 's' : ''} saved`}
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <div key={product.id} className="bg-[#141414] rounded-xl border border-neutral-800 overflow-hidden group">
                  <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-sm">{product.flag}</span>
                      <span className="text-neutral-500 text-xs">{product.country}</span>
                    </div>
                    <h3 className="text-white font-medium text-sm mb-1 group-hover:text-red-400 transition-colors">{product.name}</h3>
                    <p className="text-white font-bold mb-3">${product.price}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { addToCart(product); removeFromWishlist(product.id); }}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Your wishlist is empty</h3>
              <p className="text-neutral-400 text-sm mb-6">
                Browse products and tap the heart icon to save items.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-red-700 transition-colors"
              >
                Browse products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
