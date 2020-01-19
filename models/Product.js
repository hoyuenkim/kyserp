module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		'products',
		{
			name: {
				type: DataTypes.STRING(),
				unique: true,
				allowNull: false
			},
			section: {
				type: DataTypes.STRING(),
				allowNull: false
			}
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci'
		}
	);

	Product.associate = (db) => {
		db.Product.hasMany(db.Stock);
		db.Product.hasMany(db.Items);
		db.Product.belongsTo(db.Company);
	};

	return Product;
};
