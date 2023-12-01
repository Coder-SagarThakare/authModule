const config = require("../config/config");

/**
 *
 * @param {string} to
 * @param {string} token
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset the password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${config.siteUrl}/auth/reset-password?token=${token}`;
  const text = `Dear User,
  To reset your password, click on the link : ${resetPasswordUrl}
  If you did not request any password reset, then ignore this email.`;

  await sendEmail(to, subject, text);
};

const sendEmail = async (to, subject, text) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    text,
  };

  switch (config.email.provider) {
    case "sendgrid":
      // to be implemented.
      break;

    case smtp:
    default:
      console.log("add transport function here");
      break;
  }
};

module.exports = {
  sendResetPasswordEmail,
};
``