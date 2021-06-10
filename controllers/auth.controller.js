const models = require('../models/index').sequelize.models;
const { send } = require('../config/nodemailer');
const helper = require('../config/helper');
const bcrypt = require('bcrypt');
const passport = require('passport');
const apiError = require('../errors/apiError');
class AuthController {
    async handleSignIn(req, res, next) {
        passport.authenticate('local', (err, user) => {
            if (err) return next(err); // lỗi server
            if (!user) {
                return next(apiError.forbidden('Email hoặc mật khẩu không chính xác'));
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
            let account = await models.User.findOne({ where: { email: data.email } });
            if (account) {
                return next(apiError.conflict('Email đã được sử dụng cho 1 tài khoản khác'));
            } else {
                let user = await models.User.create(data);
                let code = Math.floor(100000 + Math.random() * 900000);
                Promise.all([
                    models.OTP.create({
                        userId: user.id,
                        email: data.email,
                        code,
                    }),
                    send(data.email, 'Kích Hoạt Tài Khoản', `Mã kích hoạt: ${code}`),
                ]);
                return res
                    .status(200)
                    .json({ msg: 'Đăng Ký Thành Công. Một OTP đã được gứi tới email ' + data.email, userId: user.id });
            }
        } catch (err) {
            return next(err);
        }
    }
    async sendOTP(req, res, next) {
        try {
            let otp = await models.OTP.findOne({
                where: {
                    userId: req.params.userId,
                },
            });
            if (otp) {
                let code = Math.floor(100000 + Math.random() * 900000);
                otp.code = code;
                Promise.all([otp.save(), send(otp.email, 'Kích Hoạt Tài Khoản', `Mã kích hoạt của bạn là: ${code}`)]);
                return res.status(200).json({
                    msg: 'Một mã kích hoạt đã được gửi tới ' + otp.email,
                });
            } else {
                return next(apiError.notFound('Không tìm thấy dữ liệu'));
            }
        } catch (err) {
            return next(err);
        }
    }
    async activeAccount(req, res, next) {
        try {
            let userId = req.params.id;
            let { code } = req.body;
            let otp = await models.OTP.findOne({ where: { userId } });
            if (!otp) {
            } else {
                if (code == otp.code) {
                    Promise.all([
                        otp.destroy(),
                        models.User.update(
                            { isActive: true },
                            {
                                where: {
                                    id: userId,
                                },
                            }
                        ),
                    ]);
                    res.status(200).json({
                        msg: 'Xác nhận OTP thành công',
                    });
                } else {
                    return next(apiError.forbidden('Mã OTP không đúng'));
                }
            }
        } catch (err) {
            next(err);
        }
    }
    async handleSignOut(req, res, next) {
        req.session = null;
        req.logout();
        res.status(200).json({ msg: 'Đăng xuất thành công' });
    }
    async forget(req, res, next) {
        try {
            let account = await models.User.findOne({ where: { email: req.body.email } });
            if (account) {
                let code = Math.floor(100000 + Math.random() * 999999);
                let otp = await models.OTP.findOne({
                    where: {
                        email: account.email,
                    },
                });
                if (otp) {
                    otp.code = code;
                    Promise.all([otp.save(), send(account.email, 'Lấy lại mật khẩu', `OTP: ${code}`)]);
                } else {
                    Promise.all([
                        models.OTP.create({ userId: account.id, email: account.email, code }),
                        send(account.email, 'Lấy lại mật khẩu', `OTP: ${code}`),
                    ]);
                }
                let accessToken = helper.createAccessToken(account);
                return res.status(200).json({
                    msg: `1 email đã được gửi tới ${account.email}`,
                    userId: account.id,
                    accessToken,
                });
            } else {
                return next(apiError.notFound('Không tìm thấy tài khoản'));
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
                let row = await models.User.update(
                    {
                        password: await bcrypt.hash(data.new_password, 10),
                    },
                    {
                        where: {
                            id,
                        },
                    }
                );
                return res.json({ msg: 'Cập nhật mật khẩu thành công' });
            } else {
                return next(apiError.notAuthorized('Bạn không có quyền thực hiện chức năng này'));
            }
        } catch (err) {
            return next(err);
        }
    }
    async handleLoginFacebook(req, res, next) {
        res.header('Access-Control-Allow-Origin: *');
        res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        passport.authenticate('facebook', (err, user) => {
            let info;
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(apiError.notFound('Không tìm thấy tài khoản'));
            }
            if (user.isComplete && user.isExists) {
                req.login(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                });
                let User = user.user;
                let accessToken = helper.createAccessToken(User);
                info = {
                    userId: User.id,
                    email: User.email,
                    fullName: User.fullName,
                    phone: User.phone,
                    isAdmin: User.roleId == 1 ? true : false,
                    isActive: User.isActive ? true : false,
                    accessToken,
                };
            } else {
                info = {
                    ...user,
                };
            }
            let str = JSON.stringify(info);
            return res.status(302).redirect('/api/v1/auth/signin-fb?info=' + str);
        })(req, res, next);
    }
    async hanleCompleteUser(req, res, next) {
        const { isExists, isComplete, id, ...userInfo } = req.body;
        if (data.isExists) {
            data.password = await bcrypt.hash(data.password, 10);
            let rows = await models.User.update({ ...userInfo }, { where: { id } });
        } else {
            let user = await models.User.create(userInfo);
        }
        return res.json({ msg: 'Thao tác thành công. Vui lòng đăng nhập lại' });
    }
    async handleLoginByFacebook(req, res, next) {
        res.header('Access-Control-Allow-Origin: *');
        res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        if (req.query.info) {
            let info = JSON.parse(req.query.info);
            return res.json(info);
        } else {
            return res.redirect('/api/v1/auth/facebook');
        }
    }
}
module.exports = new AuthController();
