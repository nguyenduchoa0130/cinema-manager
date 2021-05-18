const { User: UserModel, OTP: OTPModel } =
    require('../models/index').sequelize.models;
const { send } = require('../config/nodemailer');
const helper = require('../config/helper');
const errorType = require('../config/errorType');
const bcrypt = require('bcrypt');
const passport = require('passport');
class AuthController {
    async handleSignIn(req, res, next) {
        passport.authenticate('local', (err, user) => {
            if (err) return next(err);
            if (!user)
                return res.json(
                    helper.error(
                        errorType.INFO_NOT_VALID,
                        'Email hoặc mật khẩu không chính xác'
                    )
                ); // Thông tin hoặc mật khẩu không chính xác
            // Login thành công
            req.login(user, async (err) => {
                if (err) {
                    return next(err);
                }
                let accessToken = helper.createAccessToken(user);
                return res.status(200).json({
                    userId: user.id,
                    isAdmin: user.roleId == 1 ? true : false,
                    isActive: user.isActive ? true : false,
                    accessToken,
                });
            });
        })(req, res, next); // important!
    }
    async handleSignUp(req, res, next) {
        try {
            let data = req.body;
			data.password = await bcrypt.hash(data.password, 10);
            if (
                await UserModel.findOne({
                    where: {
                        email: data.email,
                    },
                })
            ) {
                res.json(
                    helper.error(
                        errorType.INFO_WAS_EXISTS,
                        'Tài khoản đã tồn tại. Vui lòng nhập nhập 1 email khác 1'
                    )
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
                    helper.success('Đăng Ký Thành Công', { userId: user.id })
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
                        helper.success(
                            'Một mã kích hoạt đã được gửi tới ' + otp.email,
                            null
                        )
                    );
            } else {
                res.status(400).json(
                    helper.error(
                        errorType.BAD_REQ,
                        'Không thể xử lý yêu cầu của bạn'
                    )
                );
            }
        } catch (err) {
            next(err);
        }
    }
    // async handleFacebook(req, res, next) {
    //     passport.authenticate('facebook');
    // }
    // async handleFacebookCallBack(req, res, next) {
    //     passport.authenticate('facebook', (err, user, info) => {
    //         if (err) {
    //             return next(err);
    //         }
    //         if (!user) {
    //             return res
    //                 .status(403)
    //                 .json(new CustomNotication(false, 'Login failed', null));
    //         }
    //         return res.status(200).json({
    //             user,
    //             info,
    //         });
    //     })(req, res, next);
    // }
    async activeAccount(req, res, next) {
        try {
			let userId = req.params.id;
            let { code } = req.body;
            let otp = await OTPModel.findOne({
                where: {
                    userId,
                },
            });
            if (!otp) {
                return res.json(
                    helper.error(errorType.BAD_REQ, 'Không có dữ liệu')
                );
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
                        helper.success('Đăng ký thành công', null)
                    );
                } else {
                    res.status(403).json(
                        helper.error(
                            errorType.INFO_NOT_VALID,
                            'Mã OTP không đúng'
                        )
                    );
                }
            }
        } catch (err) {
            next(err);
        }
    }
    async handleSignOut(req, res, next) {
        req.logout();
        res.status(200).json(helper.success('Đăng xuất thành công', null));
    }
}
module.exports = new AuthController();
