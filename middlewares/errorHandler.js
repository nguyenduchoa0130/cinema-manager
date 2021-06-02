function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    return res.json({
        msg: 'Lỗi: ' + (err.message || 'Có 1 lỗi đã xảy ra với server khi chạy request này. Vui lòng liên hệ admin'),
    });
}
module.exports = errorHandler;
