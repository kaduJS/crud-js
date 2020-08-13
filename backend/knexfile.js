module.exports = {
  client: "postgresql",
  connection: {
    database: "crud",
    user: "postgres",
    password: "123",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "migrations",
    directory: "src/database/migrations",
  },
};
