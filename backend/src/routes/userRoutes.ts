import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    getUsers,
    deleteUser,
} from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/:id", protect, updateUser);
router.get("/", getUsers); 
router.delete("/:id", protect, deleteUser);

export default router;
