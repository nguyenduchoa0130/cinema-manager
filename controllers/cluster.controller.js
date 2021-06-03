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
                        model: models.Cinema,
                        attributes: [['cinemaName', 'name']],
                    },
                    {
                        model: models.CinemaSystem,
                        attributes: [['systemName', 'name']],
                    },
                ],
            });
            if (!cluster.length) return next(apiError.notFound('Không tìm thấy cụm rạp nào'));
            return res.json({ cluster });
        } catch (err) {
            next(err);
        }
    }
    async fetchById(req, res, next) {
        let id = req.query.id;
        if (!id) return next();
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID không hợp lệ'));
        try {
            let cluster = await models.CinemaCluster.findByPk(id, {
                attributes: {
                    exlude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                include: [
                    {
                        model: models.Cinema,
                        attributes: [['cinemaName', 'name']],
                    },
                    {
                        model: models.CinemaSystem,
                        attributes: [['systemName', 'name']],
                    },
                ],
            });
            if (!cluster) return next(apiError.notFound('Không tìm thấy rạp nào'));
            return res.json({ cluster });
        } catch (err) {
            next(err);
        }
    }
    async fetchByClusterName(req, res, next) {
        let name = req.query.name;
        if (!name) return next();
        if (!name.length) return next(apiError.badRequest('Tên cụm rạp không hợp lệ'));
        try {
            let rows = await models.CinemaCluster.findAll({
                attributes: { exclude: helper.ignoreColumns('createdAt', 'updatedAt') },
                include: [
                    {
                        model: models.Cinema,
                        attributes: [['cinemaName', 'name']],
                    },
                    {
                        model: models.CinemaSystem,
                        attributes: [['systemName', 'name']],
                    },
                ],
            });
            let clusters = rows.filter((cluster) => {
                let nameTmp = helper.removeAccents(cluster.clusterName);
                let key = helper.removeAccents(name);
                return nameTmp.includes(key);
            });
            if (!clusters.length) return next(apiError.notFound('Không tìm thấy cụm rạp có liên quan tới ' + name));
            return res.json({ clusters });
        } catch (err) {
            next(err);
        }
    }
    async fetchBySystemId(req, res, next) {
        let systemId = req.query.sysId;
        if (!systemId) {
            return next();
        }
        if (!helper.isValidID(systemId)) {
            return next(apiError.badRequest('ID hệ thống không hợp lệ'));
        }
        try {
            let clusters = await models.CinemaCluster.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                include: [
                    {
                        model: models.Cinema,
                        attributes: [['cinemaName', 'name']],
                    },
                    {
                        model: models.CinemaSystem,
                        attributes: [['systemName', 'name']],
                        where: { id: systemId },
                    },
                ],
            });
            if (!clusters.length) {
                return next(apiError.notFound('Không tìm thấy kết quả'));
            } else {
                return res.json({ clusters });
            }
        } catch (err) {
            next(err);
        }
    }
    async insert(req, res, next) {
        let data = req.body;
        try {
            let name = data.cinemaName.trim().toLowerCase();
            let rows = await models.CinemaCluster.findAll({
                where: {
                    clusterName: sequelize.where(sequelize.fn('LOWER', sequelize.col('cinemaName')), 'LIKE', `${name}`),
                    cinemaId: data.cinemaId,
                },
            });
            if (rows.length) {
                return next(apiError.conflict('Tên cụm rạp đã tồn tại'));
            }
            let cluster = await models.CinemaCluster.create(data);
            return res.json({ msg: 'Tạo cụm rạp thành công', cluster });
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        let data = req.body;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID không hợp lệ'));
        try {
            if ('clusterName' in data) {
                let name = data.clusterName.trim().toLowerCase();
                let rows = await models.CinemaCluster.findAll({
                    where: {
                        clusterName: sequelize.where(sequelize.fn('LOWER', sequelize.col('clusterName')), 'LIKE', `${name}`),
                        cinemaId: data.cinemaId,
                    },
                });
                if (rows.length) {
                    return next(apiError.conflict('Tên cụm rạp đã tồn tại'));
                }
            }
            let row = await models.CinemaCluster.update({ ...data }, { where: id });
            if (!row[0]) {
                return next(apiError.notFound('Cập nhật không thành công do không tìm thấy cụm rạp'));
            } else {
                return res.json({ msg: 'Cập nhật cụm rạp thành công' });
            }
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
