import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../util/errorResponse";
import { Solution } from "../model/solution";
import { User } from "../model/user";
import { Data } from "../interfaces/bodyOfEditSolution";

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
    /* req.user = {
      id: '6123b11636fc8714c8c962a1'
    }; */
  
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
    /* req.user = {
      id: '6123b11636fc8714c8c962a1'
    }; */
    
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

// route:   PUT '/api/v1/solutions/:solutionId'
// desc:    edit a particular solution
// access:  pricate (only looged in user can edit his solutions)
export const putOneSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // for development
    /* req.user = {
      id: "6123b11636fc8714c8c962a1"
    } */
    
    const data: Data = req.body;
    const currentSolution = await Solution.findById(req.params.solutionId);

    // check if solution found
    if(!currentSolution) {
      return next(new ErrorResponse(404, "there's no solution found with given id"));
    }

    // check if solution belongs to user
    if(req.user.id !== currentSolution.user.toString()) {
      return next(new ErrorResponse(403, "forbidden: can't access to this content"));
    }

    // update solution
    currentSolution.problem = data.problem;
    currentSolution.mySolution = data.mySolution;
    if(data.perfectSolution) {
      currentSolution.perfectSolution = {
        isExist: true,
        code: data.perfectSolution
      };
    } else {
      currentSolution.perfectSolution = {
        isExist: false
      }
    }
    await currentSolution.save();

    res.status(200).json({
      success: true,
      message: "solution updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

// route:   DELETE '/api/v1/solutions/:solutionId'
// desc:    delete a particular solution
// access:  private (only looged in user can delete his solutions)
export const deleteOneSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // for development
    req.user = {
      id: "6123b11636fc8714c8c962a1"
    }

    const currentSolution = await Solution.findById(req.params.solutionId);

    // check if solution found
    if(!currentSolution) {
      return next(new ErrorResponse(404, "there's no solution found with given id"));
    }

    // check if solution belongs to user
    if(req.user.id !== currentSolution.user.toString()) {
      return next(new ErrorResponse(403, "forbidden: can't access to this content"));
    }

    await currentSolution.delete();

    res.status(200).json({
      success: true,
      message: "solution deleted successfully"
    });
    
  } catch (error) {
    next(error);
  }
};