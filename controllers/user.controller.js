const { Noti } = require('../config/lib');
const { User: UserModel } = require('../models/index').sequelize.models;
class UserController {
    isIdValid(req, res, next) {
        let id = +req.params.id;
        if (id) {
            return next();
        } else {
            return res.status(400).json(new Noti(false, 'Id is not valid', null));
        }
    }
    async fetchAll(req, res, next) {
        try {
            let users = await UserModel.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
            if (users.length) {
                return res.status(200).json(
                    new Noti(true, 'Fetch successfully', {
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
    async fetchById(req, res, next) {
        let id = +req.params.id;
        try {
            let user = await UserModel.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
            if (user) {
                return res.status(200).json(
                    new Noti(true, 'Fetch successfully', {
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
        res.json({
            method: req.method,
        });
    }
    async delete(req, res, next) {
        let id = req.params.id;
        try {
            let user = await UserModel.findByPk(id);
            if (user) {
                await user.destroy();
                return res.status(200).json(
                    new Noti(true, 'Delete successfully', null)
                );
            } else {
                return res.status(400).json(new Noti(false, "User isn't exists", null));
            }
        } catch (err) {
            return next(err);
        }
    }
}
module.exports = new UserController();
