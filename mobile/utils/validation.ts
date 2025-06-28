// GSTIN validation utilities for Indian GST numbers
// Format: ##AAAAAAAAAA#Z# (15 characters)
// ## = State code (2 digits)
// AAAAAAAAAA = PAN (10 characters - 5 letters, 4 digits, 1 letter)
// # = Registration number (1 digit)
// Z = Literal 'Z'
// # = Check digit (1 digit)

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Valid state codes for GSTIN
const VALID_STATE_CODES = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
];

// State code to name mapping (for better error messages)
const STATE_NAMES: Record<string, string> = {
  "01": "Jammu and Kashmir",
  "02": "Himachal Pradesh",
  "03": "Punjab",
  "04": "Chandigarh",
  "05": "Uttarakhand",
  "06": "Haryana",
  "07": "Delhi",
  "08": "Rajasthan",
  "09": "Uttar Pradesh",
  "10": "Bihar",
  "11": "Sikkim",
  "12": "Arunachal Pradesh",
  "13": "Nagaland",
  "14": "Manipur",
  "15": "Mizoram",
  "16": "Tripura",
  "17": "Meghalaya",
  "18": "Assam",
  "19": "West Bengal",
  "20": "Jharkhand",
  "21": "Odisha",
  "22": "Chhattisgarh",
  "23": "Madhya Pradesh",
  "24": "Gujarat",
  "25": "Daman and Diu",
  "26": "Dadra and Nagar Haveli",
  "27": "Maharashtra",
  "28": "Andhra Pradesh",
  "29": "Karnataka",
  "30": "Goa",
  "31": "Lakshadweep",
  "32": "Kerala",
  "33": "Tamil Nadu",
  "34": "Puducherry",
  "35": "Andaman and Nicobar Islands",
  "36": "Telangana",
  "37": "Andhra Pradesh",
  "38": "Ladakh",
};

/**
 * Validates PAN (Permanent Account Number) format
 * Format: AAAAA9999A (5 letters, 4 digits, 1 letter)
 */
export function validatePAN(pan: string): ValidationResult {
  if (!pan || pan.length !== 10) {
    return {
      isValid: false,
      error: "PAN must be exactly 10 characters long",
    };
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(pan)) {
    return {
      isValid: false,
      error: "PAN format is invalid (should be AAAAA9999A)",
    };
  }

  return { isValid: true };
}

/**
 * Calculates GSTIN check digit using the correct algorithm
 * Official GSTIN algorithm uses alternating weight factors
 */
function calculateGSTINCheckDigit(gstin: string): string {
  // Weight factors for positions 1-14 (left to right)
  const weights = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
  let sum = 0;

  for (let i = 0; i < 14; i++) {
    let digit: number;
    const char = gstin[i];

    // Convert character to numeric value
    if (char >= "0" && char <= "9") {
      digit = char.charCodeAt(0) - "0".charCodeAt(0);
    } else {
      digit = char.toUpperCase().charCodeAt(0) - "A".charCodeAt(0) + 10;
    }

    // Apply weight factor and calculate contribution
    const weightedValue = digit * weights[i];
    const quotient = Math.floor(weightedValue / 36);
    const remainder = weightedValue % 36;
    sum += quotient + remainder;
  }

  // Calculate check digit
  const checkDigit = (36 - (sum % 36)) % 36;

  // Convert to character
  if (checkDigit < 10) {
    return checkDigit.toString();
  } else {
    return String.fromCharCode(checkDigit - 10 + "A".charCodeAt(0));
  }
}

/**
 * Comprehensive GSTIN validation
 */
export function validateGSTIN(gstin: string): ValidationResult {
  // Remove spaces and convert to uppercase
  const cleanGSTIN = gstin.replace(/\s/g, "").toUpperCase();

  // Check length
  if (!cleanGSTIN || cleanGSTIN.length !== 15) {
    return {
      isValid: false,
      error: "GSTIN must be exactly 15 characters long",
    };
  }

  // Check basic format using regex
  const gstinRegex =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  if (!gstinRegex.test(cleanGSTIN)) {
    return {
      isValid: false,
      error: "GSTIN format is invalid",
    };
  }

  // Validate state code
  const stateCode = cleanGSTIN.substring(0, 2);
  if (!VALID_STATE_CODES.includes(stateCode)) {
    return {
      isValid: false,
      error: `Invalid state code: ${stateCode}`,
    };
  }

  // Validate PAN portion (characters 2-12)
  const panPortion = cleanGSTIN.substring(2, 12);
  const panValidation = validatePAN(panPortion);
  if (!panValidation.isValid) {
    return {
      isValid: false,
      error: `Invalid PAN in GSTIN: ${panValidation.error}`,
    };
  }

  // Check 13th character (entity code/registration number)
  const entityCode = cleanGSTIN[12];
  if (!/^[1-9A-Z]$/.test(entityCode)) {
    return {
      isValid: false,
      error: "13th character must be a digit (1-9) or letter (A-Z)",
    };
  }

  // Check 14th character (must be 'Z')
  if (cleanGSTIN[13] !== "Z") {
    return {
      isValid: false,
      error: "14th character must be 'Z'",
    };
  }

  // Validate check digit
  const providedCheckDigit = cleanGSTIN[14];
  const calculatedCheckDigit = calculateGSTINCheckDigit(cleanGSTIN);

  if (providedCheckDigit !== calculatedCheckDigit) {
    return {
      isValid: false,
      error: `Invalid check digit. Expected: ${calculatedCheckDigit}, provided: ${providedCheckDigit}`,
    };
  }

  return { isValid: true };
}

/**
 * Formats GSTIN with proper spacing for display
 */
export function formatGSTIN(gstin: string): string {
  const cleanGSTIN = gstin.replace(/\s/g, "").toUpperCase();
  if (cleanGSTIN.length !== 15) return cleanGSTIN;

  // Format as: ##AAAAA####A#Z#
  return `${cleanGSTIN.substring(0, 2)} ${cleanGSTIN.substring(
    2,
    7
  )} ${cleanGSTIN.substring(7, 11)} ${cleanGSTIN.substring(
    11,
    12
  )} ${cleanGSTIN.substring(12, 13)} ${cleanGSTIN.substring(
    13,
    14
  )} ${cleanGSTIN.substring(14, 15)}`;
}

/**
 * Gets state name from GSTIN
 */
export function getStateFromGSTIN(gstin: string): string {
  const cleanGSTIN = gstin.replace(/\s/g, "").toUpperCase();
  if (cleanGSTIN.length < 2) return "";

  const stateCode = cleanGSTIN.substring(0, 2);
  return STATE_NAMES[stateCode] || `Unknown (${stateCode})`;
}

/**
 * Validates customer name (basic validation)
 */
export function validateCustomerName(name: string): ValidationResult {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return {
      isValid: false,
      error: "Customer name is required",
    };
  }

  if (trimmedName.length < 2) {
    return {
      isValid: false,
      error: "Customer name must be at least 2 characters long",
    };
  }

  if (trimmedName.length > 100) {
    return {
      isValid: false,
      error: "Customer name must be less than 100 characters",
    };
  }

  // Allow letters, numbers, spaces, and common business characters
  const nameRegex = /^[a-zA-Z0-9\s\-\.\,\(\)\'\"&]+$/;
  if (!nameRegex.test(trimmedName)) {
    return {
      isValid: false,
      error: "Customer name contains invalid characters",
    };
  }

  return { isValid: true };
}
