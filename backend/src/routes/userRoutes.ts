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
    searchUsers
} from "../controllers/authController";
import { protect, admin } from "../middlewares/authMiddleware";
import multer from "multer"

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    },
});

const router = Router();

router.post("/register", upload.single('avatar'), registerUser);
router.get("/me", protect, getCurrentUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.post('/upload-avatar', upload.single('avatar'), uploadAvatar);
router.put("/:id", protect, updateUser);
router.get("/search-users", protect, admin, searchUsers);

// Rutas accesibles solo para administradores
router.get("/users", protect, admin, getUsers); // Solo para administradores
router.delete("/users/:id", protect, admin, deleteUser); // Solo para administradores

export default router;
