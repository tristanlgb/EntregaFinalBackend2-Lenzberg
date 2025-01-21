import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your email (set in .env)
        pass: process.env.EMAIL_PASS  // Your email password (set in .env)
    }
});
