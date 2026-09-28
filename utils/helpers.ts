// Utility functions untuk formatting dan helpers

/**
 * Format number ke format Rupiah Indonesia
 * @param amount - Nominal yang akan diformat
 * @returns String format Rupiah (contoh: Rp 85.000)
 */
export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

/**
 * Format number dengan separator ribuan
 * @param num - Number yang akan diformat
 * @returns String dengan separator (contoh: 1.000.000)
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('id-ID');
}

/**
 * Truncate text dengan ellipsis
 * @param text - Text yang akan dipotong
 * @param maxLength - Panjang maksimal
 * @returns Text yang sudah dipotong
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Delay execution (untuk async operations)
 * @param ms - Milliseconds untuk delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random ID
 * @returns Random string ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns Boolean apakah email valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitalize first letter
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalizeFirst(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}
