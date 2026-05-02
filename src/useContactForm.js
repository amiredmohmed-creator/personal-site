import { useState } from 'react';

/**
 * Sanitizes user input to prevent XSS (Cross-Site Scripting) attacks.
 * Converts potentially dangerous HTML characters to safe entities.
 * @param {string} str - The input string to sanitize
 * @returns {string} - Sanitized string safe for display/storage
 */
const sanitizeInput = (str) => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validates email format using a regular expression.
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format, false otherwise
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates all form fields with specific rules for each field.
 * Returns an object with field names as keys and error messages as values.
 * @param {string} name - User's name
 * @param {string} email - User's email address
 * @param {string} message - Project details message
 * @returns {object} - Object containing validation errors (empty if all valid)
 */
const validateForm = (name, email, message) => {
  const errors = {};

  // Name validation: required, 2-100 characters
  if (!name || name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (name.length > 100) {
    errors.name = 'Name must be under 100 characters';
  }

  // Email validation: required and must be valid format
  if (!email || email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // Message validation: required, 10-5000 characters
  if (!message || message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (message.length > 5000) {
    errors.message = 'Message must be under 5000 characters';
  }

  return errors;
};

/**
 * Custom React hook for managing contact form state and logic.
 * Handles:
 * - Form input state management
 * - Real-time validation with error messages
 * - Rate limiting (1 submission per 60 seconds)
 * - Form submission to FormSubmit service
 * - User feedback (success/error messages)
 * - XSS protection via input sanitization
 * 
 * @returns {object} - Form state and handlers
 */
export const useContactForm = () => {
  // Form input fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Validation errors for each field
  const [errors, setErrors] = useState({});
  // Loading state while submitting
  const [loading, setLoading] = useState(false);
  // Feedback message: { type: 'success' | 'error', message: string }
  const [feedback, setFeedback] = useState(null);
  // Timestamp of last successful submission (for rate limiting)
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  // Rate limiting: 1 submission per 60 seconds
  const RATE_LIMIT_MS = 60000;

  /**
   * Handles input field changes and clears corresponding error message.
   * Updates form state as user types and provides real-time feedback.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update form data with new value
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing (better UX)
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Handles form submission with validation, rate limiting, and sanitization.
   * Flow:
   * 1. Check rate limiting
   * 2. Validate all fields
   * 3. Sanitize inputs (XSS protection)
   * 4. Send to FormSubmit service
   * 5. Show success/error feedback
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Rate limiting - prevent spam by limiting to 1 submission per minute
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      const secondsLeft = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
      setFeedback({
        type: 'error',
        message: `Please wait ${secondsLeft}s before submitting again.`,
      });
      return;
    }

    // Step 2: Validate form fields
    const validationErrors = validateForm(formData.name, formData.email, formData.message);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFeedback({
        type: 'error',
        message: 'Please fix the errors above.',
      });
      return;
    }

    // Step 3: Sanitize all inputs to prevent XSS attacks
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message),
    };

    setLoading(true);
    setFeedback(null);

    try {
      // Step 4: Send form to FormSubmit service via POST request
      const response = await fetch('https://formsubmit.co/amirditamo@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: sanitizedData.name,
          email: sanitizedData.email,
          message: sanitizedData.message,
          _subject: 'New contact request from Rima Creates',
          _captcha: false,
        }),
      });

      if (response.ok) {
        // Step 5a: Success - show message, clear form, and update rate limit
        setFeedback({
          type: 'success',
          message: 'Thanks! I received your message and will get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setLastSubmitTime(now);
      } else {
        // Step 5b: Server error
        setFeedback({
          type: 'error',
          message: 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      // Step 5c: Network error
      setFeedback({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Return all state and handlers for use in components
  return {
    formData,        // Current form input values
    errors,          // Validation errors for each field
    loading,         // Whether form is currently submitting
    feedback,        // Success/error message to display
    handleInputChange, // Update form input and clear errors
    handleSubmit,    // Validate, sanitize, and submit form
  };
};
