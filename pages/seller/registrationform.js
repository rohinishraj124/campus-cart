import React, { useState } from 'react';
import Head from 'next/head';

const SellerRegistrationForm = () => {
    const [shopName, setShopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [shopDescription, setShopDescription] = useState('');
    const [products, setProducts] = useState([]);

    const categories = ['Beverages', 'Snacks', 'Stationery', 'Essentials'];

    const addProduct = () => {
        setProducts([...products, { name: '', category: 'Beverages', price: '', stock: '' }]);
    };

    const updateProduct = (index, field, value) => {
        const newProducts = [...products];
        newProducts[index][field] = value;
        setProducts(newProducts);
    };

    const removeProduct = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ shopName, shopAddress, contactNumber, shopDescription, products });
        alert('Shop Registered Successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <Head>
                <title>Seller Registration</title>
            </Head>

            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Seller Registration</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Shop Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Shop Name</label>
                        <input
                            type="text"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your shop name"
                        />
                    </div>

                    {/* Shop Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Shop Address</label>
                        <input
                            type="text"
                            value={shopAddress}
                            onChange={(e) => setShopAddress(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your shop address"
                        />
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Contact Number</label>
                        <input
                            type="tel"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your contact number"
                        />
                    </div>

                    {/* Shop Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Shop Description</label>
                        <textarea
                            value={shopDescription}
                            onChange={(e) => setShopDescription(e.target.value)}
                            rows="3"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Describe your shop (optional)"
                        ></textarea>
                    </div>

                    {/* Product List */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Add Products</h2>
                        {products.map((product, index) => (
                            <div key={index} className="mt-4 p-4 bg-gray-50 border rounded-lg">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Product Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900">Product Name</label>
                                        <input
                                            type="text"
                                            value={product.name}
                                            onChange={(e) => updateProduct(index, 'name', e.target.value)}
                                            required
                                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter product name"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900">Category</label>
                                        <select
                                            value={product.category}
                                            onChange={(e) => updateProduct(index, 'category', e.target.value)}
                                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {categories.map((category, i) => (
                                                <option key={i} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900">Price (₹)</label>
                                        <input
                                            type="number"
                                            value={product.price}
                                            onChange={(e) => updateProduct(index, 'price', e.target.value)}
                                            required
                                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter price"
                                        />
                                    </div>

                                    {/* Stock */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900">Stock</label>
                                        <input
                                            type="number"
                                            value={product.stock}
                                            onChange={(e) => updateProduct(index, 'stock', e.target.value)}
                                            required
                                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter stock quantity"
                                        />
                                    </div>
                                </div>

                                {/* Remove Product Button */}
                                <button
                                    type="button"
                                    onClick={() => removeProduct(index)}
                                    className="mt-4 text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                    Remove Product
                                </button>
                            </div>
                        ))}

                        {/* Add Product Button */}
                        <button
                            type="button"
                            onClick={addProduct}
                            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                        >
                            + Add Product
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                    >
                        Register Shop
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerRegistrationForm;
