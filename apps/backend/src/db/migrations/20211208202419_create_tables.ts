import { type Knex } from 'knex';

const TableName = {
  USERS: 'users'
} as const;

const ColumnName = {
  CREATED_AT: 'created_at',
  EMAIL: 'email',
  ID: 'id',
  PASSWORD: 'password',
  UPDATED_AT: 'updated_at'
} as const;

const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable(TableName.USERS, table => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.EMAIL).notNullable().unique();
    table.string(ColumnName.PASSWORD).notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists(TableName.USERS);
};

export { down, up };
