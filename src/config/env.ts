export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  CI: process.env.CI || false,
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
};
