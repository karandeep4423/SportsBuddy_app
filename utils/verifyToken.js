import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import User from "../models/user.js";

export const verifyToken = async(req, res, next,cb) => {
  const token = await req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(createError(401, "you are not authenticated"));
  }
  if(token.length<500){
   jwt.verify(token, process.env.JWT, async(err, user) => {
    if (err){return next(createError(403, "token is invalid"))}
    req.user = await user;
    cb(user);
    req.user = user;
    cb(user);
  })}else{
   const decodedData = jwt.decode(token);
    const googleId = decodedData?.sub.toString();
    const user = await User.findOne({ googleId });
    req.user = user;
    cb(user);
    req.user = user;
    cb(user);
   
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, (user) => {
    if (user.id === req.user.id && !user.isAdmin) {
      next();
    } else {
     return next(createError(403, "you are not authenticated user"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, (user) => {
    if (user.isAdmin===true) {
      next();
    } else {
    return next(createError(403, "you are not authenticated admin"));
    }
  });
};
