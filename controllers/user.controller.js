const { Noti } = require('../config/lib');
const { User: UserModel } = require('../models/index').sequelize.models;
const { Op } = require('sequelize');
class UserController {
    isIdValid(req, res, next) {
        let id = +req.params.id;
        if (id) {
            return next();
        } else {
            return res
                .status(400)
                .json(new Noti(false, 'Id is not valid', null));
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
                    new Noti(true, `Execute successfully`, {
                        users,
                    })
                );
            } else {
                return res.status(200).json(new Noti(true, 'No data', null));
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
                    new Noti(true, '1 result was found', {
                        user,
                    })
                );
            } else {
                return res.status(200).json(new Noti(true, 'No data', null));
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
            res.status(200).json(new Noti(true, 'Update successfully', null));
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        let id = req.params.id;
        if (req.dataToken.userId == id) {
            return res.sendStatus(403);
        }
        try {
            let user = await UserModel.findByPk(id);
            if (user) {
                await user.destroy();
                return res
                    .status(200)
                    .json(new Noti(true, 'Delete successfully', null));
            } else {
                return res
                    .status(400)
                    .json(new Noti(false, "User isn't exists", null));
            }
        } catch (err) {
            return next(err);
        }
    }
}
module.exports = new UserController();
