"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, req, res, next) {
    var status = error.status || 500;
    var message = error.message || "Internal Server Error";
    res.status(status).send({
        status: status,
        message: message
    });
}
exports.default = errorMiddleware;
