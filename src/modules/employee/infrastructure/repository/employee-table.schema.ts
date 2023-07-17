import { QueryResultRow, sql, SqlSqlToken } from 'slonik';

export const ifNotExistCreateTable = (): SqlSqlToken<QueryResultRow> => {
  return sql`
    CREATE EXTENSION IF NOT EXISTS ltree;
    CREATE TABLE IF NOT EXISTS employee (
      id SERIAL PRIMARY KEY,
      "hierarchyId" SERIAL,
      "hierarchyPath" ltree,
      "userId" UUID NOT NULL,
      "workType" VARCHAR(255) NOT NULL,
      "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
      "isDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
      "createdAt" TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP NOT NULL
      );
    `;
};
