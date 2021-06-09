const models = require('../models/index').sequelize.models;
const helper = require('../config/helper');
const apiError = require('../errors/apiError');
class CategoryMiddlware {
    isCategoryIdValid(req, res, next) {
        let id = req.params.id;
        if (helper.isValidID(id)) {
            return next();
        } else {
            return next(apiError.badRequest('ID danh mục không hợp lệ'));
        }
    }
	
}
module.exports = new CategoryMiddlware();
