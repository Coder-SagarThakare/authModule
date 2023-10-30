const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const config = require("./config/config");
const authLimiter = require("./middlewares/rateLimiter");

// ------------------  MIDDLEWARES  ----------------------------

// JSON requests are received as plain text. We need to parse the json request body.
app.use(bodyParser.json());

// Parse urlencoded request body if provided with any of the requests
app.use(express.urlencoded({ extended: true }));

// Enable cors to accept requests from any frontend domain,
app.use(cors());

if (config.env == "production") {
  app.use("/auth", authLimiter);
}

// Define routes index in separate file.
app.use("/", routes);

module.exports = app;
