const models = require('../models/index').sequelize.models;
const helper = require('../config/helper');
const apiError = require('../errors/apiError');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
class StatusController {
    async fetchAll(req, res, next) {
        try {
            let statuses = await models.StatusFilm.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
            });
            if (!statuses.length) return next(apiError.notFound('Không có trạng thái nào được tìm thấy'));
            return res.json(statuses);
        } catch (err) {
            next(err);
        }
    }
    async fetchById(req, res, next) {
        let id = req.query.id;
        if (!id) return next();
        try {
            let status = await models.StatusFilm.findByPk(id, {
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
            });
            if (!status) return next(apiError.notFound('Không tìm thấy trạng thái'));
            return res.json(status);
        } catch (err) {
            next(err);
        }
    }
    async fetchByName(req, res, next) {
        let name = req.query.name;
        if (!name) return next();
        try {
            let rows = await models.StatusFilm.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
            });
            let statuses = rows.filter((status) => {
                let nameTmp = helper.removeAccents(status.statusName);
                name = helper.removeAccents(name);
                return nameTmp.includes(name);
            });
            if (!statuses.length) return next(apiError.notFound('Không tìm thấy kết quả'));
            return res.json(statuses);
        } catch (err) {
            next();
        }
    }
    async insert(req, res, next) {
        let data = req.body;
        try {
            let statuses = await models.StatusFilm.findAll({
                where: {
                    [Op.or]: [{ id: data.id }, { statusName: data.statusName }],
                },
            });
            if (statuses.length) return next(apiError.conflict('Mã trạng thái hoặc tên trạng thái đã tồn tại'));
            await models.StatusFilm.create(data);
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        let data = req.body;
        try {
            let statuses = await models.StatusFilm.findAll({
                where: {
                    [Op.or]: [{ id: data.id }, { statusName: data.statusName }],
                },
            });
            if (statuses.length) return next(apiError.conflict('Mã trạng thái hoặc tên trạng thái đã tồn tại'));
            let row = await models.StatusFilm.update({ ...data }, { where: { id } });
            if (!row[0]) return next(apiError.notFound('Cập nhật thất bại vì không tồn tại trạng thái trên'));
            return res.json({ msg: 'Cập nhật trạng thái thành công' });
        } catch (err) {}
    }
    async delete(req, res, next) {
        let id = req.params.id;
        try {
            let row = await models.StatusFilm.destroy({ where: id });
            if (!row) return next(apiError.notFound('Xóa thất bại. Không tìm thấy trạng thái trên'));
            return res.json({ msg: 'Xóa trạng thái thành công' });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new StatusController();
