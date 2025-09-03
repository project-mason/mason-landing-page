/**
 * Validates if a string could be a real person's name
 * @param name - The name to validate
 * @param options - Configuration options for validation
 * @returns Object with validation result and optional message
 */
interface NameValidationOptions {
  minLength?: number;
  maxLength?: number;
  allowNumbers?: boolean;
  allowSpecialChars?: boolean;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function isValidText(
  field: string,
  value: string,
  options: NameValidationOptions = {},
): ValidationResult {
  const {
    minLength = 1,
    maxLength = 50,
    allowNumbers = false,
    allowSpecialChars = false,
  } = options;

  // Check if value is provided
  if (!value || typeof value !== "string") {
    return { isValid: false, message: `${field} is required` };
  }

  // Trim whitespace
  const trimmedValue = value.trim();

  // Check length requirements
  if (trimmedValue.length < minLength) {
    return {
      isValid: false,
      message: `${field} must be at least ${minLength} characters long`,
    };
  }

  if (trimmedValue.length > maxLength) {
    return {
      isValid: false,
      message: `${field} must be less than ${maxLength} characters long`,
    };
  }

  // Check for invalid characters
  let validCharactersRegex: RegExp;

  if (allowSpecialChars) {
    // Allow letters, spaces, hyphens, apostrophes, and periods
    validCharactersRegex = /^[a-zA-ZÀ-ÿ\s\-'.]+$/;
  } else {
    // Allow only letters and spaces
    validCharactersRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  }

  if (allowNumbers) {
    // Modify regex to allow numbers if specified
    validCharactersRegex = allowSpecialChars
      ? /^[a-zA-ZÀ-ÿ0-9\s\-'.]+$/
      : /^[a-zA-ZÀ-ÿ0-9\s]+$/;
  }

  if (!validCharactersRegex.test(trimmedValue)) {
    return {
      isValid: false,
      message: `${field} contains invalid characters`,
    };
  }

  // Check for consecutive special characters (if allowed)
  if (allowSpecialChars) {
    const consecutiveSpecialChars = /[\-'.]{2,}/;
    if (consecutiveSpecialChars.test(trimmedValue)) {
      return {
        isValid: false,
        message: `${field} contains consecutive special characters`,
      };
    }
  }

  // Check if name starts or ends with special character (if allowed)
  if (allowSpecialChars) {
    const startsOrEndsWithSpecialChar = /^[\-'.]|[\-'.]$/;
    if (startsOrEndsWithSpecialChar.test(trimmedValue)) {
      return {
        isValid: false,
        message: `${field} cannot start or end with a special character`,
      };
    }
  }

  // Check for at least one letter
  const hasLetters = /[a-zA-ZÀ-ÿ]/.test(trimmedValue);
  if (!hasLetters) {
    return {
      isValid: false,
      message: `${field} must contain at least one letter`,
    };
  }

  // All checks passed
  return { isValid: true };
}

// Example usage:
// const result = isValidPersonName("John Doe");
// if (!result.isValid) {
//   console.error(result.message);
// }
