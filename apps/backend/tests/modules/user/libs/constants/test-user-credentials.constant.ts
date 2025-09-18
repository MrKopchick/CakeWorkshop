import { faker } from '@faker-js/faker';

import { type UserSignUpRequestDto } from '~/modules/auth/auth.js';
import { UserPayloadKey } from '~/modules/user/user.js';

const USERS_COUNT = 2;

const TEST_USERS_CREDENTIALS = Array.from(
  { length: USERS_COUNT },
  (): UserSignUpRequestDto => {
    return {
      [UserPayloadKey.EMAIL]: faker.internet.email(),
      [UserPayloadKey.PASSWORD]: faker.internet.password()
    };
  }
);

export { TEST_USERS_CREDENTIALS };
