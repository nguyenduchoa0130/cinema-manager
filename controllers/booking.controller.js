const { Op } = require('sequelize');
const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const { v4: uuidv4 } = require('uuid');
const mailer = require('../config/nodemailer');
const sequelize = require('../models/index').sequelize;
const apiError = require('../errors/apiError');
class BookingController {
    async fetchByUserId(req, res, next) {
        let userId = req.query.userId;
        if (!helper.isValidID(userId)) {
            return next(apiError.badRequest('ID người dùng không hợp lệ'));
        }
        try {
            let bookings = await models.Booking.findOne({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                where: {
                    userId,
                },
                include: [
                    {
                        model: models.Showtimes,
                        attributes: ['id', 'timeStart', 'timeEnd'],
                        include: [
                            {
                                model: models.Film,
                                attributes: ['id', 'thumbnail', ['filmName', 'name']],
                            },
                        ],
                    },
                    {
                        model: models.Ticket,
                        attributes: ['id', 'priceTicket'],
                        include: [
                            {
                                model: models.Seat,
                                attributes: ['id', 'symbol', 'row', 'col'],
                            },
                        ],
                    },
                ],
            });
            if (bookings.length) {
                return next(apiError.notFound('Không tìm thấy lịch sử đặt vé'));
            }
            return res.json({ bookings });
        } catch (err) {
            next(err);
        }
    }
    async insert(req, res, next) {
        let data = req.body;
        let priceTicket = data.sumMoney / data.seats.length;
        try {
            let tickets = [];
            let result = await sequelize.transaction(async (t) => {
                let booking = await models.Booking.create(
                    {
                        id: uuidv4(),
                        userId: data.userId,
                        showtimesId: data.showtimesId,
                        timeBooking: helper.convertUTCDateToLocalDate(new Date()),
                        sumMoney: data.sumMoney,
                    },
                    { transaction: t }
                );
                for (let seatId of data.seats) {
                    let seat = await models.Seat.findByPk(seatId);
                    if (!seat) {
                        throw new Error('Mã ghế không tồn tại');
                    }
                    if (seat.isOrder) {
                        throw new Error('Ghế được được bởi người khác');
                    }
                    await Promise.all([
                        models.Seat.update({ isOrder: true, priceTicket }, { where: { id: seatId }, transaction: t }),
                        models.Ticket.create(
                            {
                                id: uuidv4(),
                                bookingId: booking.id,
                                seatId,
                                priceTicket,
                            },
                            { transaction: t }
                        ),
                    ]);
                }
                return booking;
            });
            return res.json({ msg: 'Đặt thành công', bookingId: result.id });
        } catch (err) {
            return res.json({ msg: 'Đặt vé không thành công. Vì ' + err.message });
        }
    }
}
module.exports = new BookingController();
