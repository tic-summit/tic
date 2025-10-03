"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import { getTimeUntilExpiration, formatTimeUntilExpiration, willTokenExpireSoon } from '@/lib/tokenUtils';

/**
 * Session monitoring component that shows session status and warns before expiration
 */
export default function SessionMonitor() {
  const { user, isAuthenticated } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?.token) return;

    const updateTimeRemaining = () => {
      const timeUntilExpiration = getTimeUntilExpiration(user.token);
      setTimeRemaining(timeUntilExpiration);
      
      // Show warning if token will expire within 5 minutes
      setShowWarning(willTokenExpireSoon(user.token, 5 * 60 * 1000));
    };

    // Update immediately
    updateTimeRemaining();

    // Update every 30 seconds
    const interval = setInterval(updateTimeRemaining, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, user?.token]);

  if (!isAuthenticated || !timeRemaining) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      {showWarning && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded shadow-lg mb-2">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                Session expires in {formatTimeUntilExpiration(user.token)}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Optional: Always show session time remaining in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-3 py-2 rounded text-sm">
          Session: {formatTimeUntilExpiration(user.token)}
        </div>
      )}
    </div>
  );
}
