const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  img: {type: String,required:true}
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;