import React from 'react';
import { useRouter } from 'next/router';
import Order from '../models/Order';
import mongoose from 'mongoose';
import Head from 'next/head';

const MyOrder = ({ order }) => {
  const router = useRouter();

  if (!order) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-semibold red-gray-700 mb-4">Order not found</h1>
        <button
          onClick={() => router.push('/')}
          className="mt-4 text-white bg-indigo-500 py-2 px-6 rounded-full hover:bg-indigo-600 transition duration-300"
        >
          Go back to Home
        </button>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <Head>
        <title>Order Confirmation</title>
      </Head>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-indigo-600 text-sm font-semibold uppercase tracking-wide">SnapShop</h2>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-300 mt-2 mb-6">Order ID: <span className="text-indigo-500">{order.orderId}</span></h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Your Order has been placed successfully.</h2>
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Payment Method: Cash on Delivery</h3>
        <p className="text-gray-500 dark:text-gray-300 mb-6">Order Details:</p>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-2 text-gray-900 dark:text-gray-300 font-semibold">Item</th>
                <th className="px-4 py-2 text-gray-900 dark:text-gray-300 font-semibold">Quantity</th>
                <th className="px-4 py-2 text-gray-900 dark:text-gray-300 font-semibold">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((item) => (
                <tr key={item._id.$oid} className="border-t">
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{item.name}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{item.qty}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-300">₹{(item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center border-t border-gray-300 py-4 mt-6">
          <span className="text-gray-900 dark:text-gray-300 font-medium">Total</span>
          <span className="text-xl font-bold text-gray-900 dark:text-gray-300">₹{(order.amount).toFixed(2)}</span>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push('/')}
            className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

// Server-Side Fetching of Order
export async function getServerSideProps(context) {
  // Connect to MongoDB if not already connected
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Fetch the order based on the orderId in the query
  const order = await Order.findById(context.query.id);

  // Check if order exists
  if (!order) {
    return {
      notFound: true, // If no order found, show a 404 page
    };
  }

  // Return order as a prop
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;
