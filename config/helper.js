const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const emailExistence = require('email-existence');
class Helper {
    isValidEmail(email) {
        return new Promise((res, rej) => {
            emailExistence.check(email, function (error, response) {
                if (error) {
                    rej(err);
                }
                res(response);
            });
        });
    }
    ignoreColumns(...columns) {
        return columns;
    }
    createAccessToken(user) {
        return jwt.sign(
            {
                userId: user.id,
                isAdmin: user.roleId == 1,
                isActive: user.isActive ? true : false,
            },
            process.env.ACCESS_TOKEN_SERCET || 'accessToken',
            {
                expiresIn: '2h',
            }
        );
    }
    success(msg, data) {
        return {
            isSuccess: true,
            msg,
            data,
        };
    }
    error(errorType, msg, code = 200) {
        let err = new Error(msg);
        err.status = code;
        err.type = errorType;
        return err;
    }
    createSrc(filmId) {
        let localhost = 'http://localhost:3000';
        return {
            poster: `${process.env.HOST || localhost}/img/poster/${filmId}`,
            thumbnail: `${process.env.HOST || localhost}/img/thumb/${filmId}`,
        };
    }
    isValidID(id) {
        return Math.abs(parseInt(id)) >= 0;
    }
    async isNameExist(models, field, value) {
		value = value.toLowerCase();
        try {
            let rows = await models.findAll({
                where: {
                    field: sequelize.where(sequelize.fn('LOWER', sequelize.col(field)), 'LIKE', `%${value}%`),
                },
            });
            return rows.length > 0;
        } catch (err) {
            return false;
        }
    }
}
module.exports = new Helper();
