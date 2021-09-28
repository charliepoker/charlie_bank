const db = require("../models");
const Op = db.Sequelize.Op;

// create wallet

exports.createWallet = (req, res) => {
  let walletBalance = 500;
  //   Save Wallet to database
  db.Wallet.create({
    walletBalance: walletBalance,
    walletStatus: true,
  })
    .then((wallet) => {
      res.status(201).json({
        statuts: "ok",
        message: "Wallet created",
        data: {
          walletBalance: wallet.walletBalance,
          walletStatus: wallet.walletStatus,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
