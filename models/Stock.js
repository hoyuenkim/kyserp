module.exports = (sequelize, DataTypes) => {
	const Stock = sequelize.define(
		'stocks',
		{
			quantity: {
				type: DataTypes.INTEGER(),
				defaultValue: 0,
				allowNull: false
			}
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci'
		}
	);

	Stock.associate = (db) => {
		db.Stock.belongsTo(db.Product);
		db.Stock.belongsTo(db.Company);
		db.Stock.belongsTo(db.Users);
	};

	return Stock;
};
