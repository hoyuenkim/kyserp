module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define("sites", {
    name: {
      type: DataTypes.STRING()
    },
    address: {
      type: DataTypes.STRING()
    },
    address_detail: {
      type: DataTypes.STRING()
    }
  });
};
