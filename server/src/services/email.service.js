const config = require("../config/config");
const nodemailer = require("nodemailer");
const logger = require("../config/logger");

/**
 *
 * @param {string} to
 * @param {string} token
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset the password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${config.siteUrl}/auth/reset-password?token=${token}`;

  const text = `<HTML>Dear User,</br>
  To reset your password, click on the link  <a href=${resetPasswordUrl} >Verify Account </a> </br> 
  If you did not request any password reset, then ignore this email.</HTML>`;

  await sendEmail(to, subject, text);
};

const sendEmail = async (to, subject, text) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    html : text,
  };

  switch (config.email.provider) {
    case "sendgrid":
      // to be implemented.
      break;

    case "smtp":
    default:
      await transport.sendMail(msg);
      break;
  }
};

const transport = (function () {
  switch (config.email.provider) {
    case "sendgrid":
      throw new Error("sendGrid Mailer not supported");

    case "aws":
      // To be implemented later. Use smtp for development
      throw new Error("AWS Mailer not supported");

    case "smtp":
    default:
      const tp = nodemailer.createTransport(config.email.smtp);
      if (config.env !== "test") {
        tp.verify()
          .then(() =>
            logger.info(
              `Connected to email server => ${config.email.smtp.host}`
            )
          )
          .catch(() =>
            logger.warn(
              "Unable to connect to email server. Make sure you have correctly configured the SMTP options in .env"
            )
          );
      }
      return tp;
  }
})();

module.exports = {
  sendResetPasswordEmail,
};