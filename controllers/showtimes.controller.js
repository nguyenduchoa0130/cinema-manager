const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const apiError = require('../errors/apiError');
class ShowtimesController {
    async fetchAll(req, res, next) {
        try {
            let showtimes = await models.CinemaSystem.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt', 'logo'),
                },
                include: [
                    {
                        model: models.CinemaCluster,
                        attributes: ['id', ['clusterName', 'name'], 'address'],
                        require: false,
                        include: [
                            {
                                model: models.Showtimes,
                                attributes: ['id', 'timeStart', 'priceTicket'],
                                include: [
                                    {
                                        model: models.Cinema,
                                        attributes: ['id', ['cinemaName', 'name']],
                                    },
                                    {
                                        model: models.Film,
                                        attributes: ['id', ['filmName', 'name'], 'thumbnail'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            return res.json(showtimes);
        } catch (err) {
            next(err);
        }
    }
    async fetchShowtimesByCinemaId(req, res, next) {
        let { clusterId, cinemaId, filmId } = req.query;
        if (clusterId && cinemaId && filmId) {
            try {
                let showtimes = await models.Showtimes.findAll({
                    attributes: ['id', 'timeStart', 'timeEnd', 'priceTicket'],
                    where: {
                        timeStart: {
                            [Op.gte]: helper.convertUTCDateToLocalDate(new Date()),
                        },
                    },
                    include: [
                        {
                            model: models.Cinema,
                            attributes: ['id', ['cinemaName', 'name']],
                            where: {
                                id: cinemaId,
                            },
                        },
                        {
                            model: models.Film,
                            attributes: ['id', ['filmName', 'name']],
                            where: {
                                id: filmId,
                            },
                        },
                        {
                            model: models.CinemaCluster,
                            attributes: ['id', ['clusterName', 'name']],
                            where: {
                                id: clusterId,
                            },
                        },
                        {
                            model: models.CinemaSystem,
                            attributes: ['id', ['systemName', 'name']],
                        },
                        {
                            model: models.Seat,
                            attributes: ['id', 'symbol', 'row', 'col', 'isOrder'],
                        },
                    ],
                });
                if (!showtimes.length) {
                    return next(apiError.notFound('Không tìm thấy kết quả'));
                }
                return res.json({ showtimes });
            } catch (err) {
                next(err);
            }
        } else {
            return next();
        }
    }
    async fetchShowtimesByDate(req, res, next) {
        let { clusterId, cinemaId, filmId, date } = req.query;
        let start = new Date(date);
        let end = helper.addMinutes(start, 23 * 60 + 59);
        if (clusterId && cinemaId && filmId && date) {
            try {
                let showtimes = await models.Showtimes.findAll({
                    attributes: ['id', 'timeStart', 'timeEnd', 'priceTicket'],
                    where: {
                        timeStart: {
                            [Op.between]: [
                                helper.convertUTCDateToLocalDate(new Date(start)),
                                helper.convertUTCDateToLocalDate(new Date(end)),
                            ],
                        },
                    },
                    include: [
                        {
                            model: models.Cinema,
                            attributes: ['id', ['cinemaName', 'name']],
                            where: {
                                id: cinemaId,
                            },
                        },
                        {
                            model: models.Film,
                            attributes: ['id', ['filmName', 'name']],
                            where: {
                                id: filmId,
                            },
                        },
                        {
                            model: models.CinemaCluster,
                            attributes: ['id', ['clusterName', 'name']],
                            where: {
                                id: clusterId,
                            },
                        },
                        {
                            model: models.CinemaSystem,
                            attributes: ['id', ['systemName', 'name']],
                        },
                        {
                            model: models.Seat,
                            attributes: ['id', 'symbol', 'row', 'col', 'isOrder'],
                        },
                    ],
                });
                return res.json(showtimes);
            } catch (err) {
                next(err);
            }
        } else {
            return next();
        }
    }
    async fetchShowtimesById(req, res, next) {
        let id = req.query.id;
        if (!id) {
            return next();
        }
        if (!helper.isValidID(id)) {
            return next(apiError.badRequest('ID suất chiếu không hợp lệ'));
        }
        try {
            let showtimes = await models.Showtimes.findByPk(id, {
                attributes: {
                    exclude: helper.ignoreColumns('filmId', 'systemId', 'clusterId', 'cinemaId', 'createdAt', 'updatedAt'),
                },
                include: [
                    {
                        model: models.Film,
                        attributes: [['filmName', 'name']],
                    },
                    {
                        model: models.CinemaSystem,
                        attributes: [['systemName', 'name']],
                    },
                    {
                        model: models.CinemaCluster,
                        attributes: [['clusterName', 'name']],
                    },
                    {
                        model: models.Cinema,
                        attributes: [['cinemaName', 'name']],
                    },
                    {
                        model: models.Seat,
                        attributes: ['id', 'symbol', 'row', 'col', 'isOrder'],
                    },
                ],
            });
            if (!showtimes) {
                return next(apiError.notFound('Không tìm thầy suất chiếu'));
            }
            return res.json({ showtimes });
        } catch (err) {
            next(err);
        }
    }
    async fetchByCluterId(req, res, next) {
        let clusterId = req.query.clusterId;
        if (!clusterId) {
            return next();
        }
        if (!helper.isValidID(clusterId)) {
            return next(apiError.badRequest('ID cụm rạp không hợp lệ'));
        }
        try {
            let showtimes = await models.Showtimes.findAll({
                attributes: ['clusterId', [sequelize.fn('count', sequelize.col('*')), 'sum']],
                include: [
                    {
                        model: models.Film,
                        attributes: ['id', ['filmName', 'name'], 'duration', 'thumbnail'],
                        include: [
                            {
                                model: models.StatusFilm,
                                attributes: [['statusName', 'name']],
                            },
                        ],
                    },
                    {
                        model: models.CinemaCluster,
                        attributes: ['id', ['clusterName', 'name']],
                        where: {
                            id: clusterId,
                        },
                    },
                ],
                group: ['clusterId', 'Film.filmName', 'Film.id', 'Film.StatusFilm.id', 'CinemaCluster.id'],
            });
            return res.json({ showtimes });
        } catch (err) {
            next(err);
        }
    }
    async fetchByCinemaHasShowtimesByFilmIdAndClusterId(req, res, next) {
        let filmId = req.query.filmId;
        let clusterId = req.query.clusterId;
        if (filmId && clusterId) {
            try {
                let showtimes = await models.Showtimes.findAll({
                    attributes: ['id', 'timeStart', 'timeEnd', 'priceTicket'],
                    include: [
                        {
                            model: models.Cinema,
                            attributes: ['id', ['cinemaName', 'name']],
                        },
                        {
                            model: models.Film,
                            attributes: ['id', ['filmName', 'name']],
                            where: {
                                id: filmId,
                            },
                        },
                        {
                            model: models.CinemaCluster,
                            attributes: ['id', ['clusterName', 'name']],
                            where: {
                                id: clusterId,
                            },
                        },
                        {
                            model: models.CinemaSystem,
                            attributes: ['id', ['systemName', 'name']],
                        },
                    ],
                });
                if (!showtimes.length) {
                    return next(apiError.notFound('Không tìm thấy kết quả'));
                }
                return res.json({ showtimes });
            } catch (err) {
                next(err);
            }
        } else {
            return next();
        }
    }
    async fetchShowtimesByFilmId(req, res, next) {
        let filmId = req.query.filmId;
        if (!filmId) {
            return next();
        }
        if (!helper.isValidID(filmId)) {
            return next(apiError.badRequest('ID phim không hợp lệ'));
        }
        try {
            let showtimes = await models.CinemaSystem.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt', 'logo'),
                },
                include: [
                    {
                        model: models.CinemaCluster,
                        attributes: ['id', ['clusterName', 'name'], 'address'],
                        require: false,
                        include: [
                            {
                                model: models.Showtimes,
                                attributes: ['id', 'timeStart', 'priceTicket'],
                                where: {
                                    filmId,
                                },
                                include: [
                                    {
                                        model: models.Cinema,
                                        attributes: ['id', ['cinemaName', 'name']],
                                    },
                                    {
                                        model: models.Film,
                                        attributes: ['id', ['filmName', 'name'], 'thumbnail'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            return res.json(showtimes);
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
            let showtimes = await models.Showtimes.findByPk(id);
            if (!showtimes) {
                return next(apiError.notFound('Không tìm thấy ca chiếu'));
            }
            let { clusterId, filmId } = showtimes;
            await showtimes.destroy();
            return res.json({ msg: 'Xóa ca chiếu thành công', clusterId, filmId });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new ShowtimesController();
