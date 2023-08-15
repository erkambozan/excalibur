import { QueryResultRow, sql, SqlSqlToken } from 'slonik';

export const ifNotExistCreateTable = (): SqlSqlToken<QueryResultRow> => {
  return sql`
    CREATE TABLE IF NOT EXISTS annual_leave (
      id SERIAL PRIMARY KEY,
      "userId" UUID NOT NULL,
      "status" VARCHAR(255) NOT NULL,
      "startDate" TIMESTAMP NOT NULL,
      "endDate" TIMESTAMP NOT NULL,
      "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
      "isDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
      "createdAt" TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP NOT NULL
      );
    `;
};
