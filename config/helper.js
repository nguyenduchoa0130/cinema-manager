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
    createSrc(filmId, img) {
        let localhost = 'http://localhost:3000';
        return {
            poster: img.poster ? `${process.env.HOST || localhost}/img/poster/${filmId}` : null,
            thumbnail: img.thumbnail ? `${process.env.HOST || localhost}/img/thumb/${filmId}` : null,
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
    removeAccents(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }
}
module.exports = new Helper();
