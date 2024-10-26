import { createContext, useState } from "react";
import PropTypes from "prop-types";


const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItemss, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItemss, addToCart, removeFromCart }}>
      {children}

    </CartContext.Provider>
  );
};
export { CartContext };
export default CartProvider;

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
