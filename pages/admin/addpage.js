import React, { useState } from 'react';

const AddProduct = () => {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    price: '',
    desc: 'SnapShop: Where Every Click Leads to Style!',
    genre: '',
    category: '',
    img: '',
    size: 'M',
    color: 'red',
    rating: 5,
    availableQty: '50',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

    try {
      // Wrap the form object in an array
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/addproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([form]), // Wrap form in an array to match backend expectations
      });

      const data = await response.json();

      if (response.ok) {
        alert('Product added successfully!');
        // setForm({
        //   title: '',
        //   slug: '',
        //   price: '',
        //   desc: 'SnapShop: Where Every Click Leads to Style!',
        //   genre: '',
        //   category: '',
        //   img: '',
        //   size: 'M',
        //   color: 'red',
        //   rating: 5,
        //   availableQty: '50',
        // });
      } else {
        setError(data.error || 'Failed to add product.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while adding the product.');
    }
  };

  // Basic form validation
  const validateForm = () => {
    if (!form.title || !form.slug || !form.price || !form.genre || !form.category || !form.img || !form.size || !form.availableQty) {
      setError('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-semibold">Slug</label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block font-semibold">Genre</label>
          <input
            type="text"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold">Image URL</label>
          <input
            type="text"
            name="img"
            value={form.img}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Size */}
        <div>
          <label className="block font-semibold">Size</label>
          <input
            type="text"
            name="size"
            value={form.size}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block font-semibold">Color</label>
          <input
            type="text"
            name="color"
            value={form.color}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block font-semibold">Rating</label>
          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Available Quantity */}
        <div>
          <label className="block font-semibold">Available Quantity</label>
          <input
            type="number"
            name="availableQty"
            value={form.availableQty}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
