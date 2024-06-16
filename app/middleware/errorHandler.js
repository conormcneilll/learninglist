const handleError = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error); // Pass the error to the default Express error handler
    }

    console.log("App error handler responding with an error status.");
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong';

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
    });
};

module.exports = handleError;
