import { type Repository } from '~/libs/modules/database/database.js';

import { type User } from './types.js';

type UserRepository = Pick<Repository<User>, 'create'> & {
  getByEmail(_email: string): Promise<null | User>;
};

export { type UserRepository };
