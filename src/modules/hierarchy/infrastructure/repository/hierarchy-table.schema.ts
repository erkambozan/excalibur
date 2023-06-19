import { QueryResultRow, sql, SqlSqlToken } from 'slonik';

export const ifNotExistCreateTable = (): SqlSqlToken<QueryResultRow> => {
  return sql`
    CREATE EXTENSION IF NOT EXISTS ltree;
    CREATE TABLE IF NOT EXISTS hierarchy (
      id SERIAL PRIMARY KEY,
      "parentId" SERIAL,
      "name" VARCHAR(255) NOT NULL,
      "type" VARCHAR(255) NOT NULL,
      "parentPath" ltree,
      "path" ltree,
      "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
      "isDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
      "createdAt" TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP NOT NULL
      );
    `;
};
