import { handleHttpError } from '@/api/utils/ErrorHandler';

export function checkErrorInFinanceApiResponse(apiResponse: any): any {
  if (apiResponse.code && apiResponse.code !== 200) {
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
