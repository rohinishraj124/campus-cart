import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer, toast, Slide } from 'react-toastify';
import showToast from '@/utils/toastfile';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Signup = ({ theme }) => {
    const router = useRouter();
    const [userType, setUserType] = useState('user'); // Default to "User"
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            showToast({ error: 'Passwords do not match!' });
            setError('Passwords do not match!');
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, userType }),
        });

        const result = await response.json();

        if (response.ok) {
            showToast({ success: 'Account created successfully! Redirecting...' });

            setTimeout(() => {
                if (userType === 'seller') {
                    router.push('/seller/registrationform'); // Redirect to seller registration form
                } else {
                    router.push('/'); // Redirect to home for normal users
                }
            }, 1500);
        } else {
            setError(result.error || 'Something went wrong!');
            showToast({ error: result.error || 'Something went wrong!' });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/');
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Head>
                <title>Sign Up</title>
            </Head>
            <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} theme="light" transition={Slide} />
            <div className="w-full max-w-sm p-6 space-y-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center">
                    <FontAwesomeIcon icon={faShoppingCart} className="text-indigo-500 w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900">Create an Account</h2>
                
                <form className="space-y-4" onSubmit={handleSignup}>
                    {error && <div className="text-sm text-red-600">{error}</div>}

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* User Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Account Type</label>
                        <div className="flex space-x-4 mt-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value="user"
                                    checked={userType === 'user'}
                                    onChange={() => setUserType('user')}
                                    className="text-indigo-500 focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-900">User</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value="seller"
                                    checked={userType === 'seller'}
                                    onChange={() => setUserType('seller')}
                                    className="text-indigo-500 focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-900">Seller</span>
                            </label>
                        </div>
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Redirect */}
                <p className="text-sm text-center text-gray-900">
                    Already have an account?{' '}
                    <Link href="/login" className="text-indigo-500 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
