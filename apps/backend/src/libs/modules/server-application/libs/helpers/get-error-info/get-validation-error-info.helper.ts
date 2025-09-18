import { ServerErrorType } from '~/libs/enums/enums.js';
import { type ValidationError } from '~/libs/exceptions/exceptions.js';
import { HTTPCode } from '~/libs/modules/http/http.js';

import { type ErrorInfo } from '../../types/types.js';

const getValidationErrorInfo = (error: ValidationError): ErrorInfo => {
  const { details, message } = error;

  return {
    internalMessage: `[Validation Error]: ${message}`,
    response: {
      details: details.map(detail => {
        return {
          message: detail.message,
          path: detail.path
        };
      }),
      errorType: ServerErrorType.VALIDATION,
      message
    },
    status: HTTPCode.UNPROCESSED_ENTITY
  };
};

export { getValidationErrorInfo };
