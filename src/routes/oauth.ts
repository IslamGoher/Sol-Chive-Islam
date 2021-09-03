import express, { Router } from "express";
import {
  getGoogleOauth,
  getGoogleCallback
} from "../controller/oauth";

export const router: Router = express.Router();

// route:   GET '/api/v1/google-oauth'
// desc:    generate google third party oauth url
// access:  public
router.get('/api/v1/google-oauth', getGoogleOauth);

// route:   GET '/api/v1/google-callback'
// desc:    check google oauth code and log user in
// access:  public
router.get('/api/v1/google-callback', getGoogleCallback);