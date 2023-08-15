import { QueryResultRow, sql, SqlSqlToken } from 'slonik';

export const ifNotExistCreateTable = (): SqlSqlToken<QueryResultRow> => {
  return sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        "email" VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        "userName" VARCHAR(255) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "phone" VARCHAR(255) NOT NULL,
        "role" VARCHAR(255) NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
        "isDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
        "createdAt" TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL
      )
    `;
};
