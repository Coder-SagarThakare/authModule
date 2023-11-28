const httpStatus = require("http-status");
// const { userService, tokenService } = require(".");
const userService = require("./user.service");
const tokenService = require("./token.service");
const ApiError = require("../utils/ApiError");
const { OAuth2Client } = require("google-auth-library");
const config = require("../config/config");

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || user.deleted || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return await user;
};

const loginWithGoogle = async (idToken) => {
  const oAuth2Client = new OAuth2Client(config.socialLogin.google.clientId);

  const ticket = await oAuth2Client.verifyIdToken({
    idToken: idToken,
    audience: config.socialLogin.google.clientId,
  });
  const { email, email_verified } = ticket.getPayload();
  if (!email || !email_verified) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Google authentication failed");
  }
  const user = await userService.getUserByEmail(email);
  if (!user || user.deleted) {
    // authController.register();
  }
  return user;
};

const registerUser = async (userBody) => {
  try {
    const user = await userService.createUser({ ...userBody });

    const { token, expires } = await tokenService.generateAuthTokens(user);

    return { user, token, expires };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  loginWithGoogle,
  registerUser,
};
