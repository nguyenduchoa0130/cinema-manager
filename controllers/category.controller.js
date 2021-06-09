const { Op } = require('sequelize');
const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const apiError = require('../errors/apiError');
class CategoryController {
    async fetchAll(req, res, next) {
        let page = req.query.page ? parseInt(req.query.page) : null;
        let limit = req.query.limit ? parseInt(req.query.limit) : null;
        let offset = page ? (page - 1) * limit : null;
        try {
            let categories = await models.Category.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
                order: [['id', 'ASC']],
                limit,
                offset,
            });
            if (!categories.length) return next(apiError.notFound('Không tìm thấy danh mục nào'));
            return res.json({ categories });
        } catch (err) {
            next(err);
        }
    }
    async fetchById(req, res, next) {
        let id = req.query.id;
        if (!id) return next();
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID danh mục không hợp lệ'));
        try {
            let category = await models.Category.findByPk(id, {
                attributes: { exclude: helper.ignoreColumns('createdAt', 'updatedAt') },
            });
            if (!category) return next(apiError.notFound('Không tìm thấy danh mục'));
            return res.json({ category });
        } catch (err) {
            next(err);
        }
    }
    async fetchByName(req, res, next) {
        let name = req.query.name;
        let page = req.query.page ? parseInt(req.query.page) : null;
        let limit = req.query.limit ? parseInt(req.query.limit) : 8;
        let offset = page ? (page - 1) * limit : null;
        if (!name) return next();
        if (!name.length) return next(apiError.badRequest('Tên danh mục không hợp lệ'));
        try {
            let rows = await models.Category.findAll({
                attributes: { exclude: helper.ignoreColumns('createdAt', 'updatedAt') },
                order: [['id', 'ASC']],
                limit,
                offset,
            });
            let categories = rows.filter((category) => {
                let nameTmp = helper.removeAccents(category.categoryName);
                let key = helper.removeAccents(name);
                return nameTmp.includes(key);
            });
            if (!categories.length) return next(apiError.notFound('Không tìm thấy danh mục phim có liên quan tới ' + name));
            return res.json({ categories });
        } catch (err) {
            next(err);
        }
    }
    async add(req, res, next) {
        try {
            let data = req.body;
            let name = data.categoryName.trim().toLowerCase();
            let categories = await models.Category.findAll({
                where: {
                    categoryName: sequelize.where(sequelize.fn('LOWER', sequelize.col('categoryName')), 'LIKE', `${name}`),
                },
            });
            if (categories.length) {
                return next(apiError.conflict('Danh mục phim đã tồn tại'));
            } else {
                let category = await models.Category.create(data);
                return res.json({ msg: 'Tạo danh mục thành công', category });
            }
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        let data = req.body;
        try {
            let name = data.categoryName.trim().toLowerCase();
            let rows = await models.Category.findAll({
                where: { categoryName: sequelize.where(sequelize.fn('LOWER', sequelize.col('categoryName')), 'LIKE', `${name}`) },
            });
            if (rows.length) return next(apiError.conflict('Tên danh mục đã tồn tại'));
            let row = await models.Category.update({ ...data }, { where: { id } });
            if (!row[0]) return next(apiError.notFound('Cập nhật không thành công do danh mục phim không tồn tại'));
            else return res.json({ msg: 'Cập nhật danh mục phim thành công' });
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        let id = req.params.id;
        try {
            let rows = await models.Category.destroy({ where: { id } });
            if (!rows) return next(apiError.notFound('Xóa không thành công. Không tìm thấy danh mục phim trên'));
            return res.json({ msg: 'Xóa danh mục phim thành công' });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new CategoryController();
