/**
 * News API Response Error Handler
 * --------------------------------------
 * This function checks the response from the News API
 * and triggers an HTTP error if the response contains an error status.
 *
 * Features:
 * - Extracts error status from the API response.
 * - Calls `handleHttpError` to handle errors consistently.
 * - Returns the original response if no error is found.
 *
 * Dependencies:
 * - `handleHttpError`: Handles API errors globally.
 */
import { handleHttpError } from '@/api/utils/ErrorHandler';

/**
 * Validates the News API response and throws an error if necessary.
 * @param {any} apiResponse - The raw response from the News API.
 * @returns {any} - The original response if valid.
 * @throws {HttpError} - If the response contains an error status.
 */
export function checkErrorInNewsApiResponse(apiResponse: any): any {
  if (apiResponse.status && apiResponse.status !== 'ok') {
    handleHttpError({
      response: {
        status: apiResponse.code || 500, // Fallback to 500 if code is missing,
        statusText: apiResponse.status || 'Unknown Error',
        data: {
          message: apiResponse.message || 'An unknown error occurred in the News API',
        },
      },
    });
  }

  return apiResponse;
}
