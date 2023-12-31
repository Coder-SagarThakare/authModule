const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
const userRoute = require("./user.route");

router.get("/", (req, res) => {
  // console.log("/ route");
  res.send('initial route index.js')
});

const defaultRoutes = [
  { path: "/auth", route: authRoute }, // base path for auth routes
  { path: "/user", route: userRoute }, // base path for user routes
];

defaultRoutes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
