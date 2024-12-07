import { Router } from 'express';

import { getComponents, createComponent, updateComponent } from "../controllers/componentController";

const router = Router();

router.get("/", getComponents);
router.post("/", createComponent);
router.put("/:id", updateComponent);
//router.delete("/:id", deleteComponent);

export default router;
