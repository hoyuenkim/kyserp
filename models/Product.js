module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "products",
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
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  return Product;
};
