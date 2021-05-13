const { User: UserModel, OTP: OTPModel } =
    require('../models/index').sequelize.models;
const { send } = require('../config/nodemailer');
const { Noti, responseData } = require('../config/lib');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

            return res
                .status(200)
                .json(
                    new Noti(true, 'Sign in successfully', responseData(user))
                );
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
                return res.json(new Noti(false, 'Account was exists', null));
            } else {
                let otp = await OTPModel.findOne({
                    where: {
                        email: data.email,
                    },
                });
                if (otp.code == data.code) {
                    let exec = await Promise.all([
                        UserModel.create(data),
                        otp.destroy(),
                    ]);
                    user = exec[0];
                    res.status(200).json(
                        new Noti(
                            true,
                            'Account successfully created',
                            responseData(user)
                        )
                    );
                } else {
                    return res.json(
                        new Noti(
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
        let otp = Math.floor(100000 + Math.random() * 900000);
        try {
            let execute = Promise.all(
                send(req.body.email, 'Verify Account', `OTP: ${otp}`),
                OTPModel.create({
                    email: req.body.email,
                    code: otp,
                })
            );
            res.status(200).json(
                new Noti(true, 'An email was sent to ' + req.body.email, null)
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
	async refreshToken(req, res, next) {

	}
	async handleSignOut(req, res, next) {
		
	}
}
module.exports = new AuthController();
