const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const apiError = require('../errors/apiError');

class ClusterController {
    async fetchAll(req, res, next) {
        try {
            let cluster = await models.CinemaCluster.findAll({
                attributes: {
                    exlude: helper.ignoreColumns('createdAt', 'updatedAt', 'clusterId'),
                },
                include: [
                    {
                        model: models.CinemaClusterCluster,
                    },
                ],
            });
            if (!cluster.length) return next(apiError.notFound('Không tìm thấy rạp nào'));
            return res.json(cluster);
        } catch (err) {
            next(err);
        }
    }
    async fetchById(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID không hợp lệ'));
        try {
            let cinema = await models.CinemaCluster.findByPk(id, {
                attributes: {
                    exlude: helper.ignoreColumns('createdAt', 'updatedAt', 'clusterId'),
                },
                include: [
                    {
                        model: models.CinemaClusterCluster,
                    },
                ],
            });
            if (!cinema) return next(apiError.notFound('Không tìm thấy rạp nào'));
            return res.json(cinema);
        } catch (err) {
            next(err);
        }
    }

    async add(req, res, next) {
        let data = req.body;
        try {
            let cinemas = await models.CinemaCluster.findAll({
                where: {
                    cinemaName: sequelize.where(sequelize.fn('LOWER', sequelize.col('cinemaName')), 'LIKE', `%${data.cinemaName}%`),
                },
            });
            if (cinemas.length) {
                return next(apiError.conflict('Tên rạp đã tồn tại'));
            }
            let cinema = await models.CinemaCluster.create(data);
            return res.json({ msg: 'Tạo rạp thành công', cinema });
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID không hợp lệ'));
        try {
            let rows = await models.CinemaCluster.update(
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
