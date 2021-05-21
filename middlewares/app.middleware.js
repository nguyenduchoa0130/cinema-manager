const chalk = require('chalk');
class ApplicationMiddleware {
    index(app) {
        app.use(this.setLocals);
        app.use(this.logger);
    }
    setLocals(req, res, next) {
        res.locals.title = '';
        next();
    }
    logger(req, res, next) {
        console.log(chalk.green(`${req.method} - ${req.ip} - ${req.originalUrl}`));
        next();
    }
}
module.exports = new ApplicationMiddleware();
