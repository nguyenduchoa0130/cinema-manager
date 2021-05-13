const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
class AuthenticationMiddleware {
    isNotSignedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return res.send('Ban da dang nhap');
        }
    }
    isSignedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.send('Ban chua dang nhap');
        }
    }
    isAdmin(req, res, next) {
        if (req.dataToken.isAdmin) {
            return next();
        } else return res.sendStatus(401);
    }
    isOwnerOrAdmin(req, res, next) {
        if (req.dataToken.userId == req.params.id || req.dataToken.isAdmin) {
            return next();
        } else return res.sendStatus(401);
    }
    authenticate(req, res, next) {
        try {
            let token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.sendStatus(401);
            }
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SERCET || 'accessToken',
                (err, data) => {
                    if (err) {
                        return res.sendStatus(401);
                    } else {
                        req.dataToken = data;
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
