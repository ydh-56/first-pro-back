const pool = require("../../config/database");

module.exports = class usersModel {
    static async get() {
        try {
            const [rows, fields] = await pool.query(``, []);
            if (rows) {
                return rows;
            } else {
                return null;
            }
        } catch (error) {
            console.log(`usersModel get Error : ${error}`);
        }
    }
};
