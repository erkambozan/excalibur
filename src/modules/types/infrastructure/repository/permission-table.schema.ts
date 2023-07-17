import { QueryResultRow, sql, SqlSqlToken } from 'slonik';

export const ifNotExistCreateTable = (): SqlSqlToken<QueryResultRow> => {
  return sql`
      CREATE TABLE IF NOT EXISTS permissions (
        id SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
        "isDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
        "createdAt" TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL
      )
    `;
};
