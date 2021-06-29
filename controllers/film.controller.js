const { Op } = require('sequelize');
const sequelize = require('sequelize');
const models = require('../models/index').sequelize.models;
const helper = require('../config/helper');
const apiError = require('../errors/apiError');
class FilmController {
    async fetchFilmHot(req, res, next) {
        try {
            let data = await models.Film.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                group: [
                    'Film.id',
                    'Showtimes.id',
                    'Showtimes.Bookings.id',
                    'Showtimes.Bookings.Tickets.id',
                    'Category.id',
                    'StatusFilm.id',
                ],
                order: [['count', 'ASC']],
                include: [
                    {
                        model: models.Category,
                        attributes: ['id', 'categoryName'],
                    },
                    {
                        model: models.StatusFilm,
                        attributes: ['id', 'statusName'],
                    },
                    {
                        model: models.Showtimes,
                        attributes: ['id'],
                        include: [
                            {
                                model: models.Booking,
                                attributes: ['id'],
                                include: [
                                    {
                                        model: models.Ticket,
                                        group: ['Bookings.id'],
                                        attributes: ['id'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            let extract = data.map((film) => {
                let numberOfTickets = film.Showtimes.reduce((total1, showtimes) => {
                    let total2 = showtimes.Bookings.reduce((total3, booking) => {
                        return total3 + booking.Tickets.length;
                    }, 0);
                    return total1 + total2;
                }, 0);
                return {
                    id: film.id,
                    numberOfTickets,
                };
            });
            let films = [];
            extract.forEach((item) => {
                let film = data.find((i) => {
                    return i.id == item.id;
                });
                films.push({
                    id: film.id,
                    filmName: film.filmName,
                    country: film.country,
                    releaseYear: film.releaseYear,
                    duration: film.duration,
                    director: film.director,
                    actors: film.actors,
                    thumbnail: film.thumbnail,
                    poster: film.poster,
                    premiere: film.premiere,
                    desc: film.desc,
                    categoryId: film.categoryId,
                    statusId: film.statusId,
                    'Category.name': film.Category.categoryName,
                    'StatusFilm.name': film.StatusFilm.statusName,
                    numberOfTickets: item.numberOfTickets,
                });
            });
            films = films.filter((item) => {
                return item.numberOfTickets > 0;
            });
            films.sort((a, b) => {
                return b.numberOfTickets - a.numberOfTickets;
            });
            return res.json({ films });
        } catch (err) {
            next(err);
        }
    }
    async fetchAll(req, res, next) {
        let page = req.query.page ? parseInt(req.query.page) : null;
        let limit = req.query.limit ? parseInt(req.query.limit) : null;
        let offset = page ? (page - 1) * limit : null;
        try {
            let films = await models.Film.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                order: [['id', 'ASC']],
                limit,
                offset,
                include: [
                    {
                        model: models.StatusFilm,
                        require: true,
                        attributes: [['statusName', 'name']],
                    },
                    {
                        model: models.Category,
                        require: true,
                        attributes: [['categoryName', 'name']],
                    },
                ],
                raw: true,
            });
            if (!films.length) {
                return next(apiError.notFound('Không tìm thấy kết quả nào'));
            } else {
                return res.json({ films });
            }
        } catch (err) {
            next(err);
        }
    }
    async fetchFilmByKey(req, res, next) {
        let key = req.query.key;
        let page = req.query.page ? parseInt(req.query.page) : null;
        let limit = req.query.limit ? parseInt(req.query.limit) : null;
        let offset = page ? (page - 1) * limit : null;
        if (!key) return next();
        try {
            let data = await models.Film.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                limit,
                offset,
                include: [
                    {
                        model: models.StatusFilm,
                        require: true,
                        attributes: [['statusName', 'name']],
                    },
                    {
                        model: models.Category,
                        require: true,
                        attributes: [['categoryName', 'name']],
                    },
                ],
                limit: limit ?? null,
                offset: offset ?? null,
                raw: true,
            });
            let films = data.filter((film) => {
                let { filmName, country, director, actors } = film;
                let dataTMP = [filmName, country, director, actors];
                for (let i = 0; i < dataTMP.length; i++) {
                    dataTMP[i] = helper.removeAccents(dataTMP[i]);
                }
                let joinStr = dataTMP.join(' ');
                return joinStr.includes(helper.removeAccents(key));
            });
            if (!films.length) return next(apiError.notFound('Không tìm thấy kết quả nào phù hợp'));
            return res.json({ films });
        } catch (err) {
            return next(err);
        }
    }
    async fetchById(req, res, next) {
        try {
            let id = req.params.id;
            if (helper.isValidID(id)) {
                let film = await models.Film.findOne({
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                    where: {
                        id,
                    },
                    include: [
                        {
                            model: models.StatusFilm,
                            require: true,
                            attributes: [['statusName', 'name']],
                        },
                        {
                            model: models.Category,
                            require: true,
                            attributes: [['categoryName', 'name']],
                        },
                    ],
                });
                if (!film) {
                    return next(apiError.notFound('Không tìm thấy kết quả nào'));
                } else {
                    return res.json({ film });
                }
            } else return next(apiError.badRequest('Lỗi: ID truyền vào không hợp lệ'));
        } catch (err) {
            return next(err);
        }
    }
    async fetchByCategory(req, res, next) {
        let cate = req.query.cate;
        if (!cate) {
            return next();
        }
        let page = req.query.page ? parseInt(req.query.page) : null;
        let limit = req.query.limit ? parseInt(req.query.limit) : null;
        let offset = page ? (page - 1) * limit : null;
        if (!cate) return next();
        let id = Math.abs(Math.floor(parseInt(cate))) ? Math.abs(Math.floor(parseInt(cate))) : -1;
        cate = cate.trim().toLowerCase();
        try {
            let films = await models.Film.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                order: [['id', 'ASC']],
                limit,
                offset,
                include: [
                    {
                        model: models.StatusFilm,
                        require: true,
                        attributes: [['statusName', 'name']],
                    },
                    {
                        model: models.Category,
                        require: true,
                        attributes: [['categoryName', 'name']],
                        where: {
                            [Op.or]: [
                                { id },
                                {
                                    categoryName: sequelize.where(
                                        sequelize.fn('LOWER', sequelize.col('categoryName')),
                                        'LIKE',
                                        `%${cate}%`
                                    ),
                                },
                            ],
                        },
                    },
                ],
                raw: true,
            });
            if (!films.length) return next(apiError.notFound('Không tìm thấy kết quả nào phù hợp'));
            return res.json({ films });
        } catch (err) {
            next(err);
        }
    }
    async fetchByStatus(req, res, next) {
        let status = req.query.status;
        if (!status) {
            return next();
        }
        let page = req.query.page ? parseInt(req.query.page) : null;
        let limit = req.query.limit ? parseInt(req.query.limit) : null;
        let offset = page ? (page - 1) * limit : null;
        if (!status) return next();
        try {
            let films = await models.Film.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                order: [['premiere', 'DESC']],
                limit,
                offset,
                include: [
                    {
                        model: models.StatusFilm,
                        require: true,
                        attributes: [['statusName', 'name']],
                        where: {
                            [Op.or]: [
                                { id: status },
                                {
                                    statusName: sequelize.where(
                                        sequelize.fn('LOWER', sequelize.col('statusName')),
                                        'LIKE',
                                        `%${status}%`
                                    ),
                                },
                            ],
                        },
                    },
                    {
                        model: models.Category,
                        require: true,
                        attributes: [['categoryName', 'name']],
                    },
                ],
                raw: true,
            });
            if (!films.length) return next(apiError.notFound('Không tìm thấy kết quả nào phù hợp'));
            return res.json({ films });
        } catch (err) {
            next(err);
        }
    }
    async add(req, res, next) {
        let img = null;
        try {
            if (Object.keys(req.files).length) {
                img = await models.Image.create({
                    thumbnail: req.files.thumbnail?.[0].buffer ?? null,
                    poster: req.files.poster?.[0].buffer ?? null,
                });
            }
            let film = await models.Film.create(req.body);
            if (img) {
                img.filmId = film.id;
                let src = helper.createSrc(film.id, img);
                film.poster = src.poster;
                film.thumbnail = src.thumbnail;
                Promise.all([img.save(), film.save()]);
            }
            res.status(200).json({
                msg: 'Thêm thành công',
                film,
            });
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        try {
            let [film, img] = await Promise.all([models.Film.findByPk(id), models.Image.findOne({ where: { filmId: id } })]);
            if (!film) return next(apiError.notFound('Không tìm thấy film'));
            let dataFilm = req.body; // lấy dữ liệu từ
            let dataImg = {};
            if (Object.keys(req.files).length) {
                dataImg.thumbnail = req.files.thumbnail?.[0].buffer ?? null;
                dataImg.poster = req.files.poster?.[0].buffer ?? null;
            }
            if (dataImg) {
                for (let prop in dataImg) {
                    img[prop] = dataImg[prop];
                }
            }
            for (let prop in dataFilm) {
                film[prop] = dataFilm[prop];
            }
            let src = helper.createSrc(film.id, img);
            film.poster = src.poster;
            film.thumbnail = src.thumbnail;
            if ('premiere' in dataFilm) {
                if (helper.compareNow(dataFilm.premiere)) {
                    film.statusId = 'SAP_CONG_CHIEU';
                } else {
                    film.statusId = 'DANG_CONG_CHIEU';
                }
            }
            await Promise.all([img.save(), film.save()]);
            res.json({ msg: 'Cập nhật thành công' });
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        let id = req.params.id;
        if (helper.isValidID(id)) {
            let rows = await models.Film.destroy({ where: { id } });
            if (rows) {
                return res.json({ msg: 'Xóa thành công' });
            } else {
                return next(apiError.notFound('Thao tác không thành công do bộ phim trên không tồn tại'));
            }
        } else {
            return next(apiError.badRequest('ID không hợp lệ'));
        }
    }
}
module.exports = new FilmController();
