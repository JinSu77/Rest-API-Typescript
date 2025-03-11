import { NextFunction, Request, Response } from 'express';
import { ApiError } from './ApiError';
import { ErrorCode } from './ErrorCode';
import { ValidateError } from 'tsoa';


export const DefaultErrorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
  
  let err = new ApiError(ErrorCode.InternalError, 'internal/unknown', 'An unknown internal error occurred');
    
  if (!!error) {
    if (error instanceof ApiError) {
      err = error;
    } 
    /** Ajouter ici **/
    else if (error instanceof ValidateError) {
      err = new ApiError(ErrorCode.BadRequest, 'validation', 'Validation error', {
        fields: error.fields
      });
    } else {
      if (error.message) {
        err.errMessage = error.message;
      }
    }
  }
  console.log(err.json);

  res.status(err.httpCode).json(err.json);   
  
}