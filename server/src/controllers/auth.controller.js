const express = require("express");
const catchAsync = require("../utils/catchAsync");
const { userService, tokenService } = require("../services");
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
      expires
    });
  } catch (error) {
    throw error;
  }
});

const login = catchAsync(async (req,res)=>{

})

module.exports = { register };