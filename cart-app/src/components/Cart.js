import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('/cart')
      .then(response => console.log(response.json()))
      .then(data =>setCartItems(data))
      .catch(error => console.log('Error fetching cart items:', error));
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;