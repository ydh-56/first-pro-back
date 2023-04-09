var express = require("express");
var router = express.Router();
const users = require("../app/controllers/users");

// 유저 생성
router.post("/create", users.create);

module.exports = router;
