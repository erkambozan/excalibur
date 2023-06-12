import { QueryResultRow, sql, SqlSqlToken } from 'slonik';

export const ifNotExistCreateTable = async (): Promise<
  SqlSqlToken<QueryResultRow>
> => {
  return sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        role VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL
      )
    `;
};
