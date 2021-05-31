const models = require('../models/index').sequelize.models;
const helper = require('../config/helper');
const apiError = require('../errors/apiError');
class RouterMiddleware {
    isIdValid(req, res, next) {
        let id = req.params.id;
        if (helper.isValidID(id)) {
            return next();
        } else {
            return next(apiError.badRequest('ID không hợp lệ !!!'));
        }
    }
}
module.exports = new RouterMiddleware();
