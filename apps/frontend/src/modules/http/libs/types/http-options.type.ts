import { type ContentType } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type HTTPMethod } from '../enums/enums.js';

type HttpOptions = {
  contentType?: undefined | ValueOf<typeof ContentType>;
  hasAuth: boolean;
  headers: Headers;
  method: ValueOf<typeof HTTPMethod>;
  payload: BodyInit | null;
  query: Record<string, unknown>;
};

export { type HttpOptions };
