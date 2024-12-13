import React from 'react'
import CartPage  from '../componnet/ShoppingCart'

const Panier = ({ cart, removeFromCart, updateCartQuantity }) => {
  return (
    <div>
      <CartPage cart={cart}  removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} />
    </div>
  );
};

export default Panier;