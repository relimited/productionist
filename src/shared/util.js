// This is where some configuration settings are going to go.
// Essentally, this is where we'll set if we're running in production mode or not.
// Production will minify our files, we'll use a webpack-dev-server for development
export const isProd = process.env.NODE_ENV === 'production';
