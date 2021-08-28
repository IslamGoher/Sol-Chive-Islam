import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

// interface to add message property to ErrorRequestHandler
interface ErrorHandler extends ErrorRequestHandler {
  message: string,
  statusCode: number,
  kind: string
}

// error route handler
export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  // logging error for development
  console.log(err);

  if(err.kind === 'ObjectId') {
    err.message = 'invalid id';
    err.statusCode = 401;
  }

  // send response
  res.status(err.statusCode || 500).json({
    sucess: false,
    error: {
      code: err.statusCode || 500,
      message: err.message || "server error"
    }
  });
};