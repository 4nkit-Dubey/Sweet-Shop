/**
 * Logger utility for development/production logging
 * In production, logs are suppressed unless DEBUG=true is set
 */

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV !== 'production';
const isDebugEnabled = process.env.DEBUG === 'true';
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

module.exports = logger;
