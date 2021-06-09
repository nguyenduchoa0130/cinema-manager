const { Op } = require('sequelize');
const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const mailer = require('../config/nodemailer');
const sequelize = require('sequelize');
const apiError = require('../errors/apiError');
class BookingController {
    async fetchByUserId(req, res, next) {
        let userId = req.query.userId;
        let page = req.query.page ? parseInt(req.query.page) : null;
        let limit = req.query.limit ? parseInt(req.query.limit) : null;
        let offset = page ? (page - 1) * limit : null;
        if (!helper.isValidID(userId)) {
            return next(apiError.badRequest('ID người dùng không hợp lệ'));
        }
        try {
            let bookings = await models.Booking.findOne({
                where: {
                    userId: id,
                },
                order: ['timeBooking', 'DESC'],
                limit,
                offset,
                include: [
                    {
                        model: models.Ticket,
                        attribute: ['bookingId', 'priceTicket'],
                        include: [
                            {
                                model: models.Seat,
                                attributes: ['symbol', 'row', 'col'],
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
        try {
            let tickets = [];
            let result = await sequelize.transaction(async (t) => {
                let booking = await models.Booking.create(
                    {
                        userId: data.userId,
                        showtimesId: data.showtimesId,
                        timeBooking: helper.convertUTCDateToLocalDate(new Date(data.timeBooking)),
                        sumMoney: data.sumMoney,
                    },
                    { transaction: t }
                );
                for (let seat of data.seats) {
                    await models.Seat.update({ isOrder: true }, { where: { id: seat.id } }, { transaction: t });
                    tickets.push({
                        bookingId: booking.id,
                        seatId: seat.id,
                        priceTicket: seat.priceTicket,
                    });
                }
                let insertTickets = await models.Ticket.bulkCreate(tickets, { transaction: t });
                return booking;
            });
            return res.json({ msg: 'Đặt thành công', result });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new BookingController();
