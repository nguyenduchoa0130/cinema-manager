class AuthController {
    handleLogin(req, res, next) {
        res.status(200).json(req.body);
    }
    handleRegister(req, res, next) {
        res.status(200).json(req.body);
    }
}
module.exports = new AuthController();
