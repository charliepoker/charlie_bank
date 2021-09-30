const db = require("../models");
const config = require("../config/auth.config");
const wallet = require("../controller/wallet-controller");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Generate account No
  const accountNo = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const generateAccountNo = accountNo(1000000000, 10000000000);

  //  Generate Otp
  const generateOtp = (min, max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const generateNewOtp = generateOtp(1000, 10000);

  // Save User to Database
  db.User.create({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
    accountNumber: generateAccountNo,
    phoneNumber: req.body.phoneNumber,
    otp: generateNewOtp,
  })
    .then((user) => {
      res.status(201).json({
        status: "ok",
        message: "User registered",
        data: {
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          phone: user.phoneNumber,
          accountNo: generateAccountNo,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Sign in user

exports.signin = (req, res) => {
  db.User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const verified = user.isVerified;
      if (!verified) {
        return res.status(401).send({ message: "otp is not verified" });
      }
    })
    .then((user) => {
      const payload = {
        username: req.body.username,
        password: req.body.password,
      };
      const options = { expiresIn: 86400, issuer: "http://localhost:5000" };
      const secret = config.secret;
      const token = jwt.sign(payload, secret, options);
      return res.status(200).json({
        status: "ok",
        message: "otp Verified and User signin successful",
        data: {
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          phone: user.phoneNumber,
          accountNo: generateAccountNo,
          accessToken: token,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Verify otp

exports.verifyOtp = (req, res, next) => {
  const otp = req.body.otp;

  db.User.findOne({
    where: {
      otp: otp,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "invalid user otp",
        });
      } else {
        user
          .update({
            isVerified: true,
          })
          .then(
            res.status(200).json({
              status: "ok",
              message: "Verification Complete",
            })
          );
      }
    })
    .catch((err) =>
      res.status(400).json({
        description: "error",
        error: err,
      })
    );
};
