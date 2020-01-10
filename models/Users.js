const passwordHash = require('../libs/passwordHash');

module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('users', {
		username: {
			type: DataTypes.STRING(),
			unique: true,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(),
			allowNull: false
		},
		address: {
			type: DataTypes.STRING(),
			allowNull: false
		},
		address_detail: {
			type: DataTypes.STRING(),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(),
			unique: true,
			allowNull: false
		},
		authorize: {
			type: DataTypes.INTEGER(),
			default: false
		}
	});
	return Users;
};
