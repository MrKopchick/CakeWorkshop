import { type APIError, type ErrorInfo } from '../../types/types.js';
import { getDefaultErrorInfo } from './get-default-error-info.helper.js';
import { getValidationErrorInfo } from './get-validation-error-info.helper.js';

const getErrorInfo = (error: APIError): ErrorInfo => {
  if ('isJoi' in error) {
    return getValidationErrorInfo(error);
  }

  return getDefaultErrorInfo(error);
};

export { getErrorInfo };
