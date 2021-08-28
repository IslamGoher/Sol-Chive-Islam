import { Request, Response, NextFunction, Handler } from "express";
import { ErrorResponse } from "../util/errorResponse";
import { Solution } from "../model/solution";
import { User } from "../model/user";

// route:   GET '/api/v1/solutions'
// desc:    list all solutions
// access:  private (only logged in user can see his solutions)
export const getAllSolutions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // for development
  req.user = {
    id: '6123b11636fc8714c8c962a1'
  };

  // selected properties of every solution
  let querySelect = {
    'problem': 1,
    'createdAt': 1,
    'perfectSolution.isExist': 1
  };

  const user = await User.
    findById(req.user.id).
    select('solutions -_id').
    populate({
      path: 'solutions',
      select: '_id problem createdAt perfectSolution.isExist',
      model: Solution
    });

  // check if there's no user
  if(!user) {
    return;
  }

  // check if there's no solutions
  if(user.solutions.length == 0) {
    return next(new ErrorResponse(404, "this account has no solutions"));
  }
  
  res.status(200).json(user.solutions);
};