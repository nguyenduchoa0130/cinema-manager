const { signals, Noti } = require('../config/notification');
const { User: UserModel } = require('../models/index').sequelize.models;
class UserController {
    isIdValid(req, res, next) {
        let id = +req.params.id;
        if (id) {
            return next();
        } else {
            res.status(400).json(
                new Noti(false, signals.FAILED, 'Id is not valid', null)
            );
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
                res.status(200).json(
                    new Noti(true, signals.SUCCESSFULL, 'Fetch successfully', {
                        users,
                    })
                );
            } else {
                res.status(200).json(
                    new Noti(true, signals.SUCCESSFULL, 'No data', null)
                );
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
                res.status(200).json(
                    new Noti(true, signals.SUCCESSFULL, 'Fetch successfully', {
                        user,
                    })
                );
            } else {
                res.status(200).json(
                    new Noti(true, signals.SUCCESSFULL, 'No data', null)
                );
            }
        } catch (err) {
            next(err);
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
                res.status(200).json(
                    new Noti(
                        true,
                        signals.SUCCESSFULL,
                        'Delete successfully',
                        null
                    )
                );
            } else {
                res.status(400).json(
                    new Noti(false, signals.FAILED, 'Delete failed', null)
                );
            }
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new UserController();
