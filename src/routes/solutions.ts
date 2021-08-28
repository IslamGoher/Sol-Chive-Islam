import express, { Router } from "express";
import { getAllSolutions } from "../controller/solutions";

export const router: Router = express.Router();

// route:   GET '/api/v1/solutions'
// desc:    list all solutions
// access:  private (only logged in user can see his solutions)
router.get('/api/v1/solutions', getAllSolutions);