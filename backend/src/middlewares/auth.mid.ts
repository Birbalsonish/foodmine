import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constant/http-status";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  console.log("Headers received on server:", req.headers); // Debugging

  // Extract token from Authorization header
  let token = req.headers["authorization"];
  
  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1]; // Extract only the token part
  } else {
    console.log("No valid Authorization header found"); // Debugging
    res.status(HTTP_UNAUTHORIZED).json({ message: "Access token is required" });
    return;
  }

  console.log("Extracted token:", token); // Debugging

  try {
    const decodedUser = verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(HTTP_UNAUTHORIZED).json({ message: "Invalid or expired token" });
    return;
    res.status(HTTP_UNAUTHORIZED).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
