const { User: UserModel, OTP: OTPModel } =
    require('../models/index').sequelize.models;
const { send } = require('../config/nodemailer');
const lib = require('../config/lib');
const bcrypt = require('bcrypt');
const passport = require('passport');
class AuthController {
    async handleSignIn(req, res, next) {
        passport.authenticate('local', (err, user) => {
            if (err) return next(err);
            if (!user)
                return res.status(403).json({
                    isSuccess: false,
                    msg: 'Email or password is incorrect',
                });
            // Login thành công
            req.login(user, async (err) => {
                if (err) {
                    return next(err);
                }
                let dataResponse = lib.createDataResponse(user);
                await lib.updateRefreshToken(user, dataResponse.refreshToken);
                return res
                    .status(200)
                    .json(
                        new lib.Noti(true, 'Login successfully', dataResponse)
                    );
            });
        })(req, res, next); // important!
    }
    async handleSignUp(req, res, next) {
        let data = req.body;
        try {
            let user = await UserModel.findOne({
                where: {
                    email: data.email,
                },
            });
            if (user) {
                return res
                    .status(403)
                    .json(new lib.Noti(false, 'Account was exists', null));
            } else {
                let otp = await OTPModel.findOne({
                    where: {
                        email: data.email,
                    },
                });
                if (otp.code == data.code) {
                    data.password = await bcrypt.hash(data.password, 10);
                    let exec = await Promise.all([
                        UserModel.create(data),
                        otp.destroy(),
                    ]);
                    res.status(200).json(
                        new lib.Noti(
                            true,
                            'Account was created successfully',
                            exec[0]
                        )
                    );
                } else {
                    return res.json(
                        new lib.Noti(
                            false,
                            'OTP is incorrect. Please check your mail again!',
                            null
                        )
                    );
                }
            }
        } catch (err) {
            return next(err);
        }
    }
    async sendOTP(req, res, next) {
        let code = Math.floor(100000 + Math.random() * 900000);
        try {
            let otp = await OTPModel.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (otp) {
                otp.code = code;
                await Promise.all([
                    otp.save(),
                    send(req.body.email, 'Verify Account', `OTP: ${code}`),
                ]);
            } else {
                await Promise.all([
                    OTPModel.create({ email: req.body.email, code }),
                    send(req.body.email, 'Verify Account', `OTP: ${code}`),
                ]);
            }
            res.status(200).json(
                new lib.Noti(
                    true,
                    'An email was sent to ' + req.body.email,
                    null
                )
            );
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
    async refreshToken(req, res, next) {}
    async handleSignOut(req, res, next) {}
}
module.exports = new AuthController();
