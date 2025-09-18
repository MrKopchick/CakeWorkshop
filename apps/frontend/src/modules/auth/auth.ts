import { ENV } from '~/libs/enums/enums.js';
import { httpApi } from '~/modules/http/http.js';

import { Auth as AuthApi } from './auth-api.js';

const authApi = new AuthApi({
  apiPath: ENV.API_PATH,
  httpApi
});

export { authApi };
export {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './libs/types/types.js';
export {
  actions as authActions,
  reducer as authReducer
} from './slices/auth.js';
