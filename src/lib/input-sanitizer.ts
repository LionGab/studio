/**
 * @fileOverview Input sanitization utilities for AI flows
 * Prevents PII exposure and prompt injection attacks
 */

/**
 * Sanitizes a string input to prevent prompt injection
 * - Removes system prompt markers
 * - Limits length
 * - Removes potentially malicious patterns
 */
export function sanitizePromptInput(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove excessive whitespace
  let sanitized = input.trim().replace(/\s+/g, ' ');

  // Remove common prompt injection patterns
  const dangerousPatterns = [
    /ignore\s+(previous|above|all)\s+instructions?/gi,
    /disregard\s+(previous|above|all)\s+instructions?/gi,
    /forget\s+(previous|above|all)\s+instructions?/gi,
    /new\s+instructions?:/gi,
    /system\s*:/gi,
    /assistant\s*:/gi,
    /\[SYSTEM\]/gi,
    /\[ASSISTANT\]/gi,
    /<\|.*?\|>/g, // Special tokens
  ];

  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });

  // Truncate to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitizes location data to prevent PII exposure
 * Only keeps city and state, removes specific addresses
 */
export function sanitizeLocation(location: string): string {
  if (!location || typeof location !== 'string') {
    return '';
  }

  // Remove potential street addresses and zip codes
  let sanitized = location.trim();

  // Remove numbers that might be addresses or zip codes
  sanitized = sanitized.replace(/\d+\s+\w+\s+(st|street|ave|avenue|rd|road|blvd|boulevard|dr|drive|ln|lane|way|ct|court)/gi, '');
  sanitized = sanitized.replace(/\b\d{5}(-\d{4})?\b/g, ''); // ZIP codes

  // Limit to city and state format
  const parts = sanitized.split(',').map(p => p.trim()).filter(p => p.length > 0);
  
  // Keep only first 2 parts (city, state)
  if (parts.length > 2) {
    sanitized = parts.slice(0, 2).join(', ');
  }

  return sanitized.substring(0, 100); // Limit length
}

/**
 * Sanitizes interests array
 * - Removes potentially sensitive information
 * - Limits number and length of interests
 */
export function sanitizeInterests(interests: string[], maxInterests: number = 10): string[] {
  if (!Array.isArray(interests)) {
    return [];
  }

  return interests
    .filter(interest => interest && typeof interest === 'string')
    .map(interest => {
      // Remove excessive whitespace
      let sanitized = interest.trim().replace(/\s+/g, ' ');
      
      // Truncate long interests
      if (sanitized.length > 50) {
        sanitized = sanitized.substring(0, 50);
      }
      
      return sanitized;
    })
    .filter(interest => interest.length > 0)
    .slice(0, maxInterests);
}

/**
 * Validates and sanitizes baby age in months
 * Returns a safe range instead of exact age to protect privacy
 */
export function sanitizeBabyAge(ageMonths: number): string {
  if (typeof ageMonths !== 'number' || ageMonths < 0 || ageMonths > 240) {
    return 'not specified';
  }

  // Return age ranges instead of exact age for privacy
  if (ageMonths < 3) return '0-3 months';
  if (ageMonths < 6) return '3-6 months';
  if (ageMonths < 12) return '6-12 months';
  if (ageMonths < 24) return '1-2 years';
  if (ageMonths < 36) return '2-3 years';
  return '3+ years';
}

/**
 * Validates that input doesn't contain sensitive data patterns
 */
export function containsSensitiveData(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }

  const sensitivePatterns = [
    /\b\d{3}-\d{2}-\d{4}\b/g, // SSN
    /\b\d{11}\b/g, // CPF (Brazilian ID)
    /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g, // CPF formatted
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, // Email
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, // Phone numbers
    /\b(?:\d{4}[-\s]?){3}\d{4}\b/g, // Credit card
  ];

  return sensitivePatterns.some(pattern => pattern.test(input));
}
