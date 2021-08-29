import { Request, Response, NextFunction } from "express";
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

  try {
    
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

  } catch (error) {
    next(error);
  }

};

// route:   GET '/api/v1/solutions/:solutiontId'
// desc:    get one solution
// access:  private (only logged in user can see his solutions)
export const getOneSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // for development
    req.user = {
      id: '6123b11636fc8714c8c962a1'
    };
    
    const solutionId = req.params.solutionId;

    const currentSolution = await Solution.
      findById(solutionId).
      select('mySolution perfectSolution problem createdAt user');
    
    // check if solution found
    if(!currentSolution) {
      return next(new ErrorResponse(404, "there's no solution found with given id"));
    }

    // check if solution belongs to user
    if(req.user.id !== currentSolution.user.toString()) {
      return next(new ErrorResponse(403, "forbidden: can't access to this content"));
    }
    // remove user id before sending
    let finalSolution = {
      _id: currentSolution._id,
      createdAt: currentSolution.createdAt,
      problem: currentSolution.problem,
      mySolution: currentSolution.mySolution,
      perfectSolution: currentSolution.perfectSolution
    };

    res.status(200).json(finalSolution);
    
  } catch (error) {
    next(error);
  }
}