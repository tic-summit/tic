import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  signupUser,
  loginUser,
  refreshToken,
  logoutUser,
  verifyEmail,
  forgotPassword,
  verifyResetToken,
  resetPassword
} from './authApi';

// Signup hook
export const useSignup = () => {
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log('Signup successful:', data);
    },
    onError: (error) => {
      console.error('Signup failed:', error);
    },
  });
};

// Login hook
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store tokens in localStorage
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      // Invalidate and refetch user queries
      queryClient.invalidateQueries(['user']);
      console.log('Login successful:', data);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

// Refresh token hook
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
      }
      console.log('Token refreshed successfully');
    },
    onError: (error) => {
      console.error('Token refresh failed:', error);
      // Clear stored tokens on refresh failure
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  });
};

// Logout hook
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      return logoutUser(refreshTokenValue);
    },
    onSuccess: () => {
      // Clear all stored data
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Clear all queries
      queryClient.clear();
      console.log('Logout successful');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Clear local storage even if logout fails
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      queryClient.clear();
    },
  });
};

// Email verification hook
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      console.log('Email verified successfully:', data);
    },
    onError: (error) => {
      console.error('Email verification failed:', error);
    },
  });
};

// Forgot password hook
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      console.log('Password reset email sent:', data);
    },
    onError: (error) => {
      console.error('Forgot password failed:', error);
    },
  });
};

// Verify reset token hook
export const useVerifyResetToken = () => {
  return useMutation({
    mutationFn: verifyResetToken,
    onSuccess: (data) => {
      console.log('Reset token verified:', data);
    },
    onError: (error) => {
      console.error('Reset token verification failed:', error);
    },
  });
};

// Reset password hook
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, userId, newPassword }) => resetPassword(token, userId, newPassword),
    onSuccess: (data) => {
      console.log('Password reset successful:', data);
    },
    onError: (error) => {
      console.error('Password reset failed:', error);
    },
  });
};
