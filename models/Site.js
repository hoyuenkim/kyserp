module.exports = (sequelize, DataTypes) => {
	const Site = sequelize.define(
		'sites',
		{
			name: {
				type: DataTypes.STRING()
			},
			DeliveryDate: {
				type: DataTypes.DATE()
			},
			address: {
				type: DataTypes.STRING()
			},
			address_detail: {
				type: DataTypes.STRING()
			}
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci'
		}
	);
	Site.associtate = (db) => {
		db.Site.hasMany(db.Items);
	};
	return Site;
};
