const httpStatus = require("http-status");
const { userService } = require(".");
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
    throw new ApiError(httpStatus.UNAUTHORIZED, "This user does not exist");
  }
  return await user.populate("_org", "name email");
};

module.exports = {
  loginUserWithEmailAndPassword,
  loginWithGoogle,
};
