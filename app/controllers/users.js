const usersModel = require("../models/users");
const { sign } = require("jsonwebtoken");
const secretKey = require("../../config/secretkey").secretKey;
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const logger = require("../../config/logger");
const options = require("../../config/secretkey").option;

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

  async login(req, res, next) {
    let userId = req.body.userId;
    console.log("userId", userId);
    let password = req.body.password;

    const userInfo = await usersModel.login(userId);

    if (!userInfo) {
      logger.writeLog("controller", `controller/login :  로그인 실패 (아이디 찾을 수 없음) ${userId}`);
      return res.json({
        result: result ? "success" : "fail",
        data: result,
      });
    }

    const pwdResult = compareSync(password, userInfo.USER_PWD);
    if (pwdResult) {
      let accesToken = sign(
        {
          result: [userInfo.USER_SEQ, userInfo.USER_ID, userInfo.NICKNAME],
        },
        secretKey,
        options
      );
      logger.writeLog("info", `controller/login :  로그인 성공 : ${userId}`);
      return res.json({
        result: "success",
        data: {
          USER_SEQ: userInfo.USER_SEQ,
          USER_ID: userInfo.USER_ID,
          NICKNAME: userInfo.NICKNAME,
          token: accesToken,
        },
      });
    } else {
      logger.writeLog("info", `controller/login: 로그인 실패 ${userId}`);
      return res.json({
        result: "fail",
        data: "아이디 및 비밀번호가 틀립니다.",
      });
    }
  },

  async userIdCheck(req, res, next) {
    let userId = req.body.userId;

    const result = await usersModel.userIdCheck(userId);
    res.json({
      result: result ? "fail" : "success",
      data: result,
    });
  },

  async userHintLoad(req, res, next) {
    let userId = req.body.userId;

    const result = await usersModel.login(userId);
    res.json({
      result: result ? "fail" : "success",
      data: result,
    });
  },
};
