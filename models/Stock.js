module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define(
    "Stock",
    {
      quantity: {
        type: DataTypes.INTEGER(),
        defaultValue: 0,
        allowNull: false
      }
    },
    {
      charset: "utp8",
      collate: "utp8_general_ci"
    }
  );

  Stock.associate(db => {
    db.Stock.belongsToMany(db.Product, { through: "productStock" });
  });

  return Stock;
};
