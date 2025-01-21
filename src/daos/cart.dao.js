import cartModel from "../models/cart.model.js";

export default class Cart {
    constructor() {}

    async getById(id) {
        try {
            return await cartModel.findById(id).populate("products.product");
        } catch (error) {
            console.error("Error fetching cart by ID:", error.message);
            return null;
        }
    }

    async update(id, cart) {
        try {
            return await cartModel.updateOne({ _id: id }, { $set: cart });
        } catch (error) {
            console.error("Error updating cart:", error.message);
            return null;
        }
    }
}
