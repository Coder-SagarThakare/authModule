const moment = require("moment");
const config = require("../config/config");
const { tokenTypes } = require("../config/token");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );

  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  return {
    token: accessToken,
    expires: accessTokenExpires.toDate(),
  };
};

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */

/**
 * The moment.unix() function in the context of the moment library is used to
 * convert a Unix timestamp (seconds since the Unix epoch) into a moment object.
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(), //iat : Issued At
    exp: expires.unix(), //exp : Expiration Time
    type,
  };
  
  return jwt.sign(payload, secret);
};

module.exports = { generateAuthTokens };
