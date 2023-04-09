const pool = require("../../config/database");
const logger = require("../../config/logger.js");

module.exports = class usersModel {
  static async create(userId, userPwd, nickName, pHint, pImg) {
    try {
      let query = `
      INSERT INTO USER_TABLE(USER_SEQ, USER_ID, USER_PWD, NICKNAME, PWD_HINT, P_IMG, C_TIME, U_TIME, ACTIVE) 
          VALUES (get_code('US'), ?, ?, ?, ?, ?, NOW(), NOW(), 'Y')
          `;
      const [rows, fields] = await pool.query(query, [userId, userPwd, nickName, pHint, pImg]);
      if (rows) {
        return rows;
      } else {
        return null;
      }
    } catch (error) {
      logger.writeLog("error", `usersModel/create Error : ${error}`);
    }
  }
};
