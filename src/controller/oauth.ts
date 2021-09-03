import { Request, Response, NextFunction } from "express";
import { google } from "googleapis";
import { ErrorResponse } from "../util/errorResponse";
import { User } from "../model/user";
import axios from "axios";
import { login } from "../util/login";

// route:   GET '/api/v1/google-oauth'
// desc:    generate google third party oauth url
// access:  public
export const getGoogleOauth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  
    // determine that which data we need from google email
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      `https://www.googleapis.com/auth/userinfo.email`
    ];
  
    // generate google third party auth url
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
    });
  
    // redirect client to google third party auth url
    res.status(200).json({
      success: true,
      redirectUrl: url
    });
    
  } catch (error) {
    next(error);
  }

};

// route:   GET '/api/v1/google-callback'
// desc:    check google oauth code and log user in
// access:  public
export const getGoogleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  
    // get user access token to get user data
    const {tokens} = await oauth2Client.getToken(`${req.query.code}`);
  
    const api = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`;
  
    // fetch 'api' url to get user data
    let userData = await axios.get(api);
  
    // login
  
    // check existation of user email to determine the next process if login or signup
    let currentUser = await User.findOne({email: userData.data.email});
  
    if(currentUser) {
  
      // login
      login(res, currentUser._id);
  
      // send response
      res.status(302).redirect(`${process.env.CLIENT_DOMAIN}`);
  
    }

    // sign up

    else if(!currentUser) {
  
      // create new user
      const newUser = await User.create({
        name: userData.data.name,
        email: userData.data.email,
        picture: userData.data.picture
      });

      // login
      login(res, newUser._id);
  
      // send response
      res.status(302).redirect(`${process.env.CLIENT_DOMAIN}`);
  
    }
    
  } catch (error) {
    next(error);
  }

};