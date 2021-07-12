const models = require('../models/index').sequelize.models;
const helper = require('../config/helper');
const apiError = require('../errors/apiError');
const { Op } = require('sequelize');
class BookingMiddleware {
    async checkBookingBySystemId(req, res, next) {
        try {
            let data = await models.Booking.findAll({
                include: [
                    {
                        model: models.Showtimes,
                        where: {
                            systemId: req.params.id,
                        },
                    },
                ],
            });
            if (data.length) {
                return next(apiError.badRequest('Không thể xóa hệ thống rạp. Vì hệ thống rạp đang có khách hàng đặt vé'));
            } else {
                return next();
            }
        } catch (err) {
            next(err);
        }
    }
    async checkBookingByClusterId(req, res, next) {
        try {
            let data = await models.Booking.findAll({
                include: [
                    {
                        model: models.Showtimes,
                        where: {
                            clusterId: req.params.id,
                        },
                    },
                ],
            });
            if (data.length) {
                return next(apiError.badRequest('Không thể xóa cụm rạp. Vì cụm rạp đang có khách hàng đặt vé'));
            } else {
                return next();
            }
        } catch (err) {
            next(err);
        }
    }
    async checkBookingByCinemaId(req, res, next) {
        try {
            let data = await models.Booking.findAll({
                include: [
                    {
                        model: models.Showtimes,
                        where: {
                            cinemaId: req.params.id,
                        },
                    },
                ],
            });
            if (data.length) {
                return next(apiError.badRequest('Không thể xóa rạp. Vì rạp đang có khách hàng đặt vé'));
            } else {
                return next();
            }
        } catch (err) {
            next(err);
        }
    }
    async checkBookingByfilmId(req, res, next) {
        try {
            let data = await models.Booking.findAll({
                include: [
                    {
                        model: models.Showtimes,
                        where: {
                            filmId: req.params.id,
                        },
                    },
                ],
            });
            if (data.length) {
                return next(apiError.badRequest('Không thể xóa phim. Vì phim đang có khách hàng đặt vé'));
            } else {
                return next();
            }
        } catch (err) {
            next(err);
        }
    }
    async checkBookingByShowtimesId(req, res, next) {
        try {
            let data = await models.Booking.findAll({
                where: {
					showtimesId: req.params.id,
				}
            });
            if (data.length) {
                return next(apiError.badRequest('Không thể xóa suất chiếu. Vì suất chiếu đang có khách hàng đặt vé'));
            } else {
                return next();
            }
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new BookingMiddleware();
