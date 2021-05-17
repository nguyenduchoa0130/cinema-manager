const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { CustomNotication, isValidEmail } = require('../config/helper');
const ERROR = require('../config/errorDescription');
const { User: UserModel } = require('../models/index').sequelize.models;
class AuthenticationMiddleware {
    isNotSignedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return res
                .status(403)
                .json(
                    new CustomNotication(
                        false,
                        ERROR.SIGNED_IN,
                        'Người dùng đã đăng nhập!',
                        null
                    )
                );
        }
    }
    isSignedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res
                .status(403)
                .json(
                    new CustomNotication(
                        false,
                        ERROR.NOT_SIGNED_IN,
                        'Người dùng chưa đăng nhập',
                        null
                    )
                );
        }
    }
    isAdmin(req, res, next) {
        if (req.dataToken.isAdmin) {
            return next();
        } else
            return res
                .status(401)
                .json(
                    new CustomNotication(
                        false,
                        ERROR.NOT_AUTHORIZATED,
                        'Chức năng chỉ dành cho quản trị viên',
                        null
                    )
                );
    }
    isOwnerOrAdmin(req, res, next) {
        if (req.dataToken.userId == req.params.id || req.dataToken.isAdmin) {
            return next();
        } else
            return res
                .status(401)
                .json(
                    new CustomNotication(
                        false,
                        ERROR.NOT_AUTHORIZATED,
                        'Bạn không đủ quyền để thực hiện chức năng này',
                        null
                    )
                );
    }
    authenticate(req, res, next) {
        try {
            let token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res
                    .status(401)
                    .json(
                        new CustomNotication(
                            false,
                            ERROR.NOT_SIGNED_IN,
                            'Bạn chưa đăng nhập',
                            null
                        )
                    );
            }
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SERCET || 'accessToken',
                (err, data) => {
                    if (err) {
                        if (err.name == 'JsonWebTokenError') {
                            return res
                                .status(401)
                                .json(
                                    new CustomNotication(
                                        false,
                                        ERROR.TOKEN_KHONG_HOP_LE,
                                        'Token không hợp lệ!',
                                        null
                                    )
                                );
                        }
                        if (err.name == 'TokenExpiredError') {
                            return res
                                .status(403)
                                .json(
                                    new CustomNotication(
                                        false,
                                        ERROR.TOKEN_HET_HAN,
                                        'Phiên đã hết hạn vui lòng đăng nhập',
                                        null
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
        let response = await isValidEmail(email);
        if (response) {
            return next();
        } else {
            return res
                .status(403)
                .json(
                    new CustomNotication(
                        false,
                        ERROR.EMAIL_NOT_VALID,
                        'Email không hợp lệ',
                        null
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
                return res
                    .status(403)
                    .json(
                        new CustomNotication(
                            false,
                            ERROR.EXIST,
                            'Tài khoản dã tồn tại, vui lòng nhập 1 email khác!',
                            null
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
            return res
                .status(403)
                .json(
                    new CustomNotication(
                        false,
                        ERROR.NOT_ACTIVE,
                        'Tài khoản của chưa được kích hoạt, vui lòng kích hoạt tài khoản',
                        null
                    )
                );
        }
    }
    async isNotActive(req, res, next) {
        if (!req.dataToken.isActive) {
            return next();
        } else {
            return res
                .status(400)
                .json(
                    new CustomNotication(
                        false,
                        ERROR.ACTIVED,
                        'Bạn đã kích hoạt tài khoản',
                        null
                    )
                );
        }
    }
}
module.exports = new AuthenticationMiddleware();
