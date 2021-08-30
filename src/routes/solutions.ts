import express, { Router } from "express";
import {
  getAllSolutions,
  getOneSolution,
  putOneSolution
} from "../controller/solutions";

export const router: Router = express.Router();

// route:   GET '/api/v1/solutions'
// desc:    list all solutions
// access:  private (only logged in user can see his solutions)
router.get('/api/v1/solutions', getAllSolutions);

// route:   GET '/api/v1/solutions/:solutionId'
// desc:    get one solution
// access:  private (only logged in user can see his solutions)
router.get('/api/v1/solutions/:solutionId', getOneSolution);

// route:   PUT '/api/v1/solutions/:solutionId'
// desc:    edit a particular solution
// access:  pricate (only looged in user can edit his solutions)
router.put('/api/v1/solutions/:solutionId', putOneSolution);