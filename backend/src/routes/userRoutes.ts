import { Router } from "express";
import {
    registerUser,
    getCurrentUser,
    loginUser,
    logoutUser,
    updateUser,
    getUsers,
    deleteUser,
    uploadAvatar,
} from "../controllers/authController";
import { protect, admin } from "../middlewares/authMiddleware";
import multer from "multer"

const upload = multer({ dest: 'uploads/' })

const router = Router();

router.post("/register", upload.single('avatar'), registerUser);
router.get("/me", protect, getCurrentUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post('/upload-avatar', upload.single('avatar'), uploadAvatar);
router.put("/:id", protect, updateUser);

// Rutas accesibles solo para administradores
router.get("/users", protect, admin, getUsers); // Solo para administradores
router.delete("/users/:id", protect, admin, deleteUser); // Solo para administradores

export default router;
