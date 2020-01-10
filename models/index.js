<<<<<<< HEAD
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Users = require('./Users')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
=======
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const db = {};

module.exports = () => {
  const sequelize = new Sequelize(config.database, config.username, config.password, config);

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  module.exports = db;
};
>>>>>>> b25a21503f005cc94ce9d89228759f3b6211a0a1
