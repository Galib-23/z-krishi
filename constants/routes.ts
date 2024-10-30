export const LOGIN = '/login';
export const ROOT = '/';

// -> these two if not explicitly say then use '/api/auth'
// '/api/auth/callback/google'
// '/api/auth/callback/github'
export const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/products',
  '/api/auth'
]

export const PROTECTED_SUB_ROUTES = [
  '/checkout',
]