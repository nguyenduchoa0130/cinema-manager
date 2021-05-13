const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
class AuthenticationMiddleware {
    isSignedIn(req, res, next) {
        if (req.user) {
            return res.send('Ban da dang nhap');
        }
        return next();
    }
    authenticate(req, res, next) {
        try {
            let token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ error: 'Not authorized' });
            }
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SERCET || 'accessToken',
                (err, data) => {
                    if (err) {
                        return res.status(401).json({ error: err });
                    } else {
                        req.data = data;
                        return next();
                    }
                }
            );
        } catch (err) {
            return next(err);
        }
    }
    async filterInfo(req, res, next) {
        let user = req.body;
        for (let key in user) {
            user[key] = user[key].trim();
        }
        user.password = await bcrypt.hash(user.password, 10);
        return next();
    }
}
module.exports = new AuthenticationMiddleware();
