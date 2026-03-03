/**
 * ============================================================================
 * BACKEND API CONFIGURATION
 * ============================================================================
 * 
 * This file contains all backend API configurations and endpoints.
 * 
 * IMPORTANT: Update the API base URL before using the app in production.
 * 
 * To start the backend server:
 *   uvicorn main:app --host 0.0.0.0 --port 8000
 */

/**
 * Backend server base URL
 * 
 * @description
 * - In development: Use your machine's local IP (e.g., http://192.168.1.100:8000)
 * - In production: Use the server domain (e.g., https://api.yourdomain.com)
 * 
 * @example
 * // Local development
 * export const API_BASE_URL = 'http://localhost:8000';
 * 
 * // Local network
 * export const API_BASE_URL = 'http://192.168.1.100:8000';
 * 
 * // Production
 * export const API_BASE_URL = 'https://api.yourdomain.com';
 */
export const API_BASE_URL = 'http://10.109.177.231:8000';

/**
 * Authentication endpoints
 * 
 * @description
 * All authentication endpoints use the /auth prefix and require POST with JSON body.
 * The backend should implement a FastAPI APIRouter with the /auth prefix.
 * 
 * @example
 * // Example usage of login endpoint
 * const response = await fetch(AUTH.login, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ email: 'user@example.com', password: 'password123' })
 * });
 */
export const AUTH = {
  /** New user registration - POST /auth/register */
  register: `${API_BASE_URL}/auth/register`,
  
  /** Existing user login - POST /auth/login */
  login: `${API_BASE_URL}/auth/login`,
  
  /** Password recovery request - POST /auth/recoverPassword */
  recoverPassword: `${API_BASE_URL}/auth/recoverPassword`,
  
  /** Password reset with token - POST /auth/resetPassword */
  resetPassword: `${API_BASE_URL}/auth/resetPassword`,
  
  // ============================================================================
  // SOCIAL AUTHENTICATION
  // ============================================================================
  // NOTE: These endpoints need to be implemented in the backend.
  // See SOCIAL_AUTH_GUIDE.md for more details.
  
  /** Login with Google - POST /auth/social/google */
  socialGoogle: `${API_BASE_URL}/auth/social/google`,
  
  /** Login with Facebook - POST /auth/social/facebook */
  socialFacebook: `${API_BASE_URL}/auth/social/facebook`,
  
  /** Login with Apple - POST /auth/social/apple */
  socialApple: `${API_BASE_URL}/auth/social/apple`,
} as const;

/**
 * Package analysis endpoints
 * 
 * @description
 * Endpoint that uses a Machine Learning model to detect if a package
 * is intact or damaged through image analysis.
 * 
 * @example
 * // Example usage
 * const formData = new FormData();
 * formData.append('image', {
 *   uri: imageUri,
 *   type: 'image/jpeg',
 *   name: 'package.jpg'
 * });
 * 
 * const response = await fetch(PACKAGE_ANALYSIS.analyze, {
 *   method: 'POST',
 *   body: formData,
 *   headers: {
 *     'Authorization': `Bearer ${token}`
 *   }
 * });
 * 
 * const result = await response.json();
 * // { status: 'intact' | 'damaged', confidence: 0.95 }
 */
export const PACKAGE_ANALYSIS = {
  /** Package image analysis - POST /package/analyze */
  analyze: `${API_BASE_URL}/package/analyze`,
} as const;

/**
 * Extracts the first error message from a 422 validation response
 * 
 * @description
 * When the backend returns a 422 error (Unprocessable Entity), it usually
 * comes in FastAPI format with an array of details. This function safely
 * extracts the first error message.
 * 
 * @param detail - The 'detail' field from the backend error response
 * @returns The first error message found or a generic message
 * 
 * @example
 * try {
 *   const response = await fetch(AUTH.login, { ... });
 *   if (!response.ok) {
 *     const error = await response.json();
 *     const message = getValidationErrorMessage(error.detail);
 *     Alert.alert('Error', message);
 *   }
 * } catch (error) {
 *   // ...
 * }
 */
export function getValidationErrorMessage(detail: unknown): string {
  // Check if it's an array of errors (standard FastAPI format)
  if (Array.isArray(detail) && detail.length > 0 && detail[0] && typeof detail[0] === 'object' && 'msg' in detail[0]) {
    return String((detail[0] as { msg: string }).msg);
  }
  
  // If it's a simple string, return it directly
  if (typeof detail === 'string') return detail;
  
  // Default message if unable to extract error
  return 'Something went wrong. Try again.';
}
