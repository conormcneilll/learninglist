const handleError = (error, request, response, next) => {
    console.log("App error handler responding with an error status.");
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong';

    response.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message
    });
};

module.exports = handleError;
