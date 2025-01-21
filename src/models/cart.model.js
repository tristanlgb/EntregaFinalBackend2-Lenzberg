import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
            quantity: { type: Number, required: true, min: 1 }
        }
    ]
});

export default mongoose.model("carts", cartSchema);
