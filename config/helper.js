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
}
module.exports = new Helper();
