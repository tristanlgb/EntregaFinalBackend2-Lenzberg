import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        default: uuidv4 // Genera un código único automáticamente
    },
    purchase_datetime: {
        type: Date,
        default: Date.now // Guarda la fecha y hora exacta de la compra
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

export default mongoose.model("tickets", ticketSchema);
