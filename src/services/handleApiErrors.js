import { get } from 'lodash';

import { GENERIC_ERROR, INVALID_TOKEN_ERROR, LOGIN_REQUIRED_ERROR } from '../constants/errorMessages';

/**
 * Handles API errors and returns an array of user-friendly error messages.
 *
 * @param {Object} errors - The error object received from the API.
 * @param {string|string[]} messages - The specific error message(s) to check for (case-insensitive).
 * @returns {string[]} - An array containing error messages.
 */
export const handleApiErrorMessages = (errors, messages = '') => {
  const originalErrors = get(errors, 'response.data.errors', []);
  console.error(originalErrors);

  const originalMessageArray = Array.isArray(messages) ? messages : [messages];
  const messageArray = [LOGIN_REQUIRED_ERROR, INVALID_TOKEN_ERROR, ...originalMessageArray];

  // Check if any of the specified error messages match the original errors
  const matchingErrors = originalErrors.filter((error) =>
    messageArray.some((msg) => error.toLowerCase() === msg.toLowerCase()),
  );

  return matchingErrors.length > 0 ? matchingErrors : [GENERIC_ERROR];
};
