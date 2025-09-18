import { type ServerErrorResponse } from '@thread-js/shared';

import { type HTTPCode } from '~/libs/modules/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

type ErrorInfo = {
  internalMessage: string;
  response: ServerErrorResponse;
  status: ValueOf<typeof HTTPCode>;
};

export { type ErrorInfo };
