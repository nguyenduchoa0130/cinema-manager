const { User: UserModel, OTP: OTPModel } =
    require('../models/index').sequelize.models;
const { send } = require('../config/nodemailer');
const helper = require('../config/helper');
const bcrypt = require('bcrypt');
const passport = require('passport');
class AuthController {
    async handleSignIn(req, res, next) {
        passport.authenticate('local', (err, user) => {
            if (err) return next(err);
            if (!user)
                return res.status(403).json({
                    isSuccess: false,
                    msg: 'Email hoặc mật khẩu không chính xác',
                });
            // Login thành công
            req.login(user, async (err) => {
                if (err) {
                    return next(err);
                }
                let dataResponse = helper.createDataResponse(user);
                return res
                    .status(200)
                    .json(
                        new helper.Noti(
                            true,
                            'Đăng nhập thành công',
                            dataResponse
                        )
                    );
            });
        })(req, res, next); // important!
    }
    async handleSignUp(req, res, next) {
        try {
            let data = req.body;
            if (
                await UserModel.findOne({
                    where: {
                        email: data.email,
                    },
                })
            ) {
                res.status(403).json(
                    new helper.Noti(false, 'Tài khoản đã tồn tại', null)
                );
            } else {
                let user = await UserModel.create(data);
                let code = Math.floor(100000 + Math.random() * 900000);
                Promise.all([
                    OTPModel.create({
                        userId: user.id,
                        email: data.email,
                        code,
                    }),
                    send(
                        data.email,
                        'Kích Hoạt Tài Khoản',
                        `Mã kích hoạt: ${code}`
                    ),
                ]);

                res.status(200).json(
                    new helper.Noti(
                        true,
                        'Đăng ký thành công, 1 email đã được gửi tới ' +
                            data.email,
                        {
                            userId: user.id,
                        }
                    )
                );
            }
        } catch (err) {
            next(err);
        }
    }
    async sendOTP(req, res, next) {
        try {
            let otp = await OTPModel.findOne({
                where: {
                    userId: req.params.userId,
                },
            });
            if (otp) {
                let code = Math.floor(100000 + Math.random() * 900000);
                otp.code = code;
                Promise.all([
                    otp.save(),
                    send(
                        otp.email,
                        'Kích Hoạt Tài Khoản',
                        `Mã kích hoạt của bạn là: ${code}`
                    ),
                ]);
                return res
                    .status(200)
                    .json(
                        new helper.Noti(
                            true,
                            'Một mã kích hoạt đã được gửi tới ' + otp.email,
                            null
                        )
                    );
            } else {
                res.status(403).json(
                    new helper.Noti(
                        false,
                        'Yêu cầu kích hoạt không hợp lệ',
                        null
                    )
                );
            }
        } catch (err) {
            next(err);
        }
    }
    async handleFacebook(req, res, next) {
        passport.authenticate('facebook');
    }
    async handleFacebookCallBack(req, res, next) {
        passport.authenticate('facebook', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res
                    .status(403)
                    .json(new Noti(false, 'Login failed', null));
            }
            return res.status(200).json({
                user,
                info,
            });
        })(req, res, next);
    }
    async activeAccount(req, res, next) {
        try {
            let { userId, code } = req.body;
            let otp = await OTPModel.findOne({
                where: {
                    userId,
                },
            });
            if (!otp) {
                return res
                    .status(403)
                    .json(new helper.Noti(false, 'Không có dữ liệu', null));
            } else {
                if (code == otp.code) {
                    Promise.all([
                        otp.destroy(),
                        UserModel.update(
                            { isActive: true },
                            {
                                where: {
                                    id: userId,
                                },
                            }
                        ),
                    ]);
                    res.status(200).json(
                        new helper.Noti(
                            true,
                            'Kích hoạt tài khoản thành công. Vui lòng đăng nhập lại',
                            null
                        )
                    );
                } else {
                    res.status(403).json(
                        new helper.Noti(false, 'Mã kích hoạt không đúng', null)
                    );
                }
            }
        } catch (err) {
            next(err);
        }
    }
    async handleSignOut(req, res, next) {
        req.logout();
        res.status(200).json(
            new helper.Noti(true, 'Đăng xuất thành công', null)
        );
    }
}
module.exports = new AuthController();
