import { Request, Response } from "express";
import { Component } from "../models/Component";
import { sampleComponents } from "../data/components";

export const getComponents = async (req: Request, res: Response) => {
    try {
        const components = await Component.find();
        res.status(200).json(sampleComponents);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving components", error });
    }
};


export const createComponent = async (req: Request, res: Response) => {
  try {
      const newComponent = new Component(req.body);
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
