const apiRoutes = require('./api.route');
function routes(app) {
    app.use('/api/v1', apiRoutes);
}
module.exports = routes;