import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { CountryProvider } from './context/CountryContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <CountryProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </CountryProvider>
  );
}

export default App;
