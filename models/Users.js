const passwordHash = require("../libs/passwordHash");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
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
      phone: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      authority: {
        type: DataTypes.STRING()
      },
      verify: {
        type: DataTypes.BOOLEAN()
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
  return Users;
};
