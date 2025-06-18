// File: components/AuthForm.jsx
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContexts';

export default function AuthForm({ type = "signin" }) {
    const router = useRouter();
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        ...(type === 'signup' && {
            fullName: '',
            confirmPassword: '',
            phoneNumber: '',
            contact: '',
            userType: 'student',
            country: {
                name: '',
                code: ''
            }
        })
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'countryName' || name === 'countryCode') {
            setFormData(prev => ({
                ...prev,
                country: {
                    ...prev.country,
                    [name === 'countryName' ? 'name' : 'code']: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (type === 'signup') {
            if (!formData.fullName) newErrors.fullName = "Full name is required";
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = "Please confirm your password";
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords don't match";
            }
            if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
            if (!formData.contact) newErrors.contact = "Contact is required";
            if (!formData.country.name) newErrors.countryName = "Country name is required";
            if (!formData.country.code) newErrors.countryCode = "Country code is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            let response;
            
            if (type === 'signin') {
                // Login endpoint
                response = await api.post('/auth/login', {
                    email: formData.email,
                    password: formData.password
                });
            } else {
                // Signup endpoint
                response = await api.post('/auth/signup', {
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    userType: formData.userType,
                    phoneNumber: formData.phoneNumber,
                    contact: formData.contact,
                    country: {
                        name: formData.country.name,
                        code: formData.country.code
                    }
                });
            }

            // Handle successful authentication
            const { user, token } = response.data;
            login(user, token);
            
            // Redirect to dashboard
            if(user.userType === 'instructor')
                router.push('/instructor/dashboard');
    
            else if(user.userType)
                router.push('/student/dashboard')
           
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                               error.response?.data?.error || 
                               `${type === 'signin' ? 'Sign in' : 'Sign up'} failed. Please try again.`;
            
            setErrors({ general: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
            <Head>
                <title>{type === 'signin' ? 'Sign In' : 'Sign Up'} | E-Learning Platform</title>
            </Head>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex items-center justify-center gap-2 max-w-sm">
                    <img
                        className="h-12 w-auto rounded-full border"
                        src="https://picsum.photos/200?random=1"
                        alt="E-Learning Logo"
                        loading="lazy"
                    />
                    <Logo />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {type === 'signin' ? 'Sign in to your account' : 'Create a new account'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    {type === 'signin' ? (
                        <>
                            Don't have an account?{' '}
                            <Link href="/auth/signup" className="font-mediu text-brand hover:text-brand/80">
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <Link href="/auth/login" className="font-mediu text-brand hover:text-brand/80">
                                Sign in
                            </Link>
                        </>
                    )}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 border border-gray-200 sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {errors.general && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                <p className="text-sm text-red-600">{errors.general}</p>
                            </div>
                        )}

                        {type === 'signup' && (
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        autoComplete="name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`appearance-none block w-full px-3 py-2 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand/50 focus:border-brand/50 sm:text-sm`}
                                    />
                                    {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand/50 focus:border-brand/50 sm:text-sm`}
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete={type === 'signin' ? 'current-password' : 'new-password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand/50 focus:border-brand/50 sm:text-sm`}
                                />
                                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                            </div>
                        </div>

                        {type === 'signup' && (
                            <>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            autoComplete="new-password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand/50 focus:border-brand/50 sm:text-sm`}
                                        />
                                        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            autoComplete="tel"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className={`appearance-none block w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand/50 focus:border-brand/50 sm:text-sm`}
                                        />
                                        {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                                        Contact
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="contact"
                                            name="contact"
                                            type="text"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            className={`appearance-none block w-full px-3 py-2 border ${errors.contact ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand/50 focus:border-brand/50 sm:text-sm`}
                                        />
                                        {errors.contact && <p className="mt-2 text-sm text-red-600">{errors.contact}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                                        User Type
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="userType"
                                            name="userType"
                                            value={formData.userType}
                                            onChange={handleChange}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand/50 focus:border-brand/50 sm:text-sm"
                                        >
                                            <option value="student">Student</option>
                                            <option value="instructor">Instructor</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="countryName" className="block text-sm font-medium text-gray-700">
                                            Country Name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="countryName"
                                                name="countryName"
                                                type="text"
                                                value={formData.country.name}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full px-3 py-2 border ${errors.countryName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand/50 focus:border-brand/50 sm:text-sm`}
                                                placeholder="e.g., Cameroon"
                                            />
                                            {errors.countryName && <p className="mt-2 text-sm text-red-600">{errors.countryName}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">
                                            Country Code
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="countryCode"
                                                name="countryCode"
                                                type="text"
                                                value={formData.country.code}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full px-3 py-2 border ${errors.countryCode ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand/50 focus:border-brand/50 sm:text-sm`}
                                                placeholder="e.g., CM"
                                            />
                                            {errors.countryCode && <p className="mt-2 text-sm text-red-600">{errors.countryCode}</p>}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {type === 'signin' && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w- text-brand focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link href="/auth/forgot-password" className="font-mediu text-brand hover:text-brand/80">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    type === 'signin' ? 'Sign in' : 'Sign up'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}