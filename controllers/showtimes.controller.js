const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const apiError = require('../errors/apiError');
class ShiftController {
    async insert(req, res, next) {
        let data = req.body;
        let minutes = req.minutes;
        let showtimes = [];
        let duplicateTime = [];
        try {
            // kiểm tra lịch chiếu này có bị trùng với lịch chiếu khác hay không
            // B1. Lấy ra nhưng lịch chiếu trong cái rạp này
            let rows = await models.Showtimes.findAll({
                attributes: {
                    include: ['timeStart', 'timeEnd'],
                },
                include: [
                    {
                        model: models.Cinema,
                        attributes: ['cinemaName'],
                        where: {
                            id: data.cinemaId,
                        },
                    },
                    {
                        model: models.CinemaCluster,
                        attributes: ['clusterName'],
                        where: {
                            id: data.clusterId,
                        },
                    },
                    {
                        model: models.CinemaSystem,
                        attributes: ['systemName'],
                        where: {
                            id: data.systemId,
                        },
                    },
                ],
            });
            if (rows.length) {
                for (let rawTime of data.timeStart) {
                    let timeStart = helper.convertUTCDateToLocalDate(rawTime);
                    let timeEnd = helper.addMinutes(timeStart, minutes);
                    let checkDuplicate = rows.filter((row) => {
                        let checkStart = new Date(row.timeStart);
                        let checkEnd = new Date(row.timeEnd);
                        return !helper.checkShowTime(checkStart, checkEnd, timeStart, timeEnd);
                    });
                    if (!checkDuplicate.length) {
                        showtimes.push({
                            ...data,
                            timeStart,
                            timeEnd,
                        });
                    } else {
                        duplicateTime.push(rawTime);
                    }
                }
            } else {
                for (let rawTime of data.timeStart) {
                    let timeStart = helper.convertUTCDateToLocalDate(rawTime);
                    let timeEnd = helper.addMinutes(timeStart, minutes);
                    showtimes.push({
                        ...data,
                        timeStart,
                        timeEnd,
                    });
                }
            }
            if (showtimes.length) {
                await models.Showtimes.bulkCreate(showtimes);
                return res.json({
                    msg: 'Tạo suất chiếu thành công. Số suất chiếu được tạo: ' + showtimes.length,
                    error: 'Lỗi: Suất chiếu bị trùng. Số suất: ' + duplicateTime.length,
                });
            } else {
                return next(apiError.badRequest('Tất cả suất chiếu đều đã bị trùng'));
            }
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        let data = req.body;
        let listsId = ['systemId', 'clusterId', 'cinemaId', 'filmId'];
        let nameId = {
            systemId: 'ID hệ thống rạp',
            clusterId: 'ID cụm rạp',
            cinemaId: 'ID rạp không hợp lệ',
            filmId: 'ID phim không hợp lệ',
        };
        if (!helper.isValidID(id)) {
            return next(apiError.badRequest('ID suất chiếu không hợp lệ'));
        }
        let checkIsValidListId = listsId.filter((id) => {
            return helper.isValidID(id);
        });
        if (checkIsValidListId.length != listsId.length) {
            let errorId = listsId.filter((id) => {
                return !checkIsValidListId.includes(id);
            });
            let msg = errorId.reduce((str, id) => {
                return str + `${nameId[id]} không hợp lệ `;
            }, '');
            return next(apiError.badRequest(msg));
        }

        try {
            let showtimes = await models.Showtimes.findByPk(id);
            if (!showtimes) {
                return next(apiError.notFound('Không tìm thấy suất chiếu'));
            }
            let minutes = rows[1].duration.split(' ')[0].trim();
            let timeStart = null;
            if ('timeStart' in data) {
                timeStart = helper.convertUTCDateToLocalDate(new Date(data.timeStart));
                let now = helper.convertUTCDateToLocalDate(new Date());
                if (timeStart.getTime() <= now.getTime()) {
                    return next(apiError.badRequest('Thời gian chiếu không hợp lệ'));
                }
            } else {
                timeStart = new Date(showtimes.timeStart);
            }
            let timeEnd = helper.addMinutes(timeStart, +minutes); // local time
            let rows = await models.Showtimes.findAll({
                include: [
                    {
                        model: models.CinemaSystem,
                        attributes: [['systemName', 'name']],
                        where: {
                            id: data.systemId,
                        },
                    },
                    {
                        model: models.CinemaCluster,
                        attributes: [['clusterName', 'name']],
                        where: {
                            id: data.clusterId,
                        },
                    },
                    {
                        model: models.Cinema,
                        attributes: [['cinemaName', 'name']],
                        where: {
                            id: data.cinemaId,
                        },
                    },
                ],
            });
            if (rows.length) {
                let rowsCheck = rows.filter((showtimes) => {
                    let checkStart = new Date(showtimes.timeStart);
                    let checkEnd = new Date(showtimes.timeEnd);
                    return helper.checkShowTime(checkStart, checkEnd, timeStart, timeEnd);
                });
                if (rowsCheck.length) {
                    let notice = rowsCheck.reduce((str, row) => {
                        return ` ${str} ${row.timeStart.toLocaleString('en-US', { timeZone: 'UTC' })} - ${row.timeEnd.toLocaleString('en-US', {
                            timeZone: 'UTC',
                        })}`;
                    }, '');
                    return next(apiError.conflict('Suất chiếu bị trùng với suất:' + notice));
                }
            }
            data.timeStart = timeStart;
            data.timeEnd = timeEnd;
            for (let prop in data) {
                showtimes[prop] = data[prop];
            }
            await showtimes.save();
            return res.json({ msg: 'Cập nhật thành công' });
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) {
            return next(apiError.badRequest('ID lịch chiếu không hợp lệ'));
        }
        try {
            let rows = await models.Showtimes.delete({ where: { id } });
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
