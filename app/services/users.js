const usersModel = require("../models/users");

module.exports = class usersService {
    static get() {
        return new Promise(function (resolve, reject) {
            console.log(`service/usersService.get -`);
            try {
                let result = usersModel.get();

                resolve(result);
            } catch (error) {
                console.log("error", `${error}`);
            }
        });
    }
};
