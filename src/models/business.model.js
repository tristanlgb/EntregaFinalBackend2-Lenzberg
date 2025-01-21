import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    firstName: { type: String, required: true },  // Fixed typo
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "business" },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products", // Assuming you have a "products" collection
        }
    ]
});

export default mongoose.model("business", businessSchema);
