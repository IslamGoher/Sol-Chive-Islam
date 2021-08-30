import { Request, Response, NextFunction } from "express";
import { User } from "../model/user";

// route:   GET '/api/v1/user'
// desc:    get user data
// access:  private (only logged in user can access his own data)
export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // for development
    /* req.user = {
      id: "6123b11636fc8714c8c962a1"
    } */
    
    // find user
    const currentUser = await User.
      findById(req.user.id)
      .select('name picture -_id');

    res.status(200).json(currentUser);

  } catch (error) {
    next(error);
  }
};