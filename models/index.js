const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Users = require('./Users')(sequelize, Sequelize);
db.Product = require('./Product')(sequelize, Sequelize);
db.Stock = require('./Stock')(sequelize, Sequelize);
db.Items = require('./Items')(sequelize, Sequelize);
db.Site = require('./Site')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
