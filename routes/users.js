var express = require("express");
var router = express.Router();
const users = require("../app/controllers/users");

// 유저 생성
router.post("/create", users.create);

// 유저 로그인
router.post("/login", users.login);

// 유저 아이디 중복 체크
router.post("/userIdCheck", users.userIdCheck);

// 유저 비밀번호 힌트 체크
router.post("/userHintLoad", users.userHintLoad);

// 아이디 힌트불러오기 0
// 아이디 힌트 = 답 맞는지?
// 비밀번호 새로 만들기

module.exports = router;
