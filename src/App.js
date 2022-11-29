import React from "react";
import "./App.scss";
import { CartProvider } from "./context/cartContext/CartContext";
import Product from "./Product";

function App() {
  return (
    <CartProvider>
      <Product />
    </CartProvider>
  );
}

export default App;
