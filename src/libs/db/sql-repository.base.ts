import { Mapper } from '@libs/ddd/mapper.interface';
import { RepositoryPort } from '@libs/ddd/repository.port';
import { None, Option, Some } from 'oxide.ts';
import {
  DatabasePool,
  DatabaseTransactionConnection,
  IdentifierSqlToken,
  MixedRow,
  PrimitiveValueExpression,
  QueryResultRow,
  sql,
  SqlSqlToken,
  UniqueIntegrityConstraintViolationError,
} from 'slonik';
import { ZodObject } from 'zod';
import { RequestContextService } from '@libs/application/context/AppRequestContext';
import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { ObjectLiteral } from '@libs/types';
import { LoggerPort } from '@libs/ports/logger-port';
import { ConflictException } from '@libs/exceptions';

export abstract class SqlRepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral,
> implements RepositoryPort<any>
{
  protected abstract tableName: string;

  protected abstract schema: ZodObject<any>;

  protected abstract tableStructure: SqlSqlToken<QueryResultRow>;
  public constructor(
    private readonly _pool: DatabasePool,
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly logger: LoggerPort,
  ) {}

  async findOneById(id: string): Promise<Option<any>> {
    const query = sql.type(this.schema)`SELECT * FROM ${sql.identifier([
      this.tableName,
    ])} WHERE id = ${id}`;

    const result = await this.pool.query(query);
    return result.rows[0] ? Some(this.mapper.toDomain(result.rows[0])) : None;
  }

  async insert(
    entity: Aggregate | Aggregate[],
  ): Promise<Aggregate[] | Aggregate> {
    const entities = Array.isArray(entity) ? entity : [entity];
    const records = entities.map((entity) => this.mapper.toPersistence(entity));
    const query = this.generateInsertQuery(records);

    try {
      const result = await this.writeQuery(query, entities);
      return result[0];
    } catch (error) {
      if (error instanceof UniqueIntegrityConstraintViolationError) {
        this.logger.debug(
          `[${RequestContextService.getRequestId()}] ${
            (error.originalError as any).detail
          }`,
        );
        throw new ConflictException('Record already exists', error);
      }
      throw error;
    }
  }

  protected get pool(): DatabasePool | DatabaseTransactionConnection {
    return (
      RequestContextService.getContext().transactionConnection ?? this._pool
    );
  }

  protected async writeQuery<T>(
    sql: SqlSqlToken<
      T extends MixedRow ? T : Record<string, PrimitiveValueExpression>
    >,
    entity: Aggregate | Aggregate[],
  ): Promise<Aggregate | Aggregate[]> {
    const entities = Array.isArray(entity) ? entity : [entity];
    const entityIds = entities.map((e) => e.id);

    this.logger.debug(
      `[${RequestContextService.getRequestId()}] writing ${
        entities.length
      } entities to "${this.tableName}" table: ${entityIds}`,
    );

    await this.pool.query(sql);

    return entities;
  }

  protected generateInsertQuery(
    models: DbModel[],
  ): SqlSqlToken<QueryResultRow> {
    // TODO: generate query from an entire array to insert multiple records at once
    const entries = Object.entries(models[0]);
    const values: any = [];
    const propertyNames: IdentifierSqlToken[] = [];

    entries.forEach((entry) => {
      if (entry[0] && entry[1] !== undefined) {
        propertyNames.push(sql.identifier([entry[0]]));
        if (entry[1] instanceof Date) {
          values.push(sql.timestamp(entry[1]));
        } else {
          values.push(entry[1]);
        }
      }
    });

    const query = sql`INSERT INTO ${sql.identifier([
      this.tableName,
    ])} (${sql.join(propertyNames, sql`, `)}) VALUES (${sql.join(
      values,
      sql`, `,
    )})`;

    const parsedQuery = query;
    return parsedQuery;
  }

  private async ifNotExistCreateTable(
    ifNotExistCreateTableQuery: SqlSqlToken<QueryResultRow>,
  ): Promise<void> {
    try {
      await this.pool.query(ifNotExistCreateTableQuery);
      console.log('Table created successfully.');
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }

  async findAll(): Promise<Aggregate[]> {
    const query = sql`SELECT * FROM ${sql.identifier([this.tableName])}`;

    const result = await this.pool.query(query);

    return result.rows.map((row) => this.mapper.toDomain(row));
  }
}
