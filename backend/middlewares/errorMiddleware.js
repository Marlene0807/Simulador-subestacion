// errorMiddleware.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Hubo un error en el servidor',
        details: err.message
    });
};

module.exports = errorHandler;
