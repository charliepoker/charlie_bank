"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wallet.init(
    {
      accountNumber: {
        type: DataTypes.INTEGER,
      },
      walletBalance: {
        type: DataTypes.FLOAT,
      },
      walletStatus: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};
