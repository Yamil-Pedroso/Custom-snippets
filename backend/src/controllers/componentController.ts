import { Request, Response, NextFunction } from "express";
import { Component } from "../models/Component";
import { body, validationResult } from "express-validator";
//import { sampleComponents } from "../data/components";

interface UserRequest extends Request {
    user?: any;
}

export const getComponents = async (req: Request, res: Response) => {
    try {
        const components = await Component.find();
        res.status(200).json(components);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving components", error });
    }
};

export const getSingleComponent = async (req: UserRequest, res: Response) => {
    const { id } = req.params;

    try {
        const component = await Component.findOne({ _id: id, userId: req.user?.id });

        if (!component) {
            res.status(404).json({ message: "Component not found" });
            return;
        }

        res.status(200).json(component);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving component", error });
    }

}

export const getUserComponents = async (req: UserRequest, res: Response) => {
    try {
        const components = await Component.find({ userId: req.user?.id });
        res.status(200).json(components);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving components", error });
    }
}


export const createComponent = async (req: UserRequest, res: Response): Promise<void> => {
    const { name, description, codeSnippet, tags } = req.body;

    try {
        const newComponent = new Component({
            name,
            description,
            codeSnippet,
            tags,
            userId: req.user?.id, 
        });

        const savedComponent = await newComponent.save();
        res.status(201).json(savedComponent);
    } catch (error) {
        res.status(400).json({ message: "Error creating component", error });
    }
};

export const validateCreateComponent = [
    body("name").notEmpty().withMessage("Name is required"),
    body("codeSnippet").notEmpty().withMessage("Code snippet is required"),
    body("tags").isArray().withMessage("Tags must be an array"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const updateComponent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const updatedComponent = await Component.findOneAndUpdate(
            { _id: id, userId: req.user?.id }, // Solo actualizar si el componente pertenece al usuario
            req.body, // Actualizar con los datos del cuerpo de la solicitud
            { new: true } // Devolver el componente actualizado
        );

        if (!updatedComponent) {
            res.status(404).json({ message: "Component not found" });
            return;
        }

        res.status(200).json(updatedComponent);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteComponent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedComponent = await Component.findOneAndDelete(
            { _id: id, userId: req.user?.id }
        );

        if (!deletedComponent) {
            res.status(404).json({ message: "Component not found or not authorized" });
            return;
        }

        res.status(200).json({ message: "Component deleted successfully", component: deletedComponent });
    } catch (error) {
        res.status(500).json({ message: "Error deleting component", error });
    }
};


export const searchComponents = async (req: UserRequest, res: Response) => {
    const { query } = req.query;

    try {
        const components = await Component.find({
            userId: req.user?.id, // Filtrar solo los componentes del usuario
            $text: { $search: query as string },
        });

        res.status(200).json(components);
    } catch (error) {
        res.status(500).json({ message: "Error searching components", error });
    }
};
