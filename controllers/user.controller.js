const { CustomNotication } = require('../config/helper');
const { User: UserModel } = require('../models/index').sequelize.models;
const { Op } = require('sequelize');
const ERROR = require('../config/errorDescription');
class UserController {
    isIdValid(req, res, next) {
        let id = +req.params.id;
        if (id) {
            return next();
        } else {
            return res
                .status(400)
                .json(
                    new CustomNotication(
                        false,
                        ERROR.ID_NOT_VALID,
                        'ID người dùng không hợp lệ',
                        null
                    )
                );
        }
    }
    async fetchAll(req, res, next) {
        try {
            let users = await UserModel.findAll({
                attributes: {
                    exclude: ['refreshToken', 'createdAt', 'updatedAt'],
                },
            });
            if (users.length) {
                return res.status(200).json(
                    new CustomNotication(
                        true,
                        null,
                        `Lấy dữ liệu thành công. Tìm thấy ${users.length} người dùng`,
                        {
                            users,
                        }
                    )
                );
            } else {
                return res
                    .status(200)
                    .json(
                        new CustomNotication(
                            true,
                            null,
                            'Không có dữ liệu',
                            null
                        )
                    );
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
                return res.status(200).json(
                    new CustomNotication(true, null, 'Lấy dữ liệu thành công', {
                        user,
                    })
                );
            } else {
                return res
                    .status(200)
                    .json(
                        new CustomNotication(
                            true,
                            null,
                            'Không có dữ liệu',
                            null
                        )
                    );
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
            res.status(200).json(
                new CustomNotication(true, null, 'Cập nhật thành cống', null)
            );
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
                    new CustomNotication(
                        false,
                        ERROR.NOT_AUTHORIZATED,
                        'Không thể xóa tài khoản của chính mình',
                        null
                    )
                );
        }
        try {
            let user = await UserModel.findByPk(id);
            if (user) {
                await user.destroy();
                return res
                    .status(200)
                    .json(
                        new CustomNotication(
                            true,
                            null,
                            'Xóa dữ liệu thành công',
                            null
                        )
                    );
            } else {
                return res
                    .status(400)
                    .json(
                        new CustomNotication(
                            false,
                            ERROR.NO_DATA,
                            'Người dùng không tồn tại',
                            null
                        )
                    );
            }
        } catch (err) {
            return next(err);
        }
    }
}
module.exports = new UserController();
