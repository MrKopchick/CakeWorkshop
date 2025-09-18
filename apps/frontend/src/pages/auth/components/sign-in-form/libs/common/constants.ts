import { UserPayloadKey } from '~/modules/user/enums/enums.js';

const DEFAULT_SIGN_IN_PAYLOAD = {
  [UserPayloadKey.EMAIL]: '',
  [UserPayloadKey.PASSWORD]: ''
};

export { DEFAULT_SIGN_IN_PAYLOAD };
