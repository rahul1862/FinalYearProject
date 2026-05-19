import { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block h-full">
      <div className="border border-[#e4e4e7] rounded-xl overflow-hidden bg-white h-full flex flex-col transition-all duration-300 group-hover:border-[#0a0a0a] group-hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        {/* Image */}
        <div className="aspect-square overflow-hidden relative bg-[#f4f4f5]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-[#e4e4e7] hover:border-[#0a0a0a]"
          >
            <Heart
              className="w-4 h-4"
              style={{ color: isWishlisted ? '#0a0a0a' : '#a1a1aa', fill: isWishlisted ? '#0a0a0a' : 'none' }}
            />
          </button>
          {/* Country badge */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium text-[#0a0a0a] border border-[#e4e4e7]">
            {product.flag} {product.country}
          </div>
        </div>

        {/* Body */}
        <div className="p-4 flex-1 flex flex-col">
          <p className="text-xs text-[#a1a1aa] mb-1">{product.category}</p>
          <h3 className="text-sm font-semibold text-[#0a0a0a] mb-3 line-clamp-2 leading-snug flex-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-between pt-3 border-t border-[#f0f0f0]">
            <span className="text-base font-bold text-[#0a0a0a]">${product.price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e4e4e7] rounded-lg text-xs font-medium transition-all duration-200"
              style={added
                ? { background: '#0a0a0a', color: '#ffffff', borderColor: '#0a0a0a' }
                : { color: '#0a0a0a' }
              }
              onMouseEnter={e => { if (!added) { (e.currentTarget as HTMLElement).style.background = '#0a0a0a'; (e.currentTarget as HTMLElement).style.color = '#ffffff'; (e.currentTarget as HTMLElement).style.borderColor = '#0a0a0a'; } }}
              onMouseLeave={e => { if (!added) { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '#0a0a0a'; (e.currentTarget as HTMLElement).style.borderColor = '#e4e4e7'; } }}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {added ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
