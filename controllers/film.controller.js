const { Op } = require('sequelize');
const sequelize = require('sequelize');
const models = require('../models/index').sequelize.models;
const helper = require('../config/helper');
const apiError = require('../errors/apiError');
class FilmController {
    async fetchAll(req, res, next) {
        try {
            let films = await models.Film.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                include: [
                    {
                        model: models.Category,
                    },
                ],
            });
            if (!films.length) {
                return next(apiError.notFound('Không tìm thấy kết quả nào'));
            } else {
                return res.json({
                    msg: `Tìm thầy ${films.length} kết quả`,
                    films,
                });
            }
        } catch (err) {
            next(err);
        }
    }
    async fetchFilmByKey(req, res, next) {
        let key = req.query.key ?? null;
        try {
            let data = await models.Film.findAll({ include: models.Category });
            let films = data.filter((film) => {
                let {
                    filmName,
                    country,
                    director,
                    actors,
                    Category: { categoryName },
                } = film;
                let dataTMP = [filmName, country, director, actors, categoryName];
                for (let i = 0; i < dataTMP.length; i++) {
                    dataTMP[i] = helper.removeAccents(dataTMP[i]).trim().toLowerCase();
                }
                let joinStr = dataTMP.join(' ');
                return joinStr.includes(key);
            });
            if (!films.length) return next(apiError.notFound('Không tìm thấy kết quả nào phù hợp'));
            return res.json({ msg: `Tìm thầy ${films.length} kết quả`, films });
        } catch (err) {
            return next(err);
        }
    }
    async fetchById(req, res, next) {
        try {
            let id = req.params.id;
            if (helper.isValidID(id)) {
                let film = await models.Film.findByPk(id, {
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                    include: models.Category,
                });
                if (!film) {
                    return next(apiError.notFound('Không tìm thấy kết quả nào'));
                } else {
                    return res.json({
                        msg: `Tìm thầy kết quả`,
                        film,
                    });
                }
            } else return next(apiError.badRequest('Lỗi: ID truyền vào không hợp lệ'));
        } catch (err) {
            return next(err);
        }
    }
    async fetchByCategoryId(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID truyền vào không hợp lệ'));
        try {
            let films = await models.Film.findAll({
                where: {
                    categoryId: id,
                },
                include: models.Category,
            });
            if (!films.length) return next(apiError.notFound('Không tìm thấy kết quả nào phù hợp'));
            return res.json({ msg: `Tìm thầy ${films.length} kết quả`, films });
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
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID không hợp lệ'));
        try {
            let [film, img] = await Promise.all([models.Film.findByPk(id), models.Image.findOne({ where: { filmId: id } })]);
            if (!film) return next(apiError.notFound('Không tìm thấy film'));
            let dataFilm = req.body; // lấy dữ liệu từ
            let dataImg = null;
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
