import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export interface UserRequest extends Request {
  user?: {
    id: string;
    isAdmin: boolean;
  };
}

export const protect = async (
  req: UserRequest,
  res: any,
  next: NextFunction
) => {
  let token;

  // Verifica si el token está en los headers
  if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
  }

  // Si no hay token, rechaza la solicitud
  if (!token) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
      // Verifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

      // Busca el usuario en la base de datos
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
          return res.status(401).json({ message: "Not authorized, user does not exist" });
      }

      // Asigna `id` e `isAdmin` al objeto `req.user`
      req.user = { id: user.id, isAdmin: user.isAdmin };

      next(); // Continúa con la siguiente función
  } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const admin = (req: any, res: any, next: NextFunction) => {
  // Verifica que el usuario esté autenticado y sea administrador
  if (req.user && req.user.isAdmin) {
      next(); // El usuario tiene acceso
  } else {
      res.status(403).json({ message: "Access denied, admin only" });
  }
};