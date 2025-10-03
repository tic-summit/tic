/**
 * Token validation utilities
 */

/**
 * Check if a JWT token is expired
 * @param {string} token - The JWT token to check
 * @returns {boolean} - True if token is expired or invalid, false otherwise
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    // Decode JWT token (basic check without verification)
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Date.now() / 1000;
    
    // Check if token has expiration time and if it's expired
    if (payload.exp && payload.exp < currentTime) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error validating token:', error);
    return true; // If token is malformed, consider it expired
  }
};

/**
 * Get token expiration time in milliseconds
 * @param {string} token - The JWT token
 * @returns {number|null} - Expiration time in milliseconds or null if invalid
 */
export const getTokenExpirationTime = (token) => {
  if (!token) return null;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    return payload.exp ? payload.exp * 1000 : null; // Convert to milliseconds
  } catch (error) {
    console.error('Error getting token expiration:', error);
    return null;
  }
};

/**
 * Get time remaining until token expires in milliseconds
 * @param {string} token - The JWT token
 * @returns {number} - Time remaining in milliseconds, 0 if expired or invalid
 */
export const getTimeUntilExpiration = (token) => {
  const expirationTime = getTokenExpirationTime(token);
  if (!expirationTime) return 0;
  
  const currentTime = Date.now();
  return Math.max(0, expirationTime - currentTime);
};

/**
 * Check if token will expire within specified time
 * @param {string} token - The JWT token
 * @param {number} timeInMs - Time in milliseconds to check ahead
 * @returns {boolean} - True if token will expire within the specified time
 */
export const willTokenExpireSoon = (token, timeInMs = 5 * 60 * 1000) => { // Default 5 minutes
  const timeUntilExpiration = getTimeUntilExpiration(token);
  return timeUntilExpiration > 0 && timeUntilExpiration <= timeInMs;
};

/**
 * Format time remaining until token expires
 * @param {string} token - The JWT token
 * @returns {string} - Formatted time string (e.g., "2h 30m", "45s", "Expired")
 */
export const formatTimeUntilExpiration = (token) => {
  const timeUntilExpiration = getTimeUntilExpiration(token);
  
  if (timeUntilExpiration === 0) return 'Expired';
  
  const hours = Math.floor(timeUntilExpiration / (1000 * 60 * 60));
  const minutes = Math.floor((timeUntilExpiration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeUntilExpiration % (1000 * 60)) / 1000);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};
