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
      Wallet.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade",
      });
      Wallet.hasMany(models.Transaction, {
        as: "transactions",
        // foreignKey: "UserId",
      });
    }
  }
  Wallet.init(
    {
      walletBalance: {
        type: DataTypes.FLOAT,
      },
      userId: {
        type: DataTypes.INTEGER,
      },

      walletStatus: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Wallet",
      tableName: "wallets",
    }
  );
  return Wallet;
};
