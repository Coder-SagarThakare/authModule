// Node App starts from here

const mongoose = require("mongoose");
const config = require("./config/config");
const app = require('./app');
const logger = require("./config/logger");
let server;


// connect to database
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log(`connected to MongoDB => ${config.mongoose.url}`);
});

// server =
// console.log("g");
