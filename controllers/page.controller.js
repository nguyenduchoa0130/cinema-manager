class PageController {
    renderIndexPage(req, res, next) {
        res.locals.title = 'Home';
        res.render('pages/index');
    }
    renderSignIn(req, res, next) {
        res.locals.title = 'Sign In';
        res.render('pages/auth/signin');
    }
    renderSignUp(req, res, next) {
        res.locals.title = 'Sign Up';
        res.render('pages/auth/signup');
    }
}
module.exports = new PageController();
