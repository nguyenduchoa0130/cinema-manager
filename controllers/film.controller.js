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
        if (!key) return next();
        try {
            let data = await models.Film.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
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
                raw: true,
            });
            let films = data.filter((film) => {
                let { filmName, country, director, actors } = film;
                let dataTMP = [filmName, country, director, actors];
                for (let i = 0; i < dataTMP.length; i++) {
                    dataTMP[i] = helper.removeAccents(dataTMP[i]).trim().toLowerCase();
                }
                let joinStr = dataTMP.join(' ');
                return joinStr.includes(key);
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
                let film = await models.Film.findByPk(id, {
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
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
                    raw: true,
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
        if (!cate) return next();
        let id = Math.abs(Math.floor(parseInt(cate))) ? Math.abs(Math.floor(parseInt(cate))) : -1;
        try {
            let films = await models.Film.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
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
                        where: {
                            [Op.or]: [
                                { id },
                                { categoryName: sequelize.where(sequelize.fn('LOWER', sequelize.col('categoryName')), 'LIKE', `%${cate}%`) },
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
        if (!status) return next();
        try {
            let films = await models.Film.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                include: [
                    {
                        model: models.StatusFilm,
                        require: true,
                        attributes: [['statusName', 'name']],
                        where: {
                            [Op.or]: [
                                { id: status },
                                { statusName: sequelize.where(sequelize.fn('LOWER', sequelize.col('statusName')), 'LIKE', `%${status}%`) },
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
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID không hợp lệ'));
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
