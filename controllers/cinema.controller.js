const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const apiError = require('../errors/apiError');
class CinemaController {
    async fetchAll(req, res, next) {
        try {
            let cinemas = await models.Cinema.findAll({
                attributes: {
                    exlude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                include: [
                    {
                        model: models.CinemaCluster,
                        attributes: [['clusterName', 'name']],
                    },
                ],
                raw: true,
            });
            if (!cinemas.length) return next(apiError.notFound('Không tìm thấy rạp nào'));
            return res.json(cinemas);
        } catch (err) {
            next(err);
        }
    }
    async fetchById(req, res, next) {
        let id = req.query.id;
        if (!id) return next();
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID rạp không hợp lệ'));
        try {
            let cinema = await models.Cinema.findByPk(id, {
                attributes: {
                    exlude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                include: [
                    {
                        model: models.CinemaCluster,
                        attributes: [['clusterName', 'name']],
                    },
                ],
                raw: true,
            });
            if (!cinema) return next(apiError.notFound('Không tìm thấy rạp'));
            return res.json(cinema);
        } catch (err) {
            next(err);
        }
    }
    async fetchByCinemaName(req, res, next) {
        let name = req.query.name;
        if (!name) return next();
        if (!name.length) return next(apiError.badRequest('Tên rạp không hợp lệ'));
        try {
            let rows = await models.Cinema.findAll({
                attributes: { exclude: helper.ignoreColumns('createdAt', 'updatedAt') },
                include: [
                    {
                        model: models.CinemaCluster,
                        attributes: [['clusterName', 'name']],
                    },
                ],
                raw: true,
            });
            let cinemas = rows.filter((cinema) => {
                let nameTmp = helper.removeAccents(cinema.cinemaName);
                let key = helper.removeAccents(name);
                return nameTmp.includes(key);
            });
            if (!cinemas.length) return next(apiError.notFound('Không tìm thấy rạp có liên quan tới ' + name));
            return res.json(cinemas);
        } catch (err) {
            next(err);
        }
    }
    async insert(req, res, next) {
        let data = req.body;
        try {
            let name = data.cinemaName.trim().toLowerCase();
            let cinemas = await models.Cinema.findAll({
                where: {
                    cinemaName: sequelize.where(sequelize.fn('LOWER', sequelize.col('cinemaName')), 'LIKE', `%${name}%`),
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
        let data = req.body;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID rạp không hợp lệ'));
        try {
            let rows = await models.Cinema.update({ ...data }, { where: { id } });
            if (!rows.length) return next(apiError.notFound('Cập nhật rạp không thành công do không tìm thấy rạp'));
            return res.json({ msg: 'Cập nhật rạp thành công' });
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID không hợp lê!'));
        try {
            let row = await models.Cinema.destroy({ where: { id } });
            if (!row) return next(apiError.badRequest('Xóa không thành công, vì không tồn tại rạp trên'));
            return res.json({ msg: 'Xóa rạp thành công' });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new CinemaController();
