class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        this.isOperational = true;

        Error.captureStackTrace(this.constructor, this);
    }
}
module.exports = AppError;
