const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const apiError = require('../errors/apiError');
class SeatController {
    async order(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) {
            return next(apiError.badRequest('ID vị trí không hợp lệ'));
        }
        try {
            let rows = await models.Seat.update({ isOrder: true }, { where: { id } });
            if (!rows[0]) {
                return next(apiError.notFound('Thao tác đặt không thành công, do không tồn tại vị trí chỗ ngồi trên'));
            }
            return res.json({ msg: 'Đặt chỗ thành công' });
        } catch (err) {
            next(err);
        }
    }
    async cancel(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) {
            return next(apiError.badRequest('ID vị trí không hợp lệ'));
        }
        try {
            let rows = await models.Seat.update({ isOrder: true }, { where: { id } });
            if (!rows[0]) {
                return next(apiError.notFound('Thao tác đặt không thành công, do không tồn tại vị trí chỗ ngồi trên'));
            }
            return res.json({ msg: 'Hủy thành công' });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new SeatController();
