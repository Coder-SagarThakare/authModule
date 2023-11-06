const logger = require("../config/logger");
const { authController } = require("../controllers");
const captcha = require("../middlewares/captcha");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hiii in auth /");
});

router.post("/register", captcha.verify, authController.register);
module.exports = router;
