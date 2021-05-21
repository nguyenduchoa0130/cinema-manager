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
            return next(helper.error(errorType.BAD_REQ, 'Người dùng đã đăng nhập'));
        }
    }
    isSignedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return next(helper.error(errorType.BAD_REQ, 'Người dùng chưa đăng nhập'));
        }
    }
    isAdmin(req, res, next) {
        if (req.dataToken.isAdmin) {
            return next();
        } else return next(helper.error(errorType.NOT_AUTHORIZATION, 'Chức năng chỉ dành cho quản trị viên', 401));
    }
    isOwnerOrAdmin(req, res, next) {
        if (req.dataToken.userId == req.params.id || req.dataToken.isAdmin) {
            return next();
        } else return next(helper.error(errorType.NOT_AUTHORIZATION, 'Bạn không thể thực hiện chức năng này do không có quyền!', 401));
    }
    authenticate(req, res, next) {
        try {
            let token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return next(helper.error(errorType.NOT_AUTHORIZATION, 'Không thể chức năng này vì không xác thực được người dùng'));
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_SERCET || 'accessToken', (err, data) => {
                if (err) {
                    if (err.name == 'JsonWebTokenError') {
                        return next(helper.error(errorType.NOT_AUTHORIZATION, 'Token không hợp lệ', 401));
                    }
                    if (err.name == 'TokenExpiredError') {
                        return next(helper.error(errorType.NOT_AUTHORIZATION, 'Token đã hết hạn. Vui lòng đăng nhập lại', 401));
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
            return next(helper.error(errorType.INFO_NOT_VALID, 'Email không hợp lệ'));
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
                return next(helper.error(errorType.INFO_WAS_EXISTS, 'Email đã được sử dụng, vui lòng nhập email khác'));
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
            return next(helper.error(errorType.BAD_REQ, 'Tài khoản không thể  kích hoạt lại !'));
        }
    }
}
module.exports = new AuthenticationMiddleware();
