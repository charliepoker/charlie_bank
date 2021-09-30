const db = require("../models");

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  db.User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }

    // Email
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }

      // Phone No
      db.User.findOne({
        where: {
          email: req.body.phoneNumber,
        },
      }).then((user) => {
        if (user) {
          res.status(400).send({
            message: "Failed! Phone Number is already in use!",
          });
          return;
        }
      });

      next();
    });
  });
};
