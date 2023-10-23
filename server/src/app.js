const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require('./routes')

// ------------------  MIDDLEWARES  ----------------------------

// JSON requests are received as plain text. We need to parse the json request body.
app.use(bodyParser.json());

// Enable cors to accept requests from any frontend domain,
app.use(cors());

// Define routes index in separate file.
app.use("/", routes);

module.exports = app;
