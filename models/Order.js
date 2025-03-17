const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Order schema with products as an array of objects
const orderSchema = new Schema({
  email: { type: String, required: true },
  orderId: { type: String, default: Date.now() }  ,
  products: [
    {
      productId: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      name: { type: String, required: true },
      size: { type: String, required: true },
      variant: { type: String, required: true },
    },
  ],
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;
