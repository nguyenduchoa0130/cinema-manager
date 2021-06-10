require('dotenv').config();
const bcrypt = require('bcrypt');
const { User: UserModel } = require('../models/index').sequelize.models;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
function configPassport(passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done) => {
                try {
                    let user = await UserModel.findOne({
                        where: {
                            email,
                        },
                        attributes: {
                            exclude: ['refreshToken', 'createdAt', 'updatedAt'],
                        },
                    });
                    if (user && (await bcrypt.compare(password, user.password)) == true) {
                        return done(null, user); // success
                    } else {
                        return done(null, false); // error: user or password is incorrect
                    }
                } catch (err) {
                    return done(err); // Server error
                }
            }
        )
    );
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: process.env.CALLBACK_URL_FB,
                profileFields: ['id', 'emails', 'name', 'displayName'],
            },
            async function (accessToken, refreshToken, profile, done) {
                // Kiểm tra email có tồn tại trong hệ thống hay chưa và người dùng ngày có đã có fbid hay chưa
                let data = {};
                let rows = await Promise.all([
                    UserModel.findOne({ where: { facebookId: profile.id } }),
                    UserModel.findOne({ where: { email: profile.emails[0].value } }),
                ]);
                let [checkFacebookId, checkEmail] = rows; // instance User
                if (!checkFacebookId) {
                    if (checkEmail) {
                        let { email, fullName, phone, id } = checkEmail;
                        data = {
                            isComplete: false,
                            isExists: true,
                            newMail: profile.emails[0].value,
                            user: {
                                id,
                                facebookId: profile.id,
                                email,
                                fullName,
                                phone,
                            },
                        };
                    } else {
                        data = {
                            isComplete: false,
                            isExists: false,
                            user: {
                                facebookId: profile.id,
                                email: profile.emails[0].value,
                                fullName: profile.displayName,
                            },
                        };
                    }
                } else {
                    data = {
                        isComplete: true,
                        isExists: true,
                        user: {
                            ...checkFacebookId,
                        },
                    };
                }
                done(null, data);
            }
        )
    ),
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

    passport.deserializeUser(async function (id, done) {
        let user = await UserModel.findByPk(id, {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        });
        if (user) {
            done(null, user);
        } else {
            done(null, null);
        }
    });
}
module.exports = configPassport;
