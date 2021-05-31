const { User: UserModel } = require('../models/index').sequelize.models;
const { Op } = require('sequelize');
const helper = require('../config/helper');
const bcrypt = require('bcrypt');
const apiError = require('../errors/apiError');
class UserController {
    async fetchAll(req, res, next) {
        try {
            let users = await UserModel.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('refreshToken', 'createdAt', 'updatedAt'),
                },
            });
            if (users.length) {
                return res.json({
                    msg: 'Lấy dữ liệu thành công',
                    users,
                });
            } else {
                return next(apiError.notFound('Không tìm thầy người dùng nào'));
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
                return res.json({
                    msg: 'Lấy dữ liệu thành công',
                    users,
                });
            } else {
                return next(apiError.notFound('Không tìm thầy người dùng!'));
            }
        } catch (err) {
            return next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID truyền vào không hợp lệ!!'));
        let data = req.body;
        if ('password' in data) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        try {
            let user = await UserModel.findByPk(id);
            for (let prop in data) {
                user[prop] = data[prop];
            }
            await user.save();
            return res.status(200).json({ msg: 'Cập nhật thành công' });
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID) return next(apiError.badRequest('ID không hợp lệ'));
        if (req.dataToken.userId == id) {
            return next(apiError.notAuthorized('Không thể xóa tài khoản của chính mình'));
        }
        try {
            let user = await UserModel.findByPk(id);
            if (user) {
                await user.destroy();
                return res.status(200).json({ msg: 'Xóa thành công' });
            } else {
                return next(apiError.notFound('Người dùng không tồn tại'));
            }
        } catch (err) {
            return next(err);
        }
    }
}
module.exports = new UserController();
