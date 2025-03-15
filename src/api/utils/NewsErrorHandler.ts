import { handleHttpError } from '@/api/utils/ErrorHandler';

export function checkErrorInNewsApiResponse(apiResponse: any): any {
  if (apiResponse.status && apiResponse.status !== 'ok') {
    handleHttpError({
      response: {
        status: apiResponse.code,
        statusText: apiResponse.status,
        data: {
          message: apiResponse.message,
        },
      },
    });
  }

  return apiResponse;
}
