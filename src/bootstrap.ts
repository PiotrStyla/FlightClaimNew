// Import polyfills first
import './polyfills';

// Import Firebase
import { app, auth, db, storage } from './services/firebase';

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
    
    // Verify Firebase is initialized
    if (app) {
      console.log('Firebase has been initialized successfully');
    }
    
    console.log('App initialization completed successfully');
    
    return { app, auth, db, storage };
  } catch (error) {
    console.error('Error during app initialization:', error);
    throw error;
  }
}
