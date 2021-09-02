import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/user";
import { parseCookie } from "../util/cookieParser";
import { ErrorResponse } from "../util/errorResponse";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    if(!req.headers.cookie) {
      return next(new ErrorResponse(401, "please login to access this content"));
    }
    
    // get token from cookies
    let cookie: any = parseCookie(req.headers.cookie!);

    // check if token exist
    if(!cookie.token) {
      return next(new ErrorResponse(401, "please login to access this content"));
    }
    
    // verify token
    jwt.verify(cookie.token, process.env.JWT_SECRET!);
    
    // get payload
    const payload: any = jwt.decode(cookie.token);

    // check if token exist
    if(!payload || !payload.data || !payload.data.id) {
      return next(new ErrorResponse(401, "please login to access this content"));
    }

    // find user then req.user.id
    const currentUser = await User.findById(payload.data.id);

    if(!currentUser) {
      return next(new ErrorResponse(401, "please signup to access this content"));
    }

    // pass user id to next middleware
    req.user = {
      id: currentUser._id
    }

    next();
    
  } catch (error) {
    next(error);
  }

};