const express = require("express");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const register = catchAsync(async (req, res) => {

  let user;
  try {
    user = await userService.createUser({...req.body});
    res.send(user)

  } catch (error) {
    throw error;
  }

//   user = await user.populate("_org", "name email");

  res.send(user) ;
});

module.exports = { register };
