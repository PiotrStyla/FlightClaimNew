declare global {
  interface Window {
    ethereum?: any;
  }
  
  // Add File and FormData to global namespace for React Native
  var File: any;
  var FormData: any;
}

interface EthereumProvider {
  [key: string]: any;
}

// Web3/Ethereum polyfill with mock functionality
if (typeof window !== 'undefined') {
  const mockEthereum: EthereumProvider = new Proxy({}, {
    get: function(target: EthereumProvider, prop: string) {
      // Return a no-op function for any method call
      return function() {
        return Promise.resolve();
      };
    },
    set: function(target: EthereumProvider, prop: string, value: any) {
      // Silently accept any value without actually storing it
      return true;
    }
  });

  try {
    // Try to define the property if it doesn't exist
    if (!window.ethereum) {
      Object.defineProperty(window, 'ethereum', {
        value: mockEthereum,
        writable: true,
        configurable: true,
      });
    }
  } catch (error) {
    console.warn('Failed to polyfill window.ethereum', error);
  }
}

// FormData polyfill for React Native
if (typeof global !== 'undefined' && !global.FormData) {
  class FormDataPolyfill {
    private _parts: any[] = [];
    
    append(key: string, value: any, fileName?: string) {
      this._parts.push([key, value, fileName]);
    }
    
    getParts() {
      return this._parts;
    }
  }
  
  global.FormData = FormDataPolyfill;
}

// File polyfill for React Native
if (typeof global !== 'undefined' && !global.File) {
  class FilePolyfill {
    name: string;
    type: string;
    size: number;
    lastModified: number;
    _data: any;
    
    constructor(bits: any[], filename: string, options: any = {}) {
      this.name = filename;
      this.type = options.type || '';
      this.size = bits.length;
      this.lastModified = options.lastModified || Date.now();
      this._data = bits;
    }
  }
  
  global.File = FilePolyfill;
}

export {};
