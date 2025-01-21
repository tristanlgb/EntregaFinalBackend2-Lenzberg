import mongoose from "mongoose";


const passwordResetSchema = new mongoose.Schema({
    email: { type: String, required: true },
    resetToken: { type: String, required: true },
    expirationTime: { type: Date, required: true, default: () => Date.now() + 3600000 } // 1-hour expiration
});

export default mongoose.model("passwordResets", passwordResetSchema);
