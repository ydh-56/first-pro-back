var express = require("express");
var router = express.Router();
const diary = require("../app/controllers/diary");

// 갓생, 반성 작업은 하나의 API로 A(갓생), D(반성) 으로 구분하여 사용할 예정 (수정할 수 도)
// route -> controller -> model 순서
// 글 생성
router.post("/create", diary.create);
// 마이페이지에 특정 유저 글 불러오기
router.post("/myDiary", diary.myDiary);
// 메인페이지에 모든 유저 글 불러오기
router.post("/list", diary.list);

module.exports = router;
