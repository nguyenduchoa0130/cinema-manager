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
    async isSystemIdValid(req, res, next) {
        if ('systemId' in req.body) {
            let systemId = req.body.systemId;
            if (!helper.isValidID(systemId)) {
                return next(apiError.badRequest('ID cụm rạp không hợp lệ'));
            } else {
                let system = await models.CinemaSystem.findByPk(systemId);
                if (!system) {
                    return next(apiError.badRequest('ID hệ thống rạp không hợp lệ'));
                } else {
                    return next();
                }
            }
        } else {
            return next();
        }
    }
}
module.exports = new CinemaMiddleware();
