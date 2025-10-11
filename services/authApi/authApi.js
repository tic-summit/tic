import axios from 'axios';
import { baseURL } from '../baseUrl.jsx';

// Register a new user
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to register user');
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};

// Refresh access token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${baseURL}/auth/refresh-token`, {
      refreshToken
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to refresh token');
  }
};

// Logout user
export const logoutUser = async (refreshToken) => {
  try {
    const response = await axios.post(`${baseURL}/auth/logout`, {
      refreshToken
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to logout');
  }
};

// Verify email
export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to verify email');
  }
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${baseURL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to process forgot password request');
  }
};

// Verify reset token
export const verifyResetToken = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/auth/verify-reset-token?token=${token}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Invalid or expired token');
  }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${baseURL}/auth/reset-password`, {
      token,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to reset password');
  }
};
