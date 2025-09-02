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

export function isValidPersonName(
  name: string,
  options: NameValidationOptions = {},
): ValidationResult {
  const {
    minLength = 2,
    maxLength = 50,
    allowNumbers = false,
    allowSpecialChars = false,
  } = options;

  // Check if name is provided
  if (!name || typeof name !== "string") {
    return { isValid: false, message: "Name is required" };
  }

  // Trim whitespace
  const trimmedName = name.trim();

  // Check length requirements
  if (trimmedName.length < minLength) {
    return {
      isValid: false,
      message: `Name must be at least ${minLength} characters long`,
    };
  }

  if (trimmedName.length > maxLength) {
    return {
      isValid: false,
      message: `Name must be less than ${maxLength} characters long`,
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

  if (!validCharactersRegex.test(trimmedName)) {
    return {
      isValid: false,
      message: "Name contains invalid characters",
    };
  }

  // Check for consecutive special characters (if allowed)
  if (allowSpecialChars) {
    const consecutiveSpecialChars = /[\-'.]{2,}/;
    if (consecutiveSpecialChars.test(trimmedName)) {
      return {
        isValid: false,
        message: "Name contains consecutive special characters",
      };
    }
  }

  // Check if name starts or ends with special character (if allowed)
  if (allowSpecialChars) {
    const startsOrEndsWithSpecialChar = /^[\-'.]|[\-'.]$/;
    if (startsOrEndsWithSpecialChar.test(trimmedName)) {
      return {
        isValid: false,
        message: "Name cannot start or end with a special character",
      };
    }
  }

  // Check for at least one letter
  const hasLetters = /[a-zA-ZÀ-ÿ]/.test(trimmedName);
  if (!hasLetters) {
    return {
      isValid: false,
      message: "Name must contain at least one letter",
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
