import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/cart');
        if (Array.isArray(response.data)) {
          setCartItems(response.data);
        } else {
          console.error('Cart items data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h1>Cart Items</h1>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item._id}>
              <div>Name: {item.name}</div>
              <div>Price: {item.price}</div>
              <div>Quantity: {item.quantity}</div>
              {/* Add more details if needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
