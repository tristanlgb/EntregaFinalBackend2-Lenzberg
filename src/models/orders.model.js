import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    business: { type: mongoose.Schema.Types.ObjectId, ref: "business", required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "buyers", required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    totalPrice: { type: Number, required: true }
});

export default mongoose.model("orders", ordersSchema);
