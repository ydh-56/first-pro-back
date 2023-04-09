var express = require("express");
var router = express.Router();
const diary = require("../app/controllers/diary");

// 갓생, 반성 작업은 하나의 API로 A(갓생), D(반성) 으로 구분하여 사용할 예정 (수정할 수 도)

// 글 생성
router.post("/create", diary.create);

module.exports = router;