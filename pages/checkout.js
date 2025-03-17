import React, { useState } from 'react';
import Head from 'next/head';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useRouter } from 'next/router';
import showToast from '@/utils/toastfile';

const Checkout = ({ cart, total, user , clearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    mobile: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedItem, setExpandedItem] = useState({}); // State to track which item's name is expanded
  const [service, setService] = useState('')
  const [showFlash, setShowFlash] = useState(false);
  const router = useRouter(); 

  const checkServiceAvailability = async () => {
    const enteredPin = formData.pinCode;  // Ensure you're using the correct pin from form data

    if (!enteredPin || isNaN(enteredPin)) {
      return;
    }

    try {
      // Fetch the serviceable pin codes from your API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pincode`);
      const pinjson = await response.json();

      if (pinjson.includes(Number(enteredPin))) {
        setService(true);  // Service available
        showToast({ success: 'Your Pincode is Serviceable' });
        setShowFlash(true);
      } else {
        setService(false);  // Service not available
        showToast({ error: 'Sorry! Your Pincode is not Serviceable' });
        setShowFlash(true);
      }

      setTimeout(() => {
        setShowFlash(false);
      }, 1500);
    } catch (error) {
      console.error('Error checking pincode service availability:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Helper function to validate form
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.state || !formData.pinCode || !formData.mobile) {
      showToast({ error: 'All delivery details are required.' });
      return "All delivery details are required.";
    }
    if (!paymentMethod) {
      showToast({ error: 'Please select a payment method.' });
      return "Please select a payment method.";

    }
    if(formData.mobile.length !== 10){
      showToast({ error: 'Please enter a valid mobile number.' });
      return "Please enter a valid mobile number.";
    }
    if (Object.keys(cart).length === 0) {
      showToast({ error: 'Your cart is empty.' });
      return "Your cart is empty.";
    }
    if(formData.pinCode.length !== 6){
      showToast({ error: 'Please enter a valid pincode.' });
      return "Please enter a valid pincode.";
    }
    return null; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast({ error: 'Please log in to proceed to checkout.' });
      return;
    }
  
    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }
  
    setLoading(true);
    setError('');
  
    const totalAmount = calculateTotal(); 
    const orderId = Date.now(); 
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          orderId, 
          address: formData.address,
          amount: totalAmount, 
          products: cart,
        }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        alert('Order placed successfully!');
        clearCart();
        router.push(`/order?id=${data._id}`); // Use `_id` for redirection
      } else {
        throw new Error(data.message || 'Failed to place the order');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  const calculateTotal = () => {
    let sum = 0;
    for (let item in cart) {
      sum += cart[item].price * cart[item].qty;
    }
    return sum;
  };

  const handleToggleName = (key) => {
    setExpandedItem((prev) => (prev === key ? null : key));
  };

  return (
    <div className="w-full dark:bg-gray-900 bg-[#ededed] p-4 md:p-8">
      <Head><title>Checkout</title></Head>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-300 text-center my-8">Checkout</h2>

      {/* Delivery Details Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 w-full max-w-screen-lg mx-auto">
        {!user ? (
          <p className="text-center text-red-600 font-bold">
            You must be logged in to access the checkout.
          </p>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-300 mb-6">Delivery Details</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-gray-900 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={!user}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-900 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={!user}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-lg font-semibold text-gray-900 dark:text-gray-300">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
                  placeholder="Enter your delivery address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={!user}
                />
              </div>

              {/* City and Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-lg font-semibold text-gray-900 dark:text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    disabled={!user}
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-lg font-semibold text-gray-900 dark:text-gray-300">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    disabled={!user}
                  />
                </div>
              </div>

              {/* State and Pin Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="state" className="block text-lg font-semibold text-gray-900 dark:text-gray-300">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
                    placeholder="Enter your state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    disabled={!user}
                  />
                </div>
                <div>
                  <label htmlFor="pinCode" className="block text-lg font-semibold text-gray-900 dark:text-gray-300">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    id="pinCode"
                    name="pinCode"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
                    placeholder="Enter your pin code"
                    value={formData.pinCode}
                    onChange={handleChange}
                    onBlur={checkServiceAvailability} // Call check on blur
                    required
                    disabled={!user}
                  />
                </div>
              </div>


              {/* Review Cart Items */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-4">Review Cart Items</h3>
                <div className="space-y-4">
                  {Object.keys(cart).length === 0 ? (
                    <p className="text-gray-900 dark:text-gray-300">Your cart is empty</p>
                  ) : (
                    Object.keys(cart).map((key) => {
                      const item = cart[key];
                      const truncatedName = item.name.length > 20 ? `${item.name.slice(0, 20)}` : item.name;
                      return (
                        <div key={key} className="flex justify-between items-center">
                          <div className='md:w-1/2 w-40'>
                            <span
                              className="font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                            >
                              {expandedItem[key] ? item.name : truncatedName}
                            </span>
                            {!expandedItem[key] && item.name.length > 20 && (
                              <button
                                className="mx-2 text-blue-500 text-sm"
                                onClick={() => setExpandedItem((prev) => ({ ...prev, [key]: true }))}
                              >
                                More...
                              </button>
                            )}
                            {expandedItem[key] && (
                              <div className="mt-2 text-sm text-gray-600">{item.desc}</div>
                            )}
                          </div>
                          <span className="text-gray-900 dark:text-gray-300">{`₹${item.price} x ${item.qty}`}</span>
                        </div>
                      );
                    })
                  )}
                </div>

              </div>

              {/* Payment Method */}
              <div className="space-y-6">
                <label className="block text-xl font-semibold text-gray-900 dark:text-gray-300">Payment Method</label>
                <div className="flex flex-col sm:flex-row sm:space-x-6">
                  {/* Cash on Delivery option */}
                  <label className="flex items-center space-x-2 mb-4 sm:mb-0">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                      disabled={!user}
                    />
                    <span className="text-gray-900 dark:text-gray-300 text-lg font-medium">Cash on Delivery</span>
                  </label>

                  {/* Credit Card option (Disabled) */}
                  <label className="flex items-center space-x-2 mb-4 sm:mb-0">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit Card"
                      checked={paymentMethod === 'Credit Card'}
                      onChange={() => setPaymentMethod('Credit Card')}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                      disabled
                    />
                    <span className="text-gray-500 text-lg font-medium">
                      Credit Card (Coming Soon)
                    </span>
                  </label>

                  {/* UPI option (Disabled) */}
                  <label className="flex items-center space-x-2 mb-4 sm:mb-0">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                      disabled
                    />
                    <span className="text-gray-500 text-lg font-medium">
                      UPI (Coming Soon)
                    </span>
                  </label>
                </div>

                {/* Disabled message for Cash on Delivery */}
                {!user && (
                  <p className="text-sm text-gray-500 mt-2">Please log in to enable payment options.</p>
                )}
                {!user && paymentMethod === 'Credit Card' && (
                  <p className="text-sm text-red-500 mt-2">
                    Online payments are currently unavailable. Please select Cash on Delivery.
                  </p>
                )}
                {!user && paymentMethod === 'UPI' && (
                  <p className="text-sm text-red-500 mt-2">
                    Online payments are currently unavailable. Please select Cash on Delivery.
                  </p>
                )}
              </div>

              {error && <p className="text-red-600">{error}</p>}
              {/* Order Summary */}
              <div className="mt-6 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-300">Total:</span>
                <span className="text-lg text-gray-900 dark:text-gray-300">{`₹${calculateTotal()}`}</span>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className={`w-full py-4 bg-pink-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${loading || !service ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading || !service}  // Disable button if loading or service is not available
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>

            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
