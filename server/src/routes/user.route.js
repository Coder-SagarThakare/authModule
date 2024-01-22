const { userController } = require("../controllers");
const auth = require("../middlewares/auth");

const router = require("express").Router();

// Token authentication for all routes defined in this file
router.use(auth());

// get update user
router
  .route("/self")
  .get(userController.getUser)
  .patch(userController.updateUser);


module.exports = router;
