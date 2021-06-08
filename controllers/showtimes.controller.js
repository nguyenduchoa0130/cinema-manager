const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const apiError = require('../errors/apiError');
class ShowtimesController {
    async fetchByCluterId(req, res, next) {
        let clusterId = req.query.clusterId;
        if (!helper.isValidID(clusterId)) {
            return next(apiError.badRequest('ID cụm rạp không hợp lệ'));
        }
        try {
            let showtimes = await models.Showtimes.findAll({
                attributes: {
                    include: ['clusterId', 'filmId', 'systemId'],
                },
                group: ['clusterId', 'filmId', 'systemId'],

                include: [
                    {
                        model: models.Film,
                        attributes: [
                            ['filmName', 'name'],
                            ['duration', 'duration'],
                        ],
                        include: [
                            {
                                model: models.StatusFilm,
                                attributes: [['statusName', 'name']],
                            },
                        ],
                    },
                    {
                        model: models.CinemaCluster,
                        attributes: [['clusterName', 'name']],
                        where: {
                            id: clusterId,
                        },
                    },
                ],
            });
            return res.json({ showtimes });
        } catch (err) {
            next(err);
        }
    }
    async insert(req, res, next) {
        let data = req.body;
        let minutes = req.minutes;
        let showtimes = [];
        let duplicateTime = [];
        let invalidTimeStart = req.invalidTimeStart;
        try {
            let rows = await models.Showtimes.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                where: {
                    cinemaId: data.cinemaId,
                    clusterId: data.clusterId,
                    systemId: data.systemId,
                },
            });
            if (rows.length) {
                for (let rawTime of data.timeStart) {
                    let timeStart = helper.convertUTCDateToLocalDate(new Date(rawTime));
                    let timeEnd = helper.addMinutes(timeStart, minutes);
                    let checkDuplicate = rows.filter((row) => {
                        let checkStart = new Date(row.timeStart);
                        let checkEnd = new Date(row.timeEnd);
                        return helper.checkShowTime(checkStart, checkEnd, timeStart, timeEnd);
                    });
                    if (checkDuplicate.length) {
                        duplicateTime.push(rawTime);
                    } else {
                        showtimes.push({
                            ...data,
                            timeStart,
                            timeEnd,
                        });
                    }
                }
            } else {
                for (let rawTime of data.timeStart) {
                    let timeStart = helper.convertUTCDateToLocalDate(new Date(rawTime));
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
                    msg: 'Số suất chiếu được tạo thành công: ' + showtimes.length,
                    duplicate:
                        'Số suất chiếu bị trùng: ' + duplicateTime.length + (duplicateTime.length ? duplicateTime.join('-') : ''),
                    invalidTimeStart:
                        'Số suất chiếu có thời gian bắt đầu không hợp lệ: ' +
                        invalidTimeStart.length +
                        (invalidTimeStart.length ? invalidTimeStart.join('-') : ''),
                });
            } else {
                let msg = `Số suất chiếu bị trùng lịch: ${duplicateTime.length} (${
                    duplicateTime.length ? duplicateTime.join('-') : ''
                }) Số suất chiếu có thời gian bắt đầu không hợp lệ: ${invalidTimeStart.length} ${
                    invalidTimeStart.length ? invalidTimeStart.join('-') : ''
                },
				`;
                return next(apiError.badRequest(JSON.stringify(msg)));
            }
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        let minutes = req.minutes;
        let data = req.body;
        try {
            let rawData = await Promise.all([
                models.Showtimes.findByPk(id),
                models.Showtimes.findAll({
                    where: {
                        systemId: data.systemId,
                        clusterId: data.clusterId,
                        cinemaId: data.cinemaId,
                        id: {
                            [Op.ne]: id,
                        },
                    },
                }),
            ]);
            let [showtimes, rows] = rawData;
            if (!showtimes) {
                return next(apiError.notFound('Không tìm thấy suất chiếu'));
            }
            let timeStart =
                'timeStart' in data
                    ? helper.convertUTCDateToLocalDate(new Date(data.timeStart[0]))
                    : new Date(showtimes.timeStart);
            let timeEnd = 'timeStart' in data ? helper.addMinutes(timeStart, minutes) : new Date(showtimes.timeEnd);
            if (rows.length) {
                let rowCheck = rows.filter((row) => {
                    let checkStart = new Date(row.timeStart);
                    let checkEnd = new Date(row.timeEnd);
                    return helper.checkShowTime(checkStart, checkEnd, timeStart, timeEnd);
                });
                if (rowCheck.length) {
                    let msg = rowCheck.reduce((str, row) => {
                        return str + ` ${helper.toLocalStringUTC(row.timeStart)} - ${helper.toLocalStringUTC(row.timeEnd)} `;
                    }, '');
                    return next(apiError.badRequest('Thời gian đã bị trùng với: ' + msg));
                }
            }
            data = { ...data, timeStart, timeEnd };
            for (let prop in data) {
                showtimes[prop] = data[prop];
            }
            await showtimes.save();
            return res.json({ msg: 'Cập nhật suất chiếu thành công' });
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
module.exports = new ShowtimesController();
