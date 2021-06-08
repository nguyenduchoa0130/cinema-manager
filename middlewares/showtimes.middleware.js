const models = require('../models/index').sequelize.models;
const helper = require('../config/helper');
const apiError = require('../errors/apiError');
class ShowtimesMiddleware {
    isShowtimesIdValid(req, res, next) {
        let id = req.params.id;
        if (helper.isValidID(id)) {
            return next();
        } else {
            return next(apiError.badRequest('ID suất chiếu không hợp lệ'));
        }
    }
    async isFilmIdValid(req, res, next) {
        let id = req.body.filmId;
        if (!helper.isValidID(id)) {
            return next(apiError.badRequest('ID phim không hợp lệ'));
        }
        try {
            let film = await models.Film.findByPk(id);
            if (!film) {
                return next(apiError.badRequest('Không tìm thấy phim'));
            }
            let minutes = film.duration.split(' ')[0].trim();
            req.minutes = +minutes;
            return next();
        } catch (err) {
            next(err);
        }
    }
    async isValidInfoCinemaManager(req, res, next) {
        let { systemId, clusterId, cinemaId } = req.body;
        let arr = [
            {
                name: 'ID hệ thống không hợp lệ',
                id: systemId,
            },
            {
                name: 'ID cụm rạp không hợp lệ',
                id: clusterId,
            },
            {
                name: 'ID rạp không hợp lệ',
                id: cinemaId,
            },
        ];
        let rows = arr.filter((item) => {
            return !helper.isValidID(item.id);
        });
        if (rows.length) {
            let msg = rows.reduce((str, item) => {
                return str + `${item.name} `;
            }, '');
            return next(apiError.badRequest(msg));
        }
        try {
            let cinema = await models.Cinema.findOne({
                where: {
                    id: cinemaId,
                },
                include: [
                    {
                        model: models.CinemaCluster,
                        where: {
                            id: clusterId,
                        },
                        include: {
                            model: models.CinemaSystem,
                            where: {
                                id: systemId,
                            },
                        },
                    },
                ],
            });
            if (!cinema) {
                return next(apiError.badRequest('Vui lòng kiểm tra lại hệ thống rạp, cụm rạp, rạp.'));
            }
        } catch (err) {
            next(err);
        }
    }
    isValidTimeStart(req, res, next) {
        // req.body.timeStart = ['2021/06/10 13:00', '2021/06/08 15:00'];
		// req.body.timeStart = ['2021-06-08 16:00:00'];
        let timeStarts = req.body.timeStart;
        if (!timeStarts?.length) {
            return next(apiError.badRequest('Vui lòng chọn thời gian bắt đầu của suất chiếu'));
        }
        let now = helper.convertUTCDateToLocalDate(new Date());

        let validTimeStart = timeStarts.filter((timeStart) => {
            let time = helper.convertUTCDateToLocalDate(new Date(timeStart));
            return time.getTime() >= now.getTime();
        });
        let invalidTimeStart = timeStarts.filter((timeStart) => {
            let time = helper.convertUTCDateToLocalDate(new Date(timeStart));
            return time.getTime() < now.getTime();
        });
        if (validTimeStart.length) {
            req.body.timeStart = validTimeStart;
            req.invalidTimeStart = invalidTimeStart;
            return next();
        } else {
            return next(apiError.badRequest('Thời gian chiếu không hợp lệ (thời gian đã qua) ' + invalidTimeStart.join(' ')));
        }
    }
}
module.exports = new ShowtimesMiddleware();
