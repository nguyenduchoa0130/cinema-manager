const { Op } = require('sequelize');
const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const apiError = require('../errors/apiError');

class SystemCinemaController {
    async fetchAll(req, res, next) {
        try {
            let systems = await models.CinemaSystem.findAll({ attributes: { exclude: helper.ignoreColumns('createdAt', 'updatedAt', 'logo') } });
            if (!systems.length) return next(apiError.notFound('Không tìm thấy kết quả nào'));
            return res.json(systems);
        } catch (err) {
            next(err);
        }
    }
    async fetchById(req, res, next) {
        let id = req.params.id;
        if (!id.length) return next(apiError.badRequest('ID truyền vào không hợp lệ'));
        try {
            let system = await models.CinemaSystem.findOne({
                where: {
                    id: sequelize.where(sequelize.fn('LOWER', sequelize.col('id')), 'LIKE', `%${id}%`),
                },
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt', 'logo'),
                },
                include: models.CinemaCluster,
            });
            if (!system) return next(apiError.notFound('Không tìm thấy hệ thống rạp nào'));
            return res.json(system);
        } catch (err) {
            next(err);
        }
    }
    async insert(req, res, next) {
        let data = req.body;
        try {
            let systems = await models.CinemaSystem.findAll({
                where: {
                    systemName: sequelize.where(sequelize.fn('LOWER', sequelize.col('systemName')), 'LIKE', `%${data.systemNames}%`),
                },
            });
            if (systems.length) return next(apiError.conflict('Hệ thống rạp đã tồn tại. Vui lòng tên hệ thống rạp khác'));
            let system = await models.CinemaSystem.create(data);
            if (Object.keys(req.file).length) {
                system.logo = req.file.buffer;
                system.logoSrc = `${process.env.HOST || localhost}/img/logo/${system.id}`;
            }
            await system.save();
            return res.json({ msg: 'Tạo hệ thống rạp thành công', system });
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        let data = req.body;
        if (!helper.isValidID(id)) return next(apiError.badRequest('Cập nhật thất bại: ID không hợp lệ'));
        try {
            let system = await models.CinemaSystem.findByPk(id, { attributes: { exclude: helper.ignoreColumns('createdAt', 'updatedAt') } });
            if (!system) return next(apiError.notFound(' Không tìm thấy hệ thống rạp'));
            if ('systemName' in data) {
                let systems = await models.CinemaSystem.findAll({
                    where: {
                        systemName: sequelize.where(sequelize.fn('LOWER', sequelize.col('systemName')), 'LIKE', `%${data.systemName}%`),
                    },
                });
                if (systems.length) return next(apiError.conflict(' Tên hệ thống rạp đã tồn tại'));
                system.systemName = data.systemName;
            }
            if (Object.keys(req.file).length) {
                system.logo = req.file.buffer;
            }
            await system.save();
            return res.json({ msg: 'Cập nhật hệ thống thành công' });
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) return next(apiError.badRequest('Lôi: ID không hợp lệ'));
        let row = await models.CinemaSystem.destroy({ where: { id } });
        if (!row) return next(apiError.badRequest(' Không tồn tại hệ thống rạp trên'));
        return res.json({ msg: 'Xóa thành công' });
    }
}
module.exports = new SystemCinemaController();
