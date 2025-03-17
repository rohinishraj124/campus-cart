import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useRouter } from 'next/router';
import { HiEye, HiEyeOff } from 'react-icons/hi'; 
import showToast from '@/utils/toastfile';
import Head from 'next/head';

const Login = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Default to 'user'
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
    const savedUserType = localStorage.getItem('userType') || 'user';

    if (savedEmail && savedPassword && savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
      setUserType(savedUserType);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, userType }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('userType', userType);
  
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
  
        setTimeout(() => {
          if (userType === 'seller') {
            Router.push('/seller');
          } else {
            Router.push('/');
          }
        }, 1500);
      } else {
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
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} theme={theme === 'dark' ? 'dark' : 'light'} transition={Slide} />
      
      <div className="w-full max-w-sm p-6 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-300">Login to Your Account</h2>
        
        {error && <div className="text-sm text-red-500 text-center">{error}</div>}
        
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-300">Email Address</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
            <input
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-pink-400 dark:focus:border-pink-400"
              placeholder="Enter your password"
            />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-3">
              {passwordVisible ? <HiEyeOff className="w-6 h-6 text-gray-900 dark:text-gray-300" /> : <HiEye className="w-6 h-6 text-gray-900 dark:text-gray-300" />}
            </button>
          </div>

          {/* User Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">Select Account Type</label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="user"
                  checked={userType === 'user'}
                  onChange={() => setUserType('user')}
                  className="text-pink-500 focus:ring-pink-500"
                />
                <span className="text-sm text-gray-900 dark:text-gray-300">User</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="seller"
                  checked={userType === 'seller'}
                  onChange={() => setUserType('seller')}
                  className="text-pink-500 focus:ring-pink-500"
                />
                <span className="text-sm text-gray-900 dark:text-gray-300">Seller</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <Link href="/forget" className="text-sm text-pink-500 hover:underline">Forgot password?</Link>
          </div>

          <button type="submit" className={`w-full px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-900 dark:text-gray-300">
          Don't have an account? <Link href="/signup" className="text-pink-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
