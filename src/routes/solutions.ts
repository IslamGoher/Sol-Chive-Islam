import express, { Router } from "express";
import {
  getAllSolutions,
  getOneSolution,
  putOneSolution,
  deleteOneSolution,
  postSolution
} from "../controller/solutions";
import { isAuth } from "../middleware/jwtAuth";

export const router: Router = express.Router();

// route:   GET '/api/v1/solutions'
// desc:    list all solutions
// access:  private (only logged in user can see his solutions)
router.get('/api/v1/solutions', isAuth, getAllSolutions);

// route:   GET '/api/v1/solutions/:solutionId'
// desc:    get one solution
// access:  private (only logged in user can see his solutions)
router.get('/api/v1/solutions/:solutionId', isAuth, getOneSolution);

// route:   PUT '/api/v1/solutions/:solutionId'
// desc:    edit a particular solution
// access:  private (only logged in user can edit his solutions)
router.put('/api/v1/solutions/:solutionId', isAuth, putOneSolution);

// route:   DELETE '/api/v1/solutions/:solutionId'
// desc:    delete a particular solution
// access:  private (only logged in user can delete his solutions)
router.delete('/api/v1/solutions/:solutionId', isAuth, deleteOneSolution);

// route:   POST '/api/v1/solutions/add'
// desc:    add new solution
// access:  private (only logged in user can add new solution)
router.post('/api/v1/solutions/add', isAuth, postSolution);