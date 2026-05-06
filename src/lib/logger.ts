/* eslint-disable no-console */

// Lightweight logger wrapper. Avoids console output in production builds
// and centralizes console calls so ESLint doesn't flag usages across the codebase.
// Use `log`, `debug`, and `error` depending on the importance of the message.
const isDev = process.env.NODE_ENV !== "production";

export function log(...args: unknown[]) {
  if (isDev) console.log(...args);
}

export function debug(...args: unknown[]) {
  if (isDev) console.debug(...args);
}

export function logError(...args: unknown[]) {
  if (isDev) console.error(...args);
}

export default { log, debug, logError };
