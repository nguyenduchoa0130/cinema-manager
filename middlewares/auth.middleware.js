const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const helper = require('../config/helper');
const { User: UserModel } = require('../models/index').sequelize.models;
class AuthenticationMiddleware {
    isNotSignedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return res.send('Ban đã đăng nhập');
        }
    }
    isSignedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.send('Bạn chưa đăng nhập');
        }
    }
    isAdmin(req, res, next) {
        if (req.dataToken.isAdmin) {
            return next();
        } else return res.status(401).json({isSuccess: false, msg: 'Bạn không thể thực hiện chức năng này'})
    }
    isOwnerOrAdmin(req, res, next) {
		console.log(req.dataToken)
        if (req.dataToken.userId == req.params.id || req.dataToken.isAdmin) {
            return next();
        } else return res.sendStatus(401);
    }
    authenticate(req, res, next) {
        try {
            let token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.sendStatus(401);
            }
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SERCET || 'accessToken',
                (err, data) => {
                    if (err) {
                        if (err.name == 'JsonWebTokenError') {
                            return res.status(401).json({
                                err: 'TOKEN_KHONG_HOP_LE',
                                msg: 'Token không hợp lệ',
                            });
                        }
                        if (err.name == 'TokenExpiredError') {
                            return res.status(401).json({
                                err: 'TOKEN_HET_HAN',
                                msg: 'Token đã hết hạn, vui lòng đăng nhập lại',
                            });
                        }
                    } else {
                        req.dataToken = data;
                        return next();
                    }
                }
            );
        } catch (err) {
            return next(err);
        }
    }
    async filterInfo(req, res, next) {
        let user = req.body;
        for (let key in user) {
            user[key] = user[key].trim();
        }
        user.password = await bcrypt.hash(user.password, 10);
        return next();
    }
    async isValidEmail(req, res, next) {
        let email = req.body.email;
        let response = await helper.isValidEmail(email);
        if (response) {
            return next();
        } else {
            return res
                .status(403)
                .json(new helper.Noti(false, 'Email không tồn tại', null));
        }
    }
    async isExists(req, res, next) {
        try {
            let account = await UserModel.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (account) {
                return res
                    .status(403)
                    .json(new helper.Noti(false, 'Account was exists', null));
            } else {
                return next();
            }
        } catch (err) {
            next(err);
        }
    }
    async isActive(req, res, next) {
        if (req.dataToken.isActive) {
            return next();
        } else {
            return res.sendStatus(401);
        }
    }
    async isNotActive(req, res, next) {
        if (!req.dataToken.isActive) {
            return next();
        } else {
            return res.sendStatus(401);
        }
    }
}
module.exports = new AuthenticationMiddleware();
