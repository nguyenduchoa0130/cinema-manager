const models = require('../models/index').sequelize.models;
const helper = require('../config/helper');
const apiError = require('../errors/apiError');
const { Op } = require('sequelize');
class FilmMiddleware {
    isFilmIdValid(req, res, next) {
        let id = req.params.id;
        if (helper.isValidID(id)) {
            return next();
        } else {
            return next(apiError.badRequest('ID rạp không hợp lệ'));
        }
    }
    async isCategoryIdValid(req, res, next) {
        if ('categoryId' in req.body) {
            let categoryId = req.body.categoryId;
            if (!helper.isValidID(categoryId)) {
                return next(apiError.badRequest('ID danh mục phim không hợp lệ'));
            } else {
                let category = await models.Category.findByPk(categoryId);
                if (category) {
                    return next();
                } else {
                    return next(apiError.badRequest('Danh mục phim không tồn tại'));
                }
            }
        } else {
            return next();
        }
    }
    async updateStatusFilm(req, res, next) {
        await models.Film.update(
            { statusId: 'DANG_CONG_CHIEU' },
            {
                where: {
                    premiere: {
                        [Op.lte]: helper.convertUTCDateToLocalDate(new Date()),
                    },
                },
            }
        );
        return next();
    }
}
module.exports = new FilmMiddleware();
