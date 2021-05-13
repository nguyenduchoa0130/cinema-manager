const jwt = require('jsonwebtoken');
function Noti(isSuccess = true, msg, data = null) {
    this.isSuccess = isSuccess;
    this.msg = msg;
    this.data = data;
}
function responseData(user) {
    let accessToken = jwt.sign(
        {
            userId: user.id,
            roleId: user.roleId,
        },
        process.env.ACCESS_TOKEN_SERCET || 'accessToken',
        {
            expiresIn: '1h',
        }
    );
    let refreshToken = jwt.sign(
        {
            userId: user.id,
            roleId: user.roleId,
        },
        process.env.REFRESH_TOKEN_SERCET || 'refreshToken',
        {
            expiresIn: '1 day',
        }
    );
    return {
        fullName: user.fullName,
        phone: user.phone,
        accessToken,
		refreshToken
    };
}
module.exports = {
    Noti,
    responseData,
};
