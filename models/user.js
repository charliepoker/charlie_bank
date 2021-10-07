"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Wallet, {
        as: "wallets",
        onDelete: "cascade",
        // foreignKey: "userId",
      });
    }
  }

  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.BIGINT,
        unique: true,
      },
      accountNumber: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
      },
      // walletId: {
      //   type: DataTypes.INTEGER,
      //   unique: true,
      // },
      otp: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users"
    }
  );
  return User;
};
