require("dotenv").config();

module.exports = {
  development: {
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    dialect: "mysql",
    host: process.env.DB_HOST
  }
};
