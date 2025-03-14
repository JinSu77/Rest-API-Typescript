"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultErrorHandler = void 0;
const ApiError_1 = require("./ApiError");
const ErrorCode_1 = require("./ErrorCode");
const tsoa_1 = require("tsoa");
const DefaultErrorHandler = async (error, req, res, next) => {
    let err = new ApiError_1.ApiError(ErrorCode_1.ErrorCode.InternalError, 'internal/unknown', 'An unknown internal error occurred');
    if (!!error) {
        if (error instanceof ApiError_1.ApiError) {
            err = error;
        }
        /** Ajouter ici **/
        else if (error instanceof tsoa_1.ValidateError) {
            err = new ApiError_1.ApiError(ErrorCode_1.ErrorCode.BadRequest, 'validation', 'Validation error', {
                fields: error.fields
            });
        }
        else {
            if (error.message) {
                err.errMessage = error.message;
            }
        }
    }
    console.log(err.json);
    res.status(err.httpCode).json(err.json);
};
exports.DefaultErrorHandler = DefaultErrorHandler;
