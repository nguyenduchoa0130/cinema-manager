require('dotenv').config();
const bcrypt = require('bcrypt');
const { User: UserModel } = require('../models/index').sequelize.models;
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
        ),
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: process.env.CALLBACK_URL,
            },
            function (accessToken, refreshToken, profile, done) {}
        ),
        new GoogleStrategy(
            {
                consumerKey: process.env.GOOGLE_CONSUMER_KEY,
                consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
                callbackURL: 'http://www.example.com/auth/google/callback',
            },
            function (token, tokenSecret, profile, done) {
              
            }
        )
    );
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        let user = await UserModel.findByPk(id, {
            attributes: {
                exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'],
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
