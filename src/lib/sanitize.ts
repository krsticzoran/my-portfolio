export function sanitizeInput(input: string) {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .substring(0, 2000);
  }
  
