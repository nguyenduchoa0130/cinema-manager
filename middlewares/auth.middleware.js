const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const helper = require('../config/helper');
const errorType = require('../config/errorType');
const { User: UserModel } = require('../models/index').sequelize.models;
class AuthenticationMiddleware {
    isNotSignedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return next(
                helper.error(400, errorType.BAD_REQ, 'Người dùng đã đăng nhập')
            );
        }
    }
    isSignedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return next(
                helper.error(
                    400,
                    errorType.BAD_REQ,
                    'Người dùng chưa đăng nhập'
                )
            );
        }
    }
    isAdmin(req, res, next) {
        if (req.dataToken.isAdmin) {
            return next();
        } else
            return next(
                helper.error(
                    errorType.NOT_AUTHORIZATION,
                    'Chức năng chỉ dành cho quản trị viên'
                )
            );
    }
    isOwnerOrAdmin(req, res, next) {
        if (req.dataToken.userId == req.params.id || req.dataToken.isAdmin) {
            return next();
        } else
            return next(
                helper.error(
                    401,
                    errorType.NOT_AUTHORIZATION,
                    'Bạn không thể thực hiện chức năng này!'
                )
            );
    }
    authenticate(req, res, next) {
        try {
            let token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return next(
                    helper.error(
                        400,
                        errorType.NOT_AUTHORIZATION,
                        'Vui lòng đăng nhập để thực hiện chức năng'
                    )
                );
            }
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SERCET || 'accessToken',
                (err, data) => {
                    if (err) {
                        if (err.name == 'JsonWebTokenError') {
                            return next(
                                helper.error(
                                    401,
                                    errorType.NOT_AUTHORIZATION,
                                    'Token không hợp lệ'
                                )
                            );
                        }
                        if (err.name == 'TokenExpiredError') {
                            return next(
                                helper.error(
                                    401,
                                    errorType.NOT_AUTHORIZATION,
                                    'Token đã hết hạn. Vui lòng đăng nhập lại'
                                )
                            );
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
            return next(
                helper.error(
                    401,
                    errorType.INFO_NOT_VALID,
                    'Email không hợp lê'
                )
            );
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
                return next(
                    helper.error(
                        400,
                        errorType.INFO_WAS_EXISTS,
                        'Email đã được sử dụng, vui lòng nhập email khác'
                    )
                );
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
            return next(
                helper.error(
                    400,
                    errorType.BAD_REQ,
                    'Tài khoản chưa được kích hoạt, vui lòng kích hoạt tài khoản để tiếp tực thực hiện chức năng'
                )
            );
        }
    }
    async isNotActive(req, res, next) {
        if (!req.dataToken.isActive) {
            return next();
        } else {
            return next(
                helper.error(
                    400,
                    errorType.BAD_REQ,
                    'Tài khoản không thể  kích hoạt lại !'
                )
            );
        }
    }
}
module.exports = new AuthenticationMiddleware();
