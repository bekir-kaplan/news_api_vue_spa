/**
 * HTTP Error Handling
 * ----------------------------------
 * This module defines a custom `HttpError` class and a `handleHttpError`
 * function to manage API request failures in a structured manner.
 *
 * Features:
 * - `HttpError`: Custom error class for HTTP responses.
 * - `handleHttpError`: Centralized error handler for API failures.
 *
 * Dependencies:
 * - `useErrorStore`: Stores error messages globally.
 */
import { useErrorStore } from '@/stores/errorStore';

export class HttpError extends Error {
  public status: number;
  public message: string;

  /**
   * Constructs an `HttpError` instance.
   * @param {number} status - HTTP status code.
   * @param {string} message - Error message.
   */
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

/**
 * Handles HTTP errors from API responses.
 * @param {any} error - The error object from an Axios request.
 * @throws {HttpError} - A custom error with status and message.
 */
export function handleHttpError(error: any): never {
  const errorStore = useErrorStore();
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data.message || error.response.statusText;

    errorStore.setError(message, status);
    switch (status) {
      case 400:
        throw new HttpError(status, `Bad Request: ${message}`);
      case 401:
        throw new HttpError(status, `Unauthorized: ${message}`);
      case 403:
        throw new HttpError(status, `Forbidden: ${message}`);
      case 404:
        throw new HttpError(status, `Not Found: ${message}`);
      case 409:
        throw new HttpError(status, `Api request reached: ${message}`);
      case 429:
        throw new HttpError(status, `Too Many Requests: ${message}`);
      case 500:
        throw new HttpError(status, `Internal Server Error: ${message}`);
      case 502:
        throw new HttpError(status, `Bad Gateway: ${message}`);
      case 503:
        throw new HttpError(status, `Service Unavailable: ${message}`);
      case 504:
        throw new HttpError(status, `Gateway Timeout: ${message}`);
      default:
        throw new HttpError(status, `HTTP Error: ${message}`);
    }
  } else if (error.request) {
    const errorMessage = 'No response received from server';
    errorStore.setError(errorMessage, 'no_response');
    throw new HttpError(0, errorMessage);
  } else {
    const errorMessage = `Error in request setup: ${error}`;
    errorStore.setError(errorMessage, 'err_in_request');
    throw new HttpError(0, `Error in request setup: ${errorMessage}`);
  }
}
