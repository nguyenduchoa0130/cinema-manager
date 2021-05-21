function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        response: {
            msg:
                err.message ||
                'Có 1 lỗi đã xảy ra với server khi chạy request này. Vui lòng liên hệ admin',
            type: err.type || 'Lỗi server',
        },
    });
}
module.exports = errorHandler;
