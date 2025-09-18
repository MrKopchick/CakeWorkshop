import { DatabaseTableName } from '~/libs/modules/database/database.js';

import { type GetCrudHandlersFunction } from '../../types/types.js';
import { getCrudHandlers } from '../get-crud-handlers/get-crud-handlers.js';

const clearDatabase = async (
  getKnex: Parameters<GetCrudHandlersFunction>[number]
): Promise<void> => {
  const { remove } = getCrudHandlers(getKnex);

  const tables = [DatabaseTableName.USERS];

  for (const table of tables) {
    await remove({ table });
  }
};

export { clearDatabase };
