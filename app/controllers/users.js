const usersService = require("../services/users");

module.exports = {
    async get(req, res, next) {
        const result = await usersService.get();
        res.json({
            result: result ? "success" : "fail",
            data: result,
        });
    },
};
