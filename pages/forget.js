import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import Link from 'next/link';
import Head from 'next/head';
import contactConfig from '../utils/contactconfig.js';

const ForgotPassword = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false); // Track resend button visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }
  
    try {
      setMessage("Sending reset link...");
      setLoading(true);
      setShowResend(false); // Hide resend button while sending
  
      const templateParams = { to_email: email };
  
      await emailjs.send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      );
  
      setMessage("Success! A reset link has been sent to your email.");
      setShowResend(false); // No need to show resend button if successful
    } catch (error) {
      setMessage("Failed to send reset link. Please try again.");
      setShowResend(true); // Show resend button on failure
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Router.push('/');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 py-8 px-4">
      <Head>
        <title>Forgot Password</title>
      </Head>

      <div className="w-full max-w-md p-6 dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300 mb-4 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-900 dark:text-gray-300 text-sm text-center mb-6">
          Enter your email address below, and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-900 dark:text-gray-300 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!loading && !showResend && (
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
            >
              Send Reset Link
            </button>
          )}
        </form>

        {message && (
          <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>
        )}

        {showResend && (
          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 mt-4"
          >
            Resend Reset Link
          </button>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="text-pink-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
