import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return router.push('/');
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/myorder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-lg font-medium">{process.env.NEXT_PUBLIC_LOADING_TEXT || 'Loading...'}</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  const handleRowClick = (id) => {
    router.push(`order?id=${id}`);
  };

  return (
    <div className="container mx-auto  dark:bg-gray-900 p-4  w-full max-w-none h-screen">
      <Head><title>Orders</title></Head>
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-300 animate-fade-in">
        {process.env.NEXT_PUBLIC_ORDERS_HEADER || 'Your Orders'}
      </h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 animate-fade-in mt-48">
          {process.env.NEXT_PUBLIC_NO_ORDERS_TEXT || 'No orders found.'}
        </p>
      ) : (
        <div className="overflow-x-auto w-full">
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="dark:bg-gray-900">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Order ID</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Email</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Products</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Total Amount</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Status</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-700"
                    onClick={() => handleRowClick(order._id)}
                  >
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-900 dark:text-gray-300">{order.orderId}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-900 dark:text-gray-300">{order.email}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-900 dark:text-gray-300">
                      <ul className="list-disc list-inside">
                        {order.products.map((product, index) => (
                          <li key={index}>{product.name || 'Unnamed product'}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-900 dark:text-gray-300">
                      {typeof order.amount === 'number' ? order.amount.toFixed(2) : 'N/A'}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-900 dark:text-gray-300">{order.status}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-900 dark:text-gray-300">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
