import { Router } from "express";
import {
    getComponents,
    getSingleComponent,
    createComponent,
    updateComponent,
    deleteComponent,
    getUserComponents,
    searchComponents,
    toggleComponentVisibility,
    getComponentsByCategory
} from "../controllers/componentController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();


router.get("/user-components", protect, getUserComponents);
router.get("/all", protect, getComponents);

router.get("/search", protect, searchComponents);
router.get("/:id", protect, getSingleComponent);

router.post("/", protect, createComponent);
router.put("/:id", protect, updateComponent);
router.delete("/:id", protect, deleteComponent);
router.put("/:id/share", protect, toggleComponentVisibility);
router.get("/category/:category", protect, getComponentsByCategory);



export default router;
