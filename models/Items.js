module.exports = (sequelize, DataTypes) => {
	const Items = sequelize.define(
		'items',
		{
			quantity: {
				type: DataTypes.INTEGER(),
				defaultValue: 0,
				allowNull: false
			}
		},
		{
			chatset: 'utf8',
			collate: 'utf8_general_ci'
		}
	);

	Items.associate = (db) => {
		db.Items.belongsTo(db.Site);
	};

	return Items;
};
