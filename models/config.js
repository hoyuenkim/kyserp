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
