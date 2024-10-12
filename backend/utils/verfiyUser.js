import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";
export const verfiyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "You are not authorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "You are not authorized"));
    }
    req.user = user;
    next();
  });
};