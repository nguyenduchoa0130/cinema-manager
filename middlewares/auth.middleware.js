const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const helper = require('../config/helper');
const models = require('../models/index').sequelize.models;
const apiError = require('../errors/apiError');
class AuthenticationMiddleware {
    isNotSignedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return next(apiError.badRequest('Người dùng đã đăng nhập'));
        }
    }
    isSignedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return next(apiError.badRequest('Người dùng chưa đăng nhập'));
        }
    }
    isAdmin(req, res, next) {
        if (req.dataToken.isAdmin) {
            return next();
        } else return next(apiError.notAuthorized('Chức năng chỉ dành cho quản trị viên'));
    }
    isOwnerOrAdmin(req, res, next) {
        if (req.dataToken.userId == req.params.id || req.dataToken.isAdmin) {
            return next();
        } else return next(apiError.notAuthorized('Bạn không thể thực hiện chức năng này do không có quyền!'));
    }
    authenticate(req, res, next) {
        try {
            let token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return next(apiError.notAuthorized('Vui lòng đăng nhập để thực hiện chức năng này'));
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_SERCET || 'accessToken', (err, data) => {
                if (err) {
                    if (err.name == 'JsonWebTokenError') {
                        return next(apiError.badRequest('Token không hợp lệ. Vui lòng đăng nhập để xác thực người dùng'));
                    }
                    if (err.name == 'TokenExpiredError') {
                        return next(apiError.badRequest('Token đã hết hạn. Vui lòng đăng nhập lại'));
                    }
                } else {
                    req.dataToken = data;
                    return next();
                }
            });
        } catch (err) {
            return next(err);
        }
    }
    async isValidEmail(req, res, next) {
        let email = req.body.email;
        let response = await helper.isValidEmail(email);
        if (response) {
            return next();
        } else {
            return next(apiError.badRequest('Email không hợp lệ'));
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
                return next(apiError.conflict('Email đã được sử dụng, vui lòng nhập email khác'));
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
                helper.error(apiError.badRequest('Tài khoản chưa được kích hoạt, vui lòng kích hoạt tài khoản để tiếp tực thực hiện chức năng'))
            );
        }
    }
    async isNotActive(req, res, next) {
        if (!req.dataToken.isActive) {
            return next();
        } else {
            return next(apiError.badRequest('Tài khoản không thể  kích hoạt lại !'));
        }
    }
}
module.exports = new AuthenticationMiddleware();
