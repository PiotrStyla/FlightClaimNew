// Import polyfills first
import './polyfills';

// Export a function to initialize the app
export function initializeApp() {
  try {
    console.log('App initialization started');
    
    // Set up global error handler to catch and log all errors
    const originalConsoleError = console.error;
    console.error = function(...args) {
      originalConsoleError.apply(console, args);
      console.log('ERROR:', ...args);
    };
    
    console.log('App initialization completed successfully');
  } catch (error) {
    console.error('Error during app initialization:', error);
  }
}
