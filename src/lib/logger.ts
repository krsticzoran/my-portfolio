/* eslint-disable no-console */

// Lightweight logger wrapper. Keeps debug output (`log`, `debug`) out of production builds
// and centralizes console calls so ESLint doesn't flag usages across the codebase.
// Use `log`, `debug`, and `error` depending on the importance of the message.
const isDev = process.env.NODE_ENV !== "production";

export function log(...args: unknown[]) {
  if (isDev) console.log(...args);
}

export function debug(...args: unknown[]) {
  if (isDev) console.debug(...args);
}

// Errors are always logged: on the server they end up in the hosting logs (e.g. Vercel),
// which is exactly where production failures need to be visible.
export function logError(...args: unknown[]) {
  console.error(...args);
}

const logger = { log, debug, logError };

export default logger;
