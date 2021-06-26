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
        // data = {
        //     userId: 1,
        //     showtimesId: '28',
        //     sumMoney: 45000,
        //     seats: [1326, 1327, 1328, 1329],
        // };
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
                    let d = await Promise.all([
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
                    tickets.push(`ID: ${d[1].id}, Số ghế: ${seat.symbol}`);
                }
                return {
                    id: booking.id,
                    tickets,
                    sumMoney: booking.sumMoney,
                };
            });
            let details = await Promise.all([
                models.User.findByPk(data.userId),
                models.Showtimes.findOne({
                    attributes: ['timeStart', 'timeEnd'],
                    where: { id: data.showtimesId },
                    include: [
                        {
                            model: models.CinemaCluster,
                            attributes: ['clusterName', 'address'],
                        },
                        {
                            model: models.Cinema,
                            attributes: ['cinemaName'],
                        },
                        {
                            model: models.Film,
                            attributes: ['filmName', 'duration'],
                        },
                    ],
                }),
            ]);
            if (details[0] && details[1]) {
                await mailer.send(
                    details[0].email,
                    'Đặt vé thành công',
                    `Bạn đã đặt thành vé thành công.
Chi tiết giao dịch: 
Mã giao dịch: ${result.id}
Cụm rạp: ${details[1].CinemaCluster.clusterName}
Rạp: ${details[1].Cinema.cinemaName}
Địa chỉ: ${details[1].CinemaCluster.address}
Phim: ${details[1].Film.filmName}
Thời lượng: ${details[1].Film.duration}
Thời gian chiếu: ${details[1].timeStart.toJSON().split('T')[0]} - ${details[1].timeStart.toJSON().split('T')[1].substr(0, 5)}
Thời gian kết thúc: ${details[1].timeEnd.toJSON().split('T')[0]} - ${details[1].timeEnd.toJSON().split('T')[1].substr(0, 5)}
Tổng tiền: ${result.sumMoney}
Ghế: ${tickets.join(', ')}
Xin cảm ơn`
                );
            }
            return res.json({ msg: 'Đặt thành công', bookingId: result.id });
        } catch (err) {
            return res.json({ msg: 'Đặt vé không thành công. Vì ' + err.message });
        }
    }
}
module.exports = new BookingController();
