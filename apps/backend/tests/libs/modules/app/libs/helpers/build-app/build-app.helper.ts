import { afterAll, beforeAll } from '@jest/globals';
import { type FastifyInstance } from 'fastify';
import { type Knex } from 'knex';
import pg from 'pg';

import { config } from '~/libs/modules/config/config.js';
import { database } from '~/libs/modules/database/database.js';
import { logger } from '~/libs/modules/logger/logger.js';
import {
  ServerApp,
  serverAppApiV1
} from '~/libs/modules/server-application/server-application.js';

import { clearDatabase } from '../../../../database/database.js';

type BuildApp = () => {
  getApp: () => FastifyInstance;
  getKnex: () => Knex;
};

const buildApp: BuildApp = () => {
  const serverApp = new ServerApp({
    apis: [serverAppApiV1],
    config,
    database,
    logger,
    options: {
      logger: false
    }
  });

  beforeAll(async () => {
    const PG_TIMESTAMPTZ_OID = 1184;
    pg.types.setTypeParser(PG_TIMESTAMPTZ_OID, (value: string) => {
      return new Date(value).toISOString();
    });

    await serverApp.initialize();
    await getApp().ready();
  });

  afterAll(async () => {
    await getApp().close();

    await clearDatabase(getKnex);
    await getKnex().destroy();
  });

  const getApp = (): FastifyInstance => serverApp.app;
  const getKnex = (): Knex => serverApp.database.knex;

  return { getApp, getKnex };
};

export { buildApp };
