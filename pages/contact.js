import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputField = ({ label, type = "text", name, value, onChange, placeholder, required = false, rows }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-500 dark:text-gray-300"
        aria-label={label}
      />
    ) : (
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-500 dark:text-gray-300"
        aria-label={label}
      />
    )}
  </div>
);

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    toast.success('Thank you for contacting us! We will get back to you soon.');
    setTimeout(() => {
      setLoading(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000); // Simulate API delay
  };

  if (!isClient) return null;

  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-pink-500 to-purple-500 text-white py-16">
        <div className="container mx-auto px-5 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4 tracking-wide drop-shadow-md">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl font-light max-w-3xl mx-auto">
            Have any questions? We’re here to help! Reach out to us and we’ll get back to you as soon as we can.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto py-12 px-5">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 dark:bg-gray-800">
          <form onSubmit={handleSubmit} role="form">
            <div className="space-y-4">
              <InputField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
              <InputField
                label="Your Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              <InputField
                label="Your Message"
                type="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                rows="6"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`mt-4 py-3 px-6 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default ContactUs;
