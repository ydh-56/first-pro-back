const usersModel = require("../models/users");
const { sign } = require("jsonwebtoken");
const secretKey = require("../../config/secretkey").secretKey;
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const options = require("../../config/secretkey").options;

module.exports = {
  async create(req, res, next) {
    let userId = req.body.userId;
    let userPwd = req.body.userPwd;
    let nickName = req.body.nickName;
    let pHint = req.body.pHint;
    let pImg = req.body.pImg;

    // bcript 암호화
    let salt = genSaltSync(10);
    userPwd = hashSync(userPwd, salt);

    const result = await usersModel.create(userId, userPwd, nickName, pHint, pImg);
    res.json({
      result: result ? "success" : "fail",
      data: result,
    });
  },
};
