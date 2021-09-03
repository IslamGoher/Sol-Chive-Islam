import { Response } from "express";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";

export const login = (
  res: Response,
  userId: string | ObjectId
) => {

  const data = {
    id: userId
  };

  // create jwt token
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), // 1 mounth
    data
  }, process.env.JWT_SECRET!);

  // add token inside httponly cookies
  res.cookie("token", token, {httpOnly: true});

}