import { Router } from "express";
import {
    getComponents,
    getSingleComponent,
    createComponent,
    updateComponent,
    deleteComponent,
    getUserComponents,
    searchComponents,
} from "../controllers/componentController";
import { protect } from "../middlewares/authMiddleware"; // Middleware de protección

const router = Router();

// Rutas públicas
router.get("/user-components", protect, getUserComponents); // Obtiene solo los componentes del usuario autenticado
router.get("/all", protect, getComponents); // Para administradores o acceso global
// Ruta de búsqueda
router.get("/search", protect, searchComponents); // Buscar componentes del usuario autenticado
router.get("/:id", protect, getSingleComponent); // Ver un componente específico

// Rutas protegidas
router.post("/", protect, createComponent); // Crear un componente
router.put("/:id", protect, updateComponent); // Actualizar un componente
router.delete("/:id", protect, deleteComponent); // Eliminar un componente


export default router;
