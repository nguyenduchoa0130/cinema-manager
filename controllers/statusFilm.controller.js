const sequelize = require('sequelize');
const { StatusFilm } = require('../models/index').sequelize.models;
const helper = require('../config/helper');
const apiError = require('../errors/apiError');
class StatusFilmController {
    async fetchAll(req, res, next) {
        try {
            let statusFilm = await StatusFilm.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
            });
            if (status.length) {
                res.status(200).json(statusFilm);
            } else {
                res.status(200).json({
                    msg: 'Không tìm thấy trạng thái phim nào',
                    statusFilm: null,
                });
            }
        } catch (err) {
            next(err);
        }
    }
    async add(req, res, next) {
        try {
            let statusName = req.body.statusName;
            let statusFilm = await StatusFilm.findAll({
                where: {
                    statusName: sequelize.where(sequelize.fn('LOWER', sequelize.col('statusName')), 'LIKE', `%${statusName}%`),
                },
            });
            if (statusFilm.length) {
                return next(apiError.conflict('Trạng thái đã tồn tại'));
            } else {
                statusFilm = await StatusFilm.create({ statusName });
                return res.status(200).json({ msg: 'Tạo thành công', statusFilm });
            }
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            let id = req.params.id;
            if (helper.isValidID(id)) {
                await StatusFilm.update({ statusName }, { where: { id } });
				
            } else {
                return next(apiError.badRequest('Không thể thực hiện yêu cầu của bạn vì nó không hợp lệ'));
            }
        } catch (err) {}
    }
}
module.exports = new StatusFilmController();
