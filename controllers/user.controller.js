const { User: UserModel } = require('../models/index').sequelize.models;
const { Op } = require('sequelize');
const helper = require('../config/helper');
const errorType = require('../config/errorType');
class UserController {
    isIdValid(req, res, next) {
        let id = +req.params.id;
        if (id) {
            return next();
        } else {
            return res.json(
                helper.error(
                    errorType.INFO_NOT_VALID,
                    'Id truyền vào không hợp lệ !'
                )
            );
        }
    }
    async fetchAll(req, res, next) {
        try {
            let users = await UserModel.findAll({
                attributes: {
                    exclude: helper.ignoreColumns(
                        'refreshToken',
                        'createdAt',
                        'updatedAt'
                    ),
                },
            });
            if (users.length) {
                return res.json(
                    helper.success('Lấy dữ liệu thành công', users)
                );
            } else {
                return res.json(helper.success('Không có dữ liệu', null));
            }
        } catch (err) {
            next(err);
        }
    }
    async fetchByIdOrEmail(req, res, next) {
        let param = req.params.id;
        try {
            let user = await UserModel.findOne({
                where: {
                    [Op.or]: [{ id: +param ? +param : -1 }, { email: param }],
                },
                attributes: {
                    exclude: ['refreshToken', 'createdAt', 'updatedAt'],
                },
            });
            if (user) {
                return res
                    .status(200)
                    .json(helper.success('Lấy dữ liệu thành công', user));
            } else {
                return res
                    .status(200)
                    .json(helper.success('Không có dữ liệu', null));
            }
        } catch (err) {
            return next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        let data = req.body;
        try {
            let user = await UserModel.findByPk(id);
            for (let prop in data) {
                user[prop] = data[prop];
            }
            await user.save();
            res.status(200).json(helper.success('Cập nhập thành công', null));
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        let id = req.params.id;
        if (req.dataToken.userId == id) {
            return res
                .status(401)
                .json(
                    helper.error(
                        errorType.BAD_REQ,
                        'Không thể xóa tài khoản của chính mình'
                    )
                );
        }
        try {
            let user = await UserModel.findByPk(id);
            if (user) {
                await user.destroy();
                return res
                    .status(200)
                    .json(helper.success('Xóa thành công', null));
            } else {
                return res.json(
                    helper.success('Người dùng không tồn tại', null)
                );
            }
        } catch (err) {
            return next(err);
        }
    }
}
module.exports = new UserController();
