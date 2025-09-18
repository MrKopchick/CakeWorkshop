import { type Knex } from 'knex';

import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type DatabaseModule = {
  connect(): Promise<void>;
  environmentsConfig: Record<ValueOf<typeof AppEnvironment>, Knex.Config>;
  initialConfig: Knex.Config;
  knex: Knex;
};

export { type DatabaseModule };
