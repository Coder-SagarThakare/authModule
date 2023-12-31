const logger = require("../config/logger");
const { authController } = require("../controllers");
const captcha = require("../middlewares/captcha");
const validate = require("../middlewares/validate");
const { authValidation } = require("../validations");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hiii in auth /");
});

router.post(
  "/register",
  [captcha.verify, validate(authValidation.register)],
  authController.register
);

router.post(
  "/login",
  [captcha.verify, validate(authValidation.login)],
  authController.login
);

router.post('/login/:provider', [captcha.verify], authController.socialLogin);


module.exports = router;
