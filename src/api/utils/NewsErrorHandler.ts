import { handleHttpError } from '@/api/utils/ErrorHandler';

export function checkErrorInNewsApiResponse(apiResponse: any): any {
  debugger;
  if (apiResponse.status && apiResponse.status !== 200) {
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
