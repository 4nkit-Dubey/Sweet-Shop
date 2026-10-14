/**
 * Logger utility for development/production logging (React/Vite)
 * In production, logs are suppressed unless DEBUG=true is set
 */

const isDevelopment = import.meta.env.MODE === 'development';
const isDebugEnabled = import.meta.env.VITE_DEBUG === 'true';
const shouldLog = isDevelopment || isDebugEnabled;

const logger = {
  log: (...args) => {
    if (shouldLog) {
      console.log(...args);
    }
  },

  error: (...args) => {
    if (shouldLog) {
      console.error(...args);
    }
  },

  warn: (...args) => {
    if (shouldLog) {
      console.warn(...args);
    }
  },

  info: (...args) => {
    if (shouldLog) {
      console.info(...args);
    }
  },

  debug: (...args) => {
    if (shouldLog) {
      console.debug(...args);
    }
  }
};

export default logger;
