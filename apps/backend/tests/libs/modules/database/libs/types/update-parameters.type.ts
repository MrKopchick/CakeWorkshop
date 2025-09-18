import { type DatabaseTableName } from '~/libs/modules/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

type UpdateParameters<T extends Record<string, unknown>> = {
  condition?: T;
  data?: T;
  returning?: string[];
  table: ValueOf<typeof DatabaseTableName>;
};

export { type UpdateParameters };
