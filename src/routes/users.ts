import express, { Router } from "express";
import { getUserData } from "../controller/users";

export const router: Router = express.Router();

// route:   GET '/api/v1/user'
// desc:    get user data
// access:  private (only logged in user can access his own data)
router.get('/api/v1/user', getUserData);