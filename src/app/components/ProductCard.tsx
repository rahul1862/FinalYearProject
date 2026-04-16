import { Link } from 'react-router';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { useCountry } from '../context/CountryContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { getCurrency } = useCountry();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const currency = getCurrency();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block h-full"
    >
      <div className="bg-[#141414] rounded-xl overflow-hidden border border-neutral-800 h-full flex flex-col hover:border-neutral-700 transition-colors relative">
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-400'
            }`}
          />
        </button>

        <div className="aspect-square overflow-hidden bg-neutral-900 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-black/70 text-white px-2.5 py-1 rounded text-xs font-medium">
            {product.flag} {product.country}
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs text-neutral-500 mb-1">{product.category}</p>
            <h3 className="font-medium text-white mb-2 line-clamp-2 text-sm leading-snug group-hover:text-red-400 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-red-500 text-red-500'
                        : 'text-neutral-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-400">{product.rating} ({product.reviews})</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
            <span className="text-lg font-bold text-white">
              {currency.symbol}{product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}