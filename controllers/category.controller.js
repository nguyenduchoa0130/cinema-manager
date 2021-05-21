const { Op } = require('sequelize');
const helper = require('../config/helper');
const { Category: CategoryModel } = require('../models/index').sequelize.models;
const errorType = require('../config/errorType');
class Category {
    fetchAll(req, res, next) {
        try {
            let categories = await CategoryModel.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                },
            });
            res.json(helper.success('Thao tác thành công', categories));
        } catch (err) {
            next();
        }
    }
    fetchByIdOrName(req, res, next) {
        try {
            let category;
            let params = req.params.id;
            if (+params > 0) {
                category = await CategoryModel.findByPk(params);
            } else {
                category = await CategoryModel.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${params}%`,
                        },
                    },
                    attributes: {
                        exclude: helper.ignoreColumns('createdAt', 'updatedAt'),
                    },
                });
            }
            if (category?.length || category) {
                res.json(helper.success('Thao tác thành công', category));
            } else {
                res.json(helper.success('Không tìm thấy danh mục trên', null));
            }
        } catch (err) {
            next();
        }
    }
    async add(req, res, next) {
        try {
            let name = req.body;
            let categories = await CategoryModel.findAll({
                where: {
                    name: {
                        [Op.iLike]: name,
                    },
                },
            });
            if (categories.length) {
                return res.json(helper.error(errorType.INFO_WAS_EXISTS, 'Danh mục phim đã tồn tại!'));
            } else {
                await Categories.create({ name });
                return res.json(helper.success('Tạo thành công', null));
            }
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            let categoryId = +req.params.id;
            if (!categoryId) {
                return res.json(helper.error(errorType.INFO_NOT_VALID, 'ID truyền vào không hợp lệ'));
            }
            let category = await CategoryModel.findByPk(categoryId);
            if (!category) {
                return res.json(helper.error(errorType.BAD_REQ, 'Danh mục phim không tồn tại'));
            } else {
                category.name = req.body.name;
                await category.save();
                res.json(helper.success('Cập nhập thành công', null));
            }
        } catch (err) {
            next(err);
        }
    }
    delete(req, res, next) {
        try {
            let categoryId = +req.params.id;
            if (!categoryId) {
                return res.json(helper.error(errorType.INFO_NOT_VALID, 'ID truyền vào không hợp lệ'));
            }
            if (!category) {
                return res.json(helper.error(errorType.BAD_REQ, 'Danh mục phim không tồn tại'));
            } else {
                await category.destroy();
                res.json(helper.success('Xóa thành công', null));
            }
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new Category();
