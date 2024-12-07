import { Request, Response } from "express";
import { Component } from "../models/Component";
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

export const getSingleComponent = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const component = await Component.findById(id);

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

export const updateComponent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const updatedComponent = await Component.findByIdAndUpdate(id, req.body, { new: true });

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
        const deletedComponent = await Component.findByIdAndDelete(id);

        if (!deletedComponent) {
            res.status(404).json({ message: "Component not found" });
            return;
        }

        res.status(200).json({ message: "Component deleted successfully", component: deletedComponent });
    } catch (error) {
        res.status(500).json({ message: "Error deleting component", error });
    }
};


export const searchComponents = async (req: Request, res: Response) => {
  const { query } = req.query;
  const components = await Component.find({ $text: { $search: query as string } });
  res.json(components);
};
