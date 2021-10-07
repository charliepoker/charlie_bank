const db = require("../models");
const Op = db.Sequelize.Op;
const user = require("../models/user.js");

// create wallet

module.exports = {
  createWallet(req, res) {
    let walletBalance = 500;

    // Save Wallet to database
    db.Wallet.create({
      userId: user.id,
      walletBalance: walletBalance,
      walletStatus: true,
    })
      .then((wallet) => {
        console.log(wallet);
        res.status(201).json({
          statuts: "ok",
          message: "Wallet created",
          data: {
            walletBalance: walletBalance,
            walletStatus: walletStatus,
            userId: userId,
          },
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  },
};
