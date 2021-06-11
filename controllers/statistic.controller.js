const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const apiError = require('../errors/apiError');

class StatisticController {
    async bySystemId(req, res, next) {}
    async byClusterId(req, res, next) {}
    async byCinemaId(req, res, next) {}
    async byFilmId(req, res, next) {
        let filmId = req.query.filmId;
        if (!helper.isValidID(filmId)) {
            return next(apiError.badRequest('ID phim không hợp lệ'));
        }
        try {
            let result = await models.Film.findOne({
                attributes: [
                    'filmName',
                    [sequelize.fn('SUM', sequelize.col('Showtimes.Bookings.sumMoney')), 'sumMoney'],
                    [sequelize.fn('COUNT', sequelize.col('Showtimes.Bookings.Tickets.*')), 'countTicket'],
                ],
                where: {
                    id: filmId,
                },
                include: [
                    {
                        model: models.Showtimes,
                        require: true,
                        attributes: ['id'],
                        include: [
                            {
                                model: models.Booking,
                                attributes: ['id', 'timeBooking', 'sumMoney'],
                                include: [
                                    {
                                        model: models.Ticket,
                                        attributes: ['id', 'priceTicket'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
                group: ['Film.id', 'Showtimes.id', 'Showtimes.Bookings.id', 'Showtimes.Bookings.Tickets.id'],
            });
            if (!result) {
                return next(apiError.notFound('Không tìm thấy số liệu'));
            }
            return res.json({ result });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new StatisticController();
