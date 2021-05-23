class ApiError extends Error {
    constructor(message, code) {
        super(message);
        this.status = code;
    }
    static badRequest(message) {
        return new ApiError(message, 400);
    }
    static notFound(message) {
        return new ApiError(message, 404);
    }
    static notAuthorized(message) {
        return new ApiError(message, 401);
    }
    static conflict(message) {
        return new ApiError(message, 409);
    }
    static forbidden(message) {
        return new ApiError(message, 403);
    }
    static internal(message) {
        return new ApiError(message, 500);
    }
}
module.exports = ApiError;
