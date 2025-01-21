import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "buyer" },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders"
        }
    ]
});

export default mongoose.model("buyers", buyerSchema);
