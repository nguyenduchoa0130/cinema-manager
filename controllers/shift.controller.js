const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const apiError = require('../errors/apiError');
class ShiftController {
	
    async insert(req, res, next) {
        let data = req.body;
        try {
            let name = data.shiftName.trim().toLowerCase();
            let rows = await models.Shift.findAll({
                where: {
                    cinemaId: data.cinemaId,
                },
            });
            if (rows.length) {
                let rowsName = rows.filter((shift) => {
                    return shift.shiftName === name;
                });
                if (rowsName.length) {
                    return next(apiError.conflict('Tên ca đã tồn tại'));
                }
                let rowsTime = rows.filter((shift) => {
                    return (
                        new Date(shift.timeStart).getTime() <= new Date(data.timeStart) &&
                        new Date(shift.timeEnd).getTime() >= new Date(data.timeStart)
                    );
                });
                if (rowsTime.length) {
                    let notice = rowsTime.reduce((str, shift) => {
                        return str + shift.shiftName + ' ';
                    }, '');
                    return next(apiError.conflict(`Ca chiếu đã bị trùng với ${rowsTime.length} ca chiếu khác: ca ${notice}`));
                }
            }
            let shift = await models.Shift.create(data);
            return res.json({ msg: 'Tạo ca chiếu thành công', shift });
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID ca chiếu không hợp lệ'));
        let data = req.body;
        try {
            let shift = await models.Shift.findByPk(id);
            let rows = await models.Shift.findAll({
                where: {
                    cinemaId: 'cinemaId' in data ? data.cinemaId : shift.cinemaId,
                },
            });
            if (!shift) {
                return next(apiError.notFound('Khồng tìm thấy ca chiếu'));
            }
            if (shift.timeEnd) {
                return next(apiError.badRequest('Không thể cập nhật lại ca đã có lịch chiếu'));
            }
            if (rows.length) {
                if ('shiftName' in data && data.shiftName != shift.shiftName) {
                    let rowsName = rows.filter((shift) => {
                        return shift.shiftName.toLowerCase() == data.shiftName.toLowerCase();
                    });
                    if (rowsName.length) {
                        return next(apiError.conflict('Tên ca chiếu không hợp lệ'));
                    }
                }
                if ('timeStart' in data) {
                    let rowsTime = rows.filter((shift) => {
                        return (
                            new Date(shift.timeStart).getTime() <= new Date(data.timeStart) &&
                            new Date(shift.timeEnd).getTime() >= new Date(data.timeStart)
                        );
                    });
                    if (rowsTime.length) {
                        let notice = rowsTime.reduce((str, shift) => {
                            return str + shift.shiftName + ' ';
                        }, '');
                        return next(apiError.conflict(`Ca chiếu đã bị trùng với ${rowsTime.length} ca chiếu khác: ca ${notice}`));
                    }
                }
            }
            for (let prop in data) {
                shiftName[prop] = data[prop];
            }
            await shift.save();
            return res.json({ msg: 'Update thành công' });
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) {
            return next(apiError.badRequest('ID ca chiếu không hợp lệ'));
        }
        try {
            let rows = await models.Shift.delete({ where: { id } });
            if (!rows) {
                return next(apiError.notFound('Không tìm thấy ca chiếu'));
            }
            return res.json({ msg: 'Xóa ca chiếu thành công' });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new ShiftController();
