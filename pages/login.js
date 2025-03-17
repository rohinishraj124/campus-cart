import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useRouter } from 'next/router';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import eye icons
import showToast from '@/utils/toastfile';
import Head from 'next/head';

const Login = ({ theme, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Track remember me state
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility
  const Router = useRouter();

  // Check if the email and password are saved in localStorage when the component mounts
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedEmail && savedPassword && savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }

    const token = localStorage.getItem('token');
    if (token) {
      Router.push('/');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);

        // If remember me is checked, store the email and password in localStorage
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }

        showToast({ success: 'Login successful' });
        setEmail('');
        setPassword('');
        setTimeout(() => {
          window.location.href = '/'; // Redirect to the home page after login
        }, 1500); // Allow the toast to show before redirecting
      } else {
        // If the email is not found or there's another error, show the error message
        setError(data.error || 'Login failed. Please try again.');
        showToast({ error: data.error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
      showToast({ error: 'An error occurred. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <Head>
        <title>Login</title>
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme={theme === 'dark' ? 'dark' : 'light'}
        transition={Slide}
      />
      <div className="w-full max-w-sm p-6 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-pink-500 text-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-300">Login to Your Account</h2>
        {error && <div className="text-sm text-red-500 text-center">{error}</div>}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-pink-400 dark:focus:border-pink-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              type={passwordVisible ? 'text' : 'password'} // Toggle password visibility
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-pink-400 dark:focus:border-pink-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle the visibility
              className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-3"
            >
              {passwordVisible ? (
                <HiEyeOff className="w-6 h-6 text-gray-900 dark:text-gray-300" />
              ) : (
                <HiEye className="w-6 h-6 text-gray-900 dark:text-gray-300" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <Link href="/forget" className="text-sm text-pink-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-900 dark:text-gray-300">
          Don't have an account?{' '}
          <Link href="/signup" className="text-pink-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
