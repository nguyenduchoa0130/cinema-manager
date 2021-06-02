const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const apiError = require('../errors/apiError');
class ClusterController {
    async fetchAll(req, res, next) {
        try {
            let cluster = await models.CinemaCluster.findAll({
                attributes: {
                    exlude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                include: [
                    {
                        model: models.CinemaSystem,
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
                    exlude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                include: [
                    {
                        model: models.CinemaSystem,
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
        let data = req.body;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID không hợp lệ'));
        try {
            let clusterData = await Promise.all([
                models.CinemaCluster.findAll({
                    where: {
                        clusterName: sequelize.where(sequelize.fn('LOWER', sequelize.col('clusterName')), 'LIKE', `%${data.clusterName}%`),
                    },
                }),
                models.CinemaCluster.findByPk(id),
            ]);
            if (clusterData[0].length) return next(apiError.conflict('Tên cụm rạp đã tồn tại!'));
            if (!clusterData[1]) return next(apiError.notFound('Không tìm thầy cụm rạp trên'));
            for (let prop in data) {
                clusterData[1][prop] = data[prop];
            }
            await clusterData[1].save();
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
module.exports = new ClusterController();
