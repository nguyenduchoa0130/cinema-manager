const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const emailExistence = require('email-existence');
const linkCheck = require('link-check');
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
            .replace(/Đ/g, 'D')
            .trim()
            .toLowerCase();
    }
    compareNow(date) {
        let now = new Date();
        let compareDate = new Date(date);
        return now.getTime() < compareDate.getTime();
    }
    compareTime(strDate1, strDate2) {
        let date1 = new Date(strDate1);
        let date2 = new Date(strDate2);
    }
    checkLinkTrailer(link) {
        return new Promise((resolve, reject) => {
            linkCheck(link, {}, (err, result) => {
                if (err) {
                    return reject(err.status);
                }
                return resolve(result.status);
            });
        });
    }
    convertTZ(date) {
        return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    }
}
module.exports = new Helper();
