/**
 * API base URL: IP/DNS of your backend server.
 * Update this to match your backend server address.
 * Start the API with: uvicorn main:app --host 0.0.0.0 --port 8000
 */
export const API_BASE_URL = 'http://10.109.177.231:8000';

/** Auth endpoints – prefix /auth (FastAPI APIRouter). All use POST with JSON body. */
export const AUTH = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  recoverPassword: `${API_BASE_URL}/auth/recoverPassword`,
  resetPassword: `${API_BASE_URL}/auth/resetPassword`,
  // Social auth endpoints (need to be created in backend)
  socialGoogle: `${API_BASE_URL}/auth/social/google`,
  socialFacebook: `${API_BASE_URL}/auth/social/facebook`,
  socialApple: `${API_BASE_URL}/auth/social/apple`,
} as const;

/** Package analysis endpoint - uses ML model to detect if package is intact or damaged */
export const PACKAGE_ANALYSIS = {
  analyze: `${API_BASE_URL}/package/analyze`, // POST with image file
} as const;

/**
 * Get first error message from 422 validation response (detail array).
 */
export function getValidationErrorMessage(detail: unknown): string {
  if (Array.isArray(detail) && detail.length > 0 && detail[0] && typeof detail[0] === 'object' && 'msg' in detail[0]) {
    return String((detail[0] as { msg: string }).msg);
  }
  if (typeof detail === 'string') return detail;
  return 'Something went wrong. Try again.';
}
