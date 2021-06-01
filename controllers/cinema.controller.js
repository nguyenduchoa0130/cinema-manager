const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const apiError = require('../errors/apiError');

class CinemaController {
    async fetchAll(req, res, next) {
        try {
            let cinemas = await models.Cinema.findAll({
                attributes: {
                    exlude: helper.ignoreColumns('createdAt', 'updatedAt', 'clusterId'),
                },
                include: [
                    {
                        model: models.CinemaCluster,
                    },
                ],
            });
            if (!cinemas.length) return next(apiError.notFound('Không tìm thấy rạp nào'));
            return res.json(cinemas);
        } catch (err) {
            next(err);
        }
    }
    async fetchById(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID không hợp lệ'));
        try {
            let cinema = await models.Cinema.findByPk(id, {
                attributes: {
                    exlude: helper.ignoreColumns('createdAt', 'updatedAt', 'clusterId'),
                },
                include: [
                    {
                        model: models.CinemaCluster,
                    },
                ],
            });
            if (!cinema) return next(apiError.notFound('Không tìm thấy rạp nào'));
            return res.json(cinema);
        } catch (err) {
            next(err);
        }
    }
	fetchByClusterId(req, res, next) {
		let clusterId = req.params.id;
	}

    async add(req, res, next) {
        let data = req.body;
        try {
            let cinemas = await models.Cinema.findAll({
                where: {
                    cinemaName: sequelize.where(sequelize.fn('LOWER', sequelize.col('cinemaName')), 'LIKE', `%${data.cinemaName}%`),
                },
            });
            if (cinemas.length) {
                return next(apiError.conflict('Tên rạp đã tồn tại'));
            }
            let cinema = await models.Cinema.create(data);
            return res.json({ msg: 'Tạo rạp thành công', cinema });
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID không hợp lệ'));
        try {
            let rows = await models.Cinema.update(
                {
                    ...req.body,
                },
                {
                    where: {
                        id,
                    },
                }
            );
            if (!rows[0]) return next(apiError.badRequest('Cập nhật không thành công, vì không tồn tại film'));
            return res.json({ msg: 'Cập nhật thành công' });
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID không hợp lê!'));
        try {
            let row = await models.destroy({ where: { id } });
            if (!row) return next(apiError.badRequest('Xóa không thành công, vì không tồn tại rạp trên'));
            return res.json({ msg: 'Xóa rạp thành công' });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new CinemaController();
