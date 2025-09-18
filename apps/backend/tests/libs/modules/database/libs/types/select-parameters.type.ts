import { type DatabaseTableName } from '~/libs/modules/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

type SelectParameters<
  T extends Record<string, unknown>,
  K extends Record<string, unknown>
> = {
  columns?: string[];
  condition?: Partial<T> | undefined;
  conditionNot?: Partial<K> | undefined;
  conditionRaw?: [string, number | string] | undefined;
  joins?: [ValueOf<typeof DatabaseTableName>, string, string][];
  limit?: number;
  offset?: number;
  shouldThrowErrorOnEmptyResult?: boolean;
  table: ValueOf<typeof DatabaseTableName>;
};

export { type SelectParameters };
