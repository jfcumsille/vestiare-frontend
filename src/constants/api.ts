export const BASE_API_HOST = import.meta.env.VITE_BASE_API_HOST || 'http://api.localhost:3000';

export const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN || '';
export const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID || '';
export const USERNAME_PASSWORD_CONNECTION = (
  import.meta.env.VITE_USERNAME_PASSWORD_CONNECTION || 'username-password-staging'
) as 'username-password-staging' | 'username-password-production';

export const SEGMENT_KEY = import.meta.env.VITE_SEGMENT_WRITE_KEY || '';

export const HOTJAR_ORGANIZATION_IDS = import.meta.env.VITE_HOTJAR_ORGANIZATION_IDS || '';
