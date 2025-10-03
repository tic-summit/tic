"use client"
import { useAuth } from '@/contexts/AuthContexts';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, validateSession } = useAuth();
  const router = useRouter();
  const [sessionValidated, setSessionValidated] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Validate session on component mount
      const isValid = validateSession();
      setSessionValidated(true);
      
      if (!isValid) {
        // Session is invalid, redirect to homepage
        router.push('/');
        return;
      }
    }
  }, [isLoading, validateSession, router]);

  // Show loading while checking authentication
  if (isLoading || !sessionValidated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // If not authenticated after validation, show nothing (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  return children;
}