const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("/ route");
});

module.exports = router;
