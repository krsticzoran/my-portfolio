export function sanitizeInput(input: string) {
  return input
    .substring(0, 2000)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
