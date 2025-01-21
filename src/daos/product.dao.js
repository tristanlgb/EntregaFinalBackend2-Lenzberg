import productModel from "../models/product.model.js";

export default class Product {
    constructor() {}

    async getById(id) {
        try {
            return await productModel.findById(id);
        } catch (error) {
            console.error("Error fetching product by ID:", error.message);
            return null;
        }
    }

    async update(id, data) {
        try {
            return await productModel.updateOne({ _id: id }, { $set: data });
        } catch (error) {
            console.error("Error updating product:", error.message);
            return null;
        }
    }
    async getAll() {
        try {
            return await productModel.find(); // Fetch all products
        } catch (error) {
            console.error("Error fetching all products:", error.message);
            return [];
        }
    }
}
