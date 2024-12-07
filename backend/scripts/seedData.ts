import mongoose from "mongoose";
import dotenv from "dotenv";
import { Component } from "../src//models/Component";
import { sampleComponents } from "../src/data/components";

dotenv.config({ path: 'src/config/config.env' })


const MONGO_URI = process.env.MONGO_URI || "";

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        await Component.deleteMany({});
        console.log("Existing data cleared.");

        // Inserta los datos de ejemplo
        await Component.insertMany(sampleComponents);
        console.log("Sample data successfully added!");

        // Cierra la conexión
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding data:", error);
        mongoose.connection.close();
        process.exit(1);
    }
};

seedData();
