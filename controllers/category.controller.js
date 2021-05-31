const { Op } = require('sequelize');
const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const sequelize = require('sequelize');
const apiError = require('../errors/apiError');
class Category {
    async fetchAll(req, res, next) {
        try {
            let categories = await CategoryModel.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
            });
            res.json(categories);
        } catch (err) {
            next(err);
        }
    }
    async fetchByIdOrName(req, res, next) {
        try {
            let category;
            let params = req.params.id;
            if (+params > 0) {
                category = await models.Category.findByPk(params, {
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                });
            } else {
                category = await models.Category.findAll({
                    where: {
                        categoryName: sequelize.where(sequelize.fn('LOWER', sequelize.col('categoryName')), 'LIKE', `%${params}%`),
                    },
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                });
            }
            if (category?.length || category) {
                return res.json({
                    msg: 'Tìm thành công',
                    category,
                });
            } else {
                return next(apiError.notFound('Không tìm thấy danh mục nào'));
            }
        } catch (err) {
            next(err);
        }
    }
    async add(req, res, next) {
        try {
            let categoryName = req.body.categoryName.toLowerCase();
            let categories = await models.Category.findAll({
                where: {
                    categoryName: sequelize.where(sequelize.fn('LOWER', sequelize.col('categoryName')), 'LIKE', `%${categoryName}%`),
                },
            });
            if (categories.length) {
                return next(apiError.conflict('Danh mục phim đã tồn tại'));
            } else {
                await models.Category.create({ categoryName });
                return res.json({
                    msg: 'Tạo danh mục thành công',
                });
            }
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            let categoryId = +req.params.id;
            if (!helper.isValidID(categoryId)) {
                return next(apiError.badRequest('ID không hợp lệ'));
            }
            let response = await Promise.all([
                models.Category.findByPk(categoryId),
                helper.isNameExist(CategoryModel, 'categoryName', req.body.categoryName),
            ]);
            if (!response[0]) {
                return next(apiError.notFound('Danh mục phim không có tồn tại'));
            } else if (response[1]) {
                return next(apiError.conflict('Tên danh mục đã tồn tại'));
            } else {
                response[0].categoryName = req.body.categoryName;
                await response[0].save();
                res.json({
                    msg: 'Cập nhập thành công',
                });
            }
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try {
            let categoryId = +req.params.id;
            if (!categoryId) {
                return next(apiError.badRequest('ID truyền vào không hợp lệ'));
            }
            let category = await models.Category.findByPk(categoryId);
            if (!category) {
                return next(apiError.notFound('Không tìm thất danh mục phim'));
            } else {
                await category.destroy();
                res.json({
                    msg: 'Xóa thành công',
                });
            }
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new Category();
