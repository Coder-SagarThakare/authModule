const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

/**
 * Create User
 * @param {Object} userBody - user information Object
 * @returns {Promise<User>}
 */

const createUser = async (userBody) => {
  // User.isEmailTaken => return true/false
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User already exists with this email"
    );
  }
  console.log(user);

  return User.create(userBody);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({
    email,
  });
};

module.exports = { createUser, getUserByEmail };
