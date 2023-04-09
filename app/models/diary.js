const pool = require("../../config/database");
const logger = require("../../config/logger.js");

module.exports = class diaryModel {
  // controller 에서 받아온 순서가 같아야 함
  static async create(userCode, content, emoji1, emoji2, emoji3, type) {
    try {
      let query = `
      INSERT INTO DIARY_TABLE(DIARY_CODE, TYPE, CONTENT, EMOJI1, EMOJI2, EMOJI3, C_ID, C_TIME, U_ID, U_TIME, ACTIVE) 
          VALUES (get_code('DR'), ?, ?, ?, ?, ?, ?, NOW(), ?, NOW(), 'Y')
          `;
      const [rows, fields] = await pool.query(query, [type, content, emoji1, emoji2, emoji3, userCode, userCode]);
      // query [] 이 부분엔 컨트롤러에서 받아온 순서가 아닌 쿼리 순서대로 넣어야 함 중요 **
      // 쿼리에서 받아온 값 넣어주기 ex) 리스트 일경우 if(rows.lenght > 0) ex)하나의 값일경우 return rows[0]
      if (rows) {
        return rows;
      } else {
        return null;
      }
    } catch (error) {
      // 로그 생성 코드 꼭 코드 구분에서 넣어주기 나중에 실서버로 됐을때 푸티에서 확인 할 수 있음
      logger.writeLog("error", `diaryModel/create Error : ${error}`);
    }
  }
};