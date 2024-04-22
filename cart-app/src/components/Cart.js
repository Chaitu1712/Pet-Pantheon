import React from "react";
import "./Cart.css";
import "./navbar.css";
const Cart = () => {
  return (
    <div>
      <h1 className="heading" >Shopping Cart</h1>
    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody  id="Cart">
            <tr>
                <td>HEARTSTRING COLLAR</td>
                <td><img className="product-image" src="Images/Dog/prod1.png" alt="Dog Food"/></td>
                <td>Rs. 2999.00</td>
                <td>2</td>
                <td>Rs. 4998.00</td>
            </tr>
        </tbody>
        <tbody  id="Cart">
            <tr>
                <td>Pastel Cat Scratching Post</td>
                <td><img className="product-image" src="Images/Cat/prod1.png" alt="Dog Food"/></td>
                <td>Rs. 2999.00</td>
                <td>1</td>
                <td>Rs. 2999.00</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4" class="subtotal">Subtotal:</td>
                <td className="subtotal">Rs. 8997.00 </td>
            </tr>
        </tfoot>
    </table>
    </div>
  );
};

export default Cart;
