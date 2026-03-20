/* ─── Admin Authentication Utilities ─── */

/**
 * Validate Bearer token from request header (server-side).
 * Compares against ADMIN_PASSWORD environment variable.
 */
function validateBearerToken(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return false;

  const token = parts[1];
  const adminPassword = process.env.ADMIN_PASSWORD ?? '';

  if (!adminPassword) {
    console.error('[Auth] ADMIN_PASSWORD not configured');
    return false;
  }

  return token === adminPassword;
}

/** Key used for localStorage */
const AUTH_STORAGE_KEY = 'autohub_admin_token';

/**
 * Get the auth token from localStorage (client-side only).
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

/**
 * Save the auth token to localStorage (client-side only).
 */
function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_STORAGE_KEY, token);
}

/**
 * Remove the auth token from localStorage (client-side only).
 */
function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export { validateBearerToken, getAuthToken, setAuthToken, removeAuthToken };
