import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import SkyRoot from "./components/UI/Sky/SkyRoot";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import "./App.css";
import CartProvider from "./components/store/CartProvider";

function App() {
  const [inCart, setInCart] = useState(false);
  const hideCartHandler = () => {
    setInCart(false);
  };

  const showCartHanlder = () => {
    setInCart(true);
  };

  return (
    <CartProvider>
      <SkyRoot />
      <Header onSelectCart={showCartHanlder} />
      <main>
        {inCart && <Cart onCancel={hideCartHandler} />}
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
