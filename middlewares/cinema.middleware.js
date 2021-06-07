const models = require('../models/index').sequelize.models;
const helper = require('../config/helper');
const apiError = require('../errors/apiError');
class CinemaMiddleware {
    isCinemaIdValid(req, res, next) {
        let id = req.params.id;
        if (helper.isValidID(id)) {
            return next();
        } else {
            return next(apiError.badRequest('ID rạp không hợp lệ'));
        }
    }
    async isClusterIdValid(req, res, next) {
        let id = req.params.id;
        if (helper.isValidID(id)) {
            let cluster = await models.CinemaCluster.findByPk(id);
            if (!cluster) {
                return next(apiError.badRequest('Cụm rạp không tồn tại'));
            }
            return next();
        } else {
            return next(apiError.badRequest('ID cụm rạp không hợp lệ'));
        }
    }
}
module.exports = new CinemaMiddleware();
