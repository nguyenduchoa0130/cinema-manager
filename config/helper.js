const jwt = require('jsonwebtoken');
const emailExistence = require('email-existence');
function CustomNotication(isSuccess = true, err = null, msg, data = null) {
    this.isSuccess = isSuccess;
    this.error = err;
    this.msg = msg;
    this.data = data;
}
function createDataResponse(user) {
    let accessToken = jwt.sign(
        {
            userId: user.id,
            isAdmin: user.roleId == 1,
            isActive: user.isActive ? true : false,
        },
        process.env.ACCESS_TOKEN_SERCET || 'accessToken',
        {
            expiresIn: '3h',
        }
    );
    return {
        userId: user.id,
        fullName: user.fullName,
        phone: user.phone,
        isAdmin: user.roleId == 1,
        isActive: user.isActive ? true : false,
        accessToken,
    };
}
function ignoreColumns(...columns) {
    return columns;
}
function isValidEmail(email) {
    return new Promise((res, rej) => {
        emailExistence.check(email, function (error, response) {
            if (error) {
                rej(err);
            }
            res(response);
        });
    });
}
module.exports = {
    CustomNotication,
    createDataResponse,
    ignoreColumns,
    isValidEmail,
};
