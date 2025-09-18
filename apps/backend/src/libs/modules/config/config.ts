import { logger } from '../logger/logger.js';
import { Config } from './config.module.js';

const config = new Config({ logger });

export { config };
export { type ConfigModule } from './libs/types/types.js';
