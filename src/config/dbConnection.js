import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from "./config.js";

dotenv.config(); // Load environment variables

class DbConnection {
    static instance;

    constructor() {
        if (!DbConnection.instance) {
            const mongoUri = process.env.MONGO_URI || config.MONGO_URI;

            if (!mongoUri) {
                console.error("❌ MongoDB URI is missing. Check your .env file.");
                process.exit(1); // Stop the server if no URI is found
            }

            mongoose.connect(mongoUri)
                .then(() => console.log("✅ MongoDB connected successfully"))
                .catch((err) => {
                    console.error("❌ MongoDB connection error:", err);
                    process.exit(1); // Exit if DB connection fails
                });

            DbConnection.instance = this;
        }
        return DbConnection.instance;
    }

    static getInstance() {
        if (!DbConnection.instance) {
            new DbConnection();
        }
        return DbConnection.instance;
    }
}

export default DbConnection;
