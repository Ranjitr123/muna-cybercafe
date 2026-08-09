export interface ContactFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  service: string;
  message: string;
  websiteHoneypot?: string; // Anti-spam field
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  // 1. Honeypot check for spam bots
  if (data.websiteHoneypot && data.websiteHoneypot.trim() !== '') {
    return {
      isValid: false,
      errors: { _bot: 'Spam submission detected.' },
    };
  }

  // 2. Full Name validation
  const cleanName = data.fullName ? data.fullName.trim() : '';
  if (!cleanName) {
    errors.fullName = 'Full Name is required';
  } else if (cleanName.length < 2) {
    errors.fullName = 'Please enter a valid name (at least 2 characters)';
  }

  // 3. Mobile Number validation (Indian 10-digit format)
  const cleanMobile = data.mobileNumber ? data.mobileNumber.replace(/\D/g, '') : '';
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!data.mobileNumber || !data.mobileNumber.trim()) {
    errors.mobileNumber = 'Mobile Number is required';
  } else if (!mobileRegex.test(cleanMobile)) {
    errors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9777735527)';
  }

  // 4. Email validation
  const cleanEmail = data.email ? data.email.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(cleanEmail)) {
    errors.email = 'Please enter a valid email address';
  }

  // 5. Service required validation
  if (!data.service || data.service.trim() === '') {
    errors.service = 'Please select a required service';
  }

  // 6. Message length validation
  const cleanMessage = data.message ? data.message.trim() : '';
  if (!cleanMessage) {
    errors.message = 'Message is required';
  } else if (cleanMessage.length < 5) {
    errors.message = 'Message must be at least 5 characters long';
  } else if (cleanMessage.length > 1000) {
    errors.message = 'Message exceeds maximum length of 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function sanitizeInput(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}
