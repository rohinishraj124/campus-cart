// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { useRouter } from 'next/router';
// import showToast from '@/utils/toastfile';

// const MyAccount = ({ cart, total, clearCart }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     city: '',
//     state: '',
//     pinCode: '',
//     mobile: '',
//   });

//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [service, setService] = useState('');
//   const [userData, setUserData] = useState(null); // State to store user data
//   const router = useRouter();

//   // Fetch user data from localStorage on component mount
//   useEffect(() => {
//     const storedUserData = localStorage.getItem('user'); // Get user data from localStorage
//     if (storedUserData) {
//       setUserData(JSON.parse(storedUserData)); // Parse and set user data
//       setFormData({
//         ...formData,
//         name: JSON.parse(storedUserData).name,
//         email: JSON.parse(storedUserData).email
//       });
//     } else {
//       showToast({ error: 'User not logged in or data not found.' });
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.state || !formData.pinCode || !formData.mobile) {
//       showToast({ error: 'All delivery details are required.' });
//       return "All delivery details are required.";
//     }
//     if (!paymentMethod) {
//       showToast({ error: 'Please select a payment method.' });
//       return "Please select a payment method.";
//     }
//     if(formData.mobile.length !== 10){
//       showToast({ error: 'Please enter a valid mobile number.' });
//       return "Please enter a valid mobile number.";
//     }
//     if (Object.keys(cart).length === 0) {
//       showToast({ error: 'Your cart is empty.' });
//       return "Your cart is empty.";
//     }
//     if(formData.pinCode.length !== 6){
//       showToast({ error: 'Please enter a valid pincode.' });
//       return "Please enter a valid pincode.";
//     }
//     return null; // No errors
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userData) {
//       showToast({ error: 'Please log in to proceed to checkout.' });
//       return;
//     }

//     const formError = validateForm();
//     if (formError) {
//       setError(formError);
//       return;
//     }

//     setLoading(true);
//     setError('');

//     const totalAmount = calculateTotal(); // Define `calculateTotal` if needed
//     const orderId = Date.now(); 

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Order`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           orderId,
//           address: formData.address,
//           amount: totalAmount,
//           products: cart,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Order placed successfully!');
//         clearCart();
//         router.push(`/order?id=${data._id}`);
//       } else {
//         throw new Error(data.message || 'Failed to place the order');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full bg-[#ededed] p-4 md:p-8">
//       <ToastContainer
//         position="bottom-center"
//         autoClose={1000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover={false}
//         theme="light"
//         transition={Slide}
//       />
//       <Head>
//         <meta
//           name="viewport"
//           content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
//         />
//       </Head>
//       <h2 className="text-4xl font-extrabold text-gray-800 text-center mt-2 mb-8">Update Your Account</h2>

//       {/* Delivery Details Section */}
//       <div className="bg-white p-6 rounded-xl shadow-lg mb-8 w-full max-w-screen-lg mx-auto">
//         {!userData ? (
//           <p className="text-center text-red-600 font-bold">
//             You must be logged in to access the checkout.
//           </p>
//         ) : (
//           <>
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">1. Delivery Details</h3>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Name and Email */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block text-lg font-semibold text-gray-700">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
//                     placeholder="Enter your full name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     disabled={!userData}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
//                     placeholder="Enter your email address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     disabled={!userData}
//                   />
//                 </div>
//               </div>

//               {/* Address */}
//               <div>
//                 <label htmlFor="address" className="block text-lg font-semibold text-gray-700">
//                   Address
//                 </label>
//                 <textarea
//                   id="address"
//                   name="address"
//                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
//                   placeholder="Enter your delivery address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                   disabled={!userData}
//                 />
//               </div>

//               {/* City and Mobile */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="city" className="block text-lg font-semibold text-gray-700">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     id="city"
//                     name="city"
//                     className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
//                     placeholder="Enter your city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                     disabled={!userData}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="mobile" className="block text-lg font-semibold text-gray-700">
//                     Mobile Number
//                   </label>
//                   <input
//                     type="tel"
//                     id="mobile"
//                     name="mobile"
//                     className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
//                     placeholder="Enter your mobile number"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     required
//                     disabled={!userData}
//                   />
//                 </div>
//               </div>

//               {/* State and Pin Code */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="state" className="block text-lg font-semibold text-gray-700">
//                     State
//                   </label>
//                   <input
//                     type="text"
//                     id="state"
//                     name="state"
//                     className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
//                     placeholder="Enter your state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     required
//                     disabled={!userData}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="pinCode" className="block text-lg font-semibold text-gray-700">
//                     Pin Code
//                   </label>
//                   <input
//                     type="text"
//                     id="pinCode"
//                     name="pinCode"
//                     className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 transition duration-300"
//                     placeholder="Enter your pin code"
//                     value={formData.pinCode}
//                     onChange={handleChange}
//                     required
//                     disabled={!userData}
//                   />
//                 </div>
//               </div>

//               {/* Payment Method */}
//               <div className="mt-4">
//                 <h4 className="text-xl font-semibold text-gray-700">2. Payment Method</h4>
//                 <div className="mt-4 space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => setPaymentMethod('COD')}
//                     className={`px-4 py-2 rounded-lg text-lg ${
//                       paymentMethod === 'COD' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//                     }`}
//                   >
//                     Cash on Delivery
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setPaymentMethod('Online')}
//                     className={`px-4 py-2 rounded-lg text-lg ${
//                       paymentMethod === 'Online' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//                     }`}
//                   >
//                     Online Payment
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="mt-6 text-center">
//                 <button
//                   type="submit"
//                   disabled={loading || !paymentMethod}
//                   className="bg-pink-500 text-white px-8 py-3 rounded-lg text-xl"
//                 >
//                   {loading ? 'Processing...' : 'Place Order'}
//                 </button>
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyAccount;


import React from 'react';
import Head from 'next/head';

const Account = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Head>
                <title>Your Account</title>
            </Head>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg text-center">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-300 mb-4">
                    Your Account
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    Your account will be displayed soon. Stay tuned!
                </p>
                <div className="mt-6">
                    <div className="flex justify-center items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex justify-center items-center text-white text-2xl font-semibold">
                            <span>🔒</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;

