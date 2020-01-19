module.exports = (sequelize, DataTypes) => {
	const Company = sequelize.define(
		'company',
		{
			bizcode: {
				type: DataTypes.STRING(),
				allowNull: false,
				unique: true
			},
			address: {
				type: DataTypes.STRING(),
				allowNull: false
			},
			address_detail: {
				type: DataTypes.STRING()
			},
			phone: {
				type: DataTypes.STRING(),
				allowNull: false
			}
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci'
		}
	);

	Company.associate = (db) => {
		db.Company.hasMany(db.Site);
		db.Company.hasMany(db.Product);
		db.Company.hasMany(db.Users);
	};

	return Company;
};
