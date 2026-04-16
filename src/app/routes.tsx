import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Deals } from "./pages/Deals";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Help } from "./pages/Help";
import { PricingChart } from "./pages/PricingChart";
import { ComparisonChart } from "./pages/ComparisonChart";
import { Wishlist } from "./pages/Wishlist";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "deals", Component: Deals },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "help", Component: Help },
      { path: "pricing", Component: PricingChart },
      { path: "comparison", Component: ComparisonChart },
      { path: "wishlist", Component: Wishlist },
      { path: "*", Component: NotFound },
    ],
  },
]);
