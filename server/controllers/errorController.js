const AppError = require("./../utils/AppError");

const handleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateError = (err) => {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendProdError = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            message: err.message,
        });
    } else {
        console.error("ERROR: ", err);

        res.status(500).json({
            message: "Somwthing went very wrong",
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === "development") sendDevError(err, res);
    if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        error.message = err.message;

        if (error.name === "CastError") error = handleCastError(error);
        if (error.code === 11000) error = handleDuplicateError(error);
        if (error.name === "ValidationError")
            error = handleValidationError(error);

        sendProdError(error, res);
    }
};
