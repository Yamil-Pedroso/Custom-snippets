import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    getUsers,
    deleteUser,
} from "../controllers/authController";
import { protect, admin } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/:id", protect, updateUser);

// Rutas accesibles solo para administradores
router.get("/", protect, admin, getUsers); // Solo para administradores
router.delete("/:id", protect, admin, deleteUser); // Solo para administradores

export default router;
