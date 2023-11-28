const express = require("express");
const catchAsync = require("../utils/catchAsync");
const { userService, tokenService, authService } = require("../services");
const httpStatus = require("http-status");

const register = catchAsync(async (req, res) => {
  let user;
  try {
    user = await userService.createUser({ ...req.body });

    //find other way for that
    // user.password = undefined;

    const { token, expires } = await tokenService.generateAuthTokens(user);

    res.status(httpStatus.CREATED).send({
      user,
      token,
      expires,
    });
  } catch (error) {
    throw error;
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);

  const { token, expires } = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    token,
    expires,
  });
});

const socialLogin = catchAsync(async (req, res) => {
  const idToken = req.body.token;
  let user;
  const provider = req.params.provider.toLowerCase();
  switch (provider) {
    case "google":
      user = await authService.loginWithGoogle(idToken);
      break;
    // case "facebook":
    // user = await authService.loginWithFacebook(idToken);
    // break;
    default:
      throw new ApiError(
        httpStatus.UNPROCESSABLE_ENTITY,
        `Provider ${req.body.provider} is not supported`
      );
  }
  const { token, expires } = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    token,
    expires,
  });
});

module.exports = { register, login, socialLogin };
