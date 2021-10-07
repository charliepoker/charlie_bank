"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Wallet, {
        // as: "wallet",
        // foreignKey: "walletId",
        onDelete: "cascade",
      });
    }
  }
  Transaction.init(
    {
      transactionId: {
        type: DataTypes.INTEGER,
      },
      // walletId: {
      //   type: DataTypes.INTEGER,
      // },
      transactionAmount: {
        type: DataTypes.FLOAT,
      },
      from_wallet: {
        type: DataTypes.INTEGER,
      },
      to_wallet: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
