import ordersModel from "../models/orders.model.js";
import mongoose from "mongoose";

export default class Orders {
    constructor() {}

    async get() {
        try {
            return await ordersModel.find();
        } catch (error) {
            console.error("Error fetching orders:", error.message);
            throw new Error("Database error while fetching orders");
        }
    }

    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid order ID");
        }
        try {
            return await ordersModel.findById(id);
        } catch (error) {
            console.error("Error fetching order by ID:", error.message);
            throw new Error("Database error while fetching order");
        }
    }

    async create(order) {
        try {
            return await ordersModel.create(order);
        } catch (error) {
            console.error("Error creating order:", error.message);
            throw new Error("Database error while creating order");
        }
    }

    async resolve(id, order) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid order ID");
        }
        try {
            return await ordersModel.updateOne({ _id: id }, { $set: order });
        } catch (error) {
            console.error("Error resolving order:", error.message);
            throw new Error("Database error while resolving order");
        }
    }
}
