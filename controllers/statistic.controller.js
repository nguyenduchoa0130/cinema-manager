const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const apiError = require('../errors/apiError');

class StatisticController {
    async byClusterId(req, res, next) {
        let statistic = [];
        let data;
        let clusterId = req.query.clusterId;
        if (!clusterId) {
            return next();
        }
        if (!helper.isValidID(clusterId)) {
            return next(apiError.badRequest('ID cụm rạp không hợp lệ'));
        }
        let dateStart = req.query.dateStart;
        let dateEnd = req.query.dateEnd;
        if (clusterId && dateStart && dateEnd) {
            try {
                data = await models.Booking.findAll({
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                    order: [['timeBooking', 'DESC']],
                    where: {
                        timeBooking: {
                            [Op.between]: [new Date(dateStart), new Date(new Date(dateEnd).getTime() + 86400000)],
                        },
                    },
                    include: [
                        {
                            model: models.Ticket,
                            attributes: ['id'],
                        },
                        {
                            model: models.Showtimes,
                            attributes: ['id'],
                            where: {
                                clusterId,
                            },
                        },
                    ],
                });
            } catch (err) {
                next(err);
            }
        } else {
            try {
                data = await models.Booking.findAll({
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                    order: [[['timeBooking', 'DESC']]],
                    include: [
                        {
                            model: models.Ticket,
                            attributes: ['id'],
                        },
                        {
                            model: models.Showtimes,
                            attributes: [],
                            where: {
                                clusterId,
                            },
                        },
                    ],
                });
            } catch (err) {
                next(err);
            }
        }
        let dates = data.map((item) => item.timeBooking.toJSON().split('T')[0]);
        dates = [...new Set(dates)]; // lấy danh sách ngày
        dates.forEach((date) => {
            let sumMoney = data.reduce((cash, item) => {
                if (item.timeBooking.toJSON().startsWith(date)) {
                    return cash + +item.sumMoney;
                } else {
                    return cash;
                }
            }, 0);
            let numOfTickets = data.reduce((ticket, item) => {
                return ticket + item.Tickets.length;
            }, 0);
            statistic.push({
                date,
                sumMoney,
                numOfTickets,
            });
        });
        if (statistic.length) {
            let totalMoney = statistic.reduce((total, item) => total + item.sumMoney, 0);
            let totalTicket = statistic.reduce((total, item) => total + item.numOfTickets, 0);
            return res.json({
                totalMoney,
                totalTicket,
                details: statistic,
            });
        } else {
            return res.json({});
        }
    }
    async byFilmId(req, res, next) {
        let filmId = req.query.filmId;
        if (!filmId) {
            return next();
        }
        if (!helper.isValidID(filmId)) {
            return next(apiError.badRequest('ID cụm rạp không hợp lệ'));
        }
        let dateStart = req.query.dateStart;
        let dateEnd = req.query.dateEnd;
        if (filmId && dateStart && dateEnd) {
            try {
                data = await models.Booking.findAll({
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                    order: [['timeBooking', 'DESC']],
                    where: {
                        timeBooking: {
                            [Op.between]: [new Date(dateStart), new Date(new Date(dateEnd).getTime() + 86400000)],
                        },
                    },
                    include: [
                        {
                            model: models.Showtimes,
                            attributes: ['id'],
                            where: {
                                filmId,
                            },
                        },
                    ],
                });
            } catch (err) {
                next(err);
            }
        } else {
            try {
                data = await models.Booking.findAll({
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                    order: [[['timeBooking', 'DESC']]],
                    include: [
                        {
                            model: models.Showtimes,
                            attributes: [],
                            where: {
                                filmId,
                            },
                        },
                    ],
                });
            } catch (err) {
                next(err);
            }
        }
        let dates = data.map((item) => item.timeBooking.toJSON().split('T')[0]);
        dates = [...new Set(dates)]; // lấy danh sách ngày
        dates.forEach((date) => {
            let total = data.reduce((cash, item) => {
                if (item.timeBooking.toJSON().startsWith(date)) {
                    return cash + +item.sumMoney;
                } else {
                    return cash;
                }
            }, 0);
            statistic.push({
                date,
                total,
            });
        });
        return res.json(statistic);
    }
}
module.exports = new StatisticController();
