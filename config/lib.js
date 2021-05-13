const jwt = require('jsonwebtoken');
function Noti(isSuccess = true, msg, data = null) {
    this.isSuccess = isSuccess;
    this.msg = msg;
    this.data = data;
}
function createDataResponse(user) {
    let accessToken = jwt.sign(
        {
            userId: user.id,
            isAdmin: user.roleId == 1,
        },
        process.env.ACCESS_TOKEN_SERCET || 'accessToken',
        {
            expiresIn: '1h',
        }
    );
    let refreshToken = jwt.sign(
        {
            userId: user.id,
			isAdmin: user.roleId == 1,
        },
        process.env.REFRESH_TOKEN_SERCET || 'refreshToken',
        {
            expiresIn: '1 day',
        }
    );
    return {
        userId: user.id,
        fullName: user.fullName,
        phone: user.phone,
        isAdmin: user.roleId == 1,
        accessToken,
        refreshToken,
    };
}
function ignoreColumns(...columns) {
    return columns;
}
async function updateRefreshToken(user, refreshToken) {
    user.refreshToken = refreshToken;
    await user.save();
}
module.exports = {
    Noti,
    createDataResponse,
    updateRefreshToken,
};
