<<<<<<< HEAD
require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DATABASE,
		dialect: 'mysql',
		host: process.env.DB_HOST
	}
};
=======
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
>>>>>>> b25a21503f005cc94ce9d89228759f3b6211a0a1
