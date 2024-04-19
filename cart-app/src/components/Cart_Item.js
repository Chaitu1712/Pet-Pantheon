// components/CartItem.js
import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div>
        <img src={item.img} alt={item.name} />
      <h3>{item.name}</h3>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};

export default CartItem;