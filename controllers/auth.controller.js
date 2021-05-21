const { User: UserModel, OTP: OTPModel } = require('../models/index').sequelize.models;
const { send } = require('../config/nodemailer');
const helper = require('../config/helper');
const errorType = require('../config/errorType');
const bcrypt = require('bcrypt');
const passport = require('passport');
class AuthController {
    async handleSignIn(req, res, next) {
        passport.authenticate('local', (err, user) => {
            if (err) return next(err); // lỗi server
            if (!user) {
                return next(helper.error(errorType.INFO_NOT_VALID, 'Email hoặc mật khẩu không chính xác', 404));
            }
            req.login(user, async (err) => {
                if (err) {
                    return next(err);
                }
                let accessToken = helper.createAccessToken(user);
                return res.status(200).json({
                    userId: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    phone: user.phone,
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
            let account = await UserModel.findOne({
                where: {
                    email: data.email,
                },
            });
            if (account) {
                return next(helper.error(errorType.INFO_WAS_EXISTS, 'Email đã được sử dụng cho 1 tài khoản khác'));
            } else {
                let user = await UserModel.create(data);
                let code = Math.floor(100000 + Math.random() * 900000);
                Promise.all([
                    OTPModel.create({
                        userId: user.id,
                        email: data.email,
                        code,
                    }),
                    send(data.email, 'Kích Hoạt Tài Khoản', `Mã kích hoạt: ${code}`),
                ]);

                return res
                    .status(200)
                    .json(helper.success('Đăng Ký Thành Công. Một OTP đã được gứi tới email ' + data.email, { userId: user.id }));
            }
        } catch (err) {
            return next(err);
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
                Promise.all([otp.save(), send(otp.email, 'Kích Hoạt Tài Khoản', `Mã kích hoạt của bạn là: ${code}`)]);
                return res.status(200).json(helper.success('Một mã kích hoạt đã được gửi tới ' + otp.email, null));
            } else {
                return next(helper.error(errorType.BAD_REQ, 'Không thể xử lý yêu cầu của bạn', 400));
            }
        } catch (err) {
            return next(err);
        }
    }
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
                    res.status(200).json(helper.success('Xác nhận OTP thành công', null));
                } else {
                    next(helper.error(errorType.INFO_NOT_VALID, 'Mã OTP không đúng!'));
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
    async forget(req, res, next) {
        try {
            let account = await UserModel.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (account) {
                let code = Math.floor(100000 + Math.random() * 999999);
                let otp = await OTPModel.findOne({
                    where: {
                        email: account.email,
                    },
                });
                if (otp) {
                    otp.code = code;
                    Promise.all([otp.save(), send(account.email, 'Reset Password', `OTP: ${code}`)]);
                } else {
                    Promise.all([
                        OTPModel.create({ userId: account.id, email: account.email, code }),
                        send(account.email, 'Reset Password', `OTP: ${code}`),
                    ]);
                }
                let accessToken = helper.createAccessToken(account);
                return res.json(helper.success(`1 email đã được gửi tới ${account.email}`, { userId: account.id, accessToken }));
            } else {
                return next(helper.error(errorType.INFO_NOT_VALID, 'Không tìm thấy tài khoản'));
            }
        } catch (err) {
            next(err);
        }
    }
    async reset(req, res, next) {
        try {
            let id = req.params.id;
            if (id == req.dataToken.userId) {
                let data = req.body;
                let row = await UserModel.update(
                    {
                        password: await bcrypt.hash(data.new_password, 10),
                    },
                    {
                        where: {
                            id,
                        },
                    }
                );
                if (row[0] == 0) {
                    return next(helper.error(errorType.INFO_NOT_VALID, 'Người dùng không tồn tại'));
                } else {
                    return res.json(helper.success('Cập nhật mật khẩu thành công', null));
                }
            } else {
                return res.json(helper.error(errorType.NOT_AUTHORIZATION, 'Bạn không đủ quyền để thực hiện chức năng này'));
            }
        } catch (err) {
            return next(err);
        }
    }
}
module.exports = new AuthController();
