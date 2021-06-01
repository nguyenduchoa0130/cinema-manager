const models = require('../models/index').sequelize.models;
const apiError = require('../errors/apiError');
const helper = require('../config/helper');
class ImageController {
    async thumbnail(req, res, next) {
        try {
            let id = req.params.id;
            if (id) {
                let img = await models.Image.findOne({
                    where: {
                        filmId: id,
                    },
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                });
                if (img) {
                    return res.header('Content-Type', 'image/jpeg').send(img.thumbnail);
                } else {
                    return next(apiError.notFound('Không tìm thấy hình ảnh'));
                }
            } else {
                return next(apiError.badRequest('Yêu cầu không hợp lệ !!!'));
            }
        } catch (err) {
            next(err);
        }
    }
    async poster(req, res, next) {
        try {
            let id = req.params.id;
            if (id) {
                let img = await models.Image.findOne({
                    where: {
                        filmId: id,
                    },
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                });
                if (img) {
                    return res.header('Content-Type', 'image/jpeg').send(img.poster);
                } else {
                    return next(apiError.notFound('Không tìm thấy hình ảnh'));
                }
            } else {
                return next(apiError.badRequest('Yêu cầu không hợp lệ !!!'));
            }
        } catch (err) {
            next(err);
        }
    }
    async logo(req, res, next) {
        try {
            let id = req.params.id;
            if (id) {
                let system = await models.CinemaSystem.findOne({
                    where: {
                        id,
                    },
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                });
                if (system) {
                    return res.header('Content-Type', 'image/jpeg').send(system.logo);
                } else {
                    return next(apiError.notFound('Không tìm thấy hình ảnh'));
                }
            } else {
                return next(apiError.badRequest('Yêu cầu không hợp lệ !!!'));
            }
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new ImageController();
