class PageController {
    renderIndexPage(req, res, next) {
        res.render('pages/index');
    }
}
module.exports = new PageController();
