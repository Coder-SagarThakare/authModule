const moment = require('moment');
const config = require('../config/config');
const { tokenTypes } = require('../config/token');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');


/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');

    const accessToken = generateToken(user.id || user._id, accessTokenExpires, tokenTypes.ACCESS);

    return {  
      token: accessToken,
      expires: accessTokenExpires.toDate()
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
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };

    // console.log('jwt.sign(payload, secret',jwt.sign(payload, secret));

    return jwt.sign(payload, secret);
  };

  module.exports = {generateAuthTokens}