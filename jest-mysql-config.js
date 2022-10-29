module.exports = {
  databaseOptions: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bernal_test',
    dialect: 'mysql',
  },
  createDatabase: true,
  dbSchema: 'bernal_test.sql',
  truncateDatabase: false,
};
