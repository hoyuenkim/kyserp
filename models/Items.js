module.exports = (sequelize, DataTypes) => {
	const Items = sequelize.define(
		'items',
		{
			quantity: {
				type: DataTypes.INTEGER(),
				defaultValue: 0,
				allowNull: false
			},
			status: {
				type: DataTypes.BOOLEAN(),
				defaultValue: true
			}
		},
		{
			chatset: 'utf8',
			collate: 'utf8_general_ci'
		}
	);

	Items.associate = (db) => {
		db.Items.belongsTo(db.Site);
		db.Items.belongsTo(db.Product);
	};

	return Items;
};
