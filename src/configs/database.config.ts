// https://github.com/Sairyss/backend-best-practices#configuration

export const databaseConfig = {
  type: 'postgres',
  host: 'localhost', //get('DB_HOST').required().asString(),
  port: 5432, //get('DB_PORT').required().asIntPositive(),
  username: 'postgres', //get('DB_USERNAME').required().asString(),
  password: 'toor', //get('DB_PASSWORD').required().asString(),
  database: 'excalibur', //get('DB_NAME').required().asString(),
};

export const postgresConnectionUri = `postgres://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}/${databaseConfig.database}`;
