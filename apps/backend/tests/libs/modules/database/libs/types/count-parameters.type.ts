import { type DatabaseTableName } from '~/libs/modules/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

type CountParameters<
  T extends Record<string, unknown>,
  K extends Record<string, unknown>
> = {
  condition?: Partial<T>;
  conditionNot?: K[];
  joins?: [ValueOf<typeof DatabaseTableName>, string, string][];
  table: ValueOf<typeof DatabaseTableName>;
};

export { type CountParameters };
