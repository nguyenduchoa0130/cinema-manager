const pageRoutes = require('./page.routes');
const apiRoutes = require('./api.routes');
function routes(app) {
    app.use('/api/v1', apiRoutes);
    app.use('/', pageRoutes);
    app.use('*', (req, res, next) => {
        res.render('pages/404');
    });
}
module.exports = routes;
