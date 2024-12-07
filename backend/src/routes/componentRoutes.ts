import { Router } from 'express';

import { getComponents, getSingleComponent, createComponent, updateComponent, deleteComponent } from "../controllers/componentController";

const router = Router();

router.get("/", getComponents);
router.get("/:id", getSingleComponent);
router.post("/", createComponent);
router.put("/:id", updateComponent);
router.delete("/:id", deleteComponent);

export default router;
