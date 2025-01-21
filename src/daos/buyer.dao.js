import buyerModel from "../models/buyer.model.js";
import mongoose from "mongoose";

export default class Buyer {
    constructor() {}

    async get() {
        try {
            return await buyerModel.find();
        } catch (error) {
            console.error("Error fetching buyers:", error.message);
            throw new Error("Database error while fetching buyers");
        }
    }

    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid buyer ID");
        }
        try {
            return await buyerModel.findById(id);
        } catch (error) {
            console.error("Error fetching buyer by ID:", error.message);
            throw new Error("Database error while fetching buyer");
        }
    }

    async getByEmail(email) {
        try {
            return await buyerModel.findOne({ email });
        } catch (error) {
            console.error("Error fetching buyer by email:", error.message);
            throw new Error("Database error while fetching buyer");
        }
    }

    async save(buyer) {
        try {
            return await buyerModel.create(buyer);
        } catch (error) {
            console.error("Error saving buyer:", error.message);
            throw new Error("Database error while saving buyer");
        }
    }

    async update(id, buyer) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid buyer ID");
        }
        try {
            return await buyerModel.updateOne({ _id: id }, { $set: buyer });
        } catch (error) {
            console.error("Error updating buyer:", error.message);
            throw new Error("Database error while updating buyer");
        }
    }
}
