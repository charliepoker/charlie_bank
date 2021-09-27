const verifySignUp = require("../middleware/verify-signup");
const controller = require("../controller/user-controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    verifySignUp.checkDuplicateUsernameOrEmail,
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/verify-otp", controller.verifyOtp);
};
