const diaryModel = require("../models/diary");

module.exports = {
  // 다이어리 생성 목적
  async create(req, res, next) {
    let userCode = req.body.userCode;
    let content = req.body.content;
    // 이모지는 필수가 아님
    let emoji1 = req.body.emoji1 ? req.body.emoji1 : "";
    let emoji2 = req.body.emoji2 ? req.body.emoji2 : "";
    let emoji3 = req.body.emoji3 ? req.body.emoji3 : "";
    // 갓생인지 반성인지 프론트에서 값 넣어줌
    let type = req.body.type;
    console.log("userCode", userCode);
    console.log("content", content);

    // controller 에서 받아온 값을 모델로 이동
    const result = await diaryModel.create(
      userCode,
      content,
      emoji1,
      emoji2,
      emoji3,
      type
    );
    // reuslt 값에 의해 성공인지 실패인지 구분시켜줌
    return res.json({
      result: result ? "success" : "fail",
      data: result,
    });
  },

  // 마이페이지에 특정 유저 글 불러오기
  async allMyDairy(req, res, next) {
    let userSEQ = req.body.userSEQ;
    let type = req.body.type;

    const result = await diaryModel.get(userSEQ, type);

    return res.json({
      result: result ? "success" : "fail",
      data: result,
    });
  },

  // 메인페이지에 모든 유저 글 불러오기
  async list(req, res, next) {
    let type = req.body.type;

    const result = await diaryModel.list(type);
    return res.json({
      result: result ? "success" : "fail",
      data: result,
    });
  },
};
