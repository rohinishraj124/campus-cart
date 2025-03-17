const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    desc: { type: String, default: 'CampusCart: Where Every Click Leads to Style!' },
    genre: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String, required: true },
    size: { type: String, default: ['S','M','L','XL'] }, // Updated to an array of strings
    color: { type: String, default: ['red','blue','green','black'] },  // Updated to an array of strings
    rating: { type: Number, default: 0 },
    availableQty: { type: Number, required: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Define the model only if it has not already been defined
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

module.exports = Product;
