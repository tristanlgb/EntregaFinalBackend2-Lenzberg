import businessModel from "../models/business.model.js";
import mongoose from "mongoose";

export default class Business {
    constructor() {}

    async get() {
        try {
            return await businessModel.find();
        } catch (error) {
            console.error("Error fetching businesses:", error.message);
            throw new Error("Database error while fetching businesses");
        }
    }

    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid business ID");
        }
        try {
            return await businessModel.findById(id);
        } catch (error) {
            console.error("Error fetching business by ID:", error.message);
            throw new Error("Database error while fetching business");
        }
    }

    async getByEmail(email) {
        try {
            return await businessModel.findOne({ email });
        } catch (error) {
            console.error("Error fetching business by email:", error.message);
            throw new Error("Database error while fetching business");
        }
    }

    async save(business) {
        try {
            return await businessModel.create(business);
        } catch (error) {
            console.error("Error saving business:", error.message);
            throw new Error("Database error while saving business");
        }
    }

    async update(id, business) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid business ID");
        }
        try {
            return await businessModel.updateOne({ _id: id }, { $set: business });
        } catch (error) {
            console.error("Error updating business:", error.message);
            throw new Error("Database error while updating business");
        }
    }
}
