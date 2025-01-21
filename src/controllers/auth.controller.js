import { generateToken } from "../utils/generateToken.js";
import passwordResetModel from "../models/passwordReset.model.js";
import { v4 as uuidv4 } from 'uuid';
import { transport } from "../config/transportEmail.js";

export const login = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ message: "Registration failed" });

        const token = generateToken(req.user);
        res.cookie('coderPracticaIntegrado', token, { httpOnly: true })
           .json({ status: "success", message: "Ok login" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const register = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ message: "Registration failed" });

        const token = generateToken(req.user);
        res.cookie('coderPracticaIntegrado', token, { httpOnly: true })
           .status(201).json({ status: "success", message: "User registered" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie('coderPracticaIntegrado')
       .json({ status: "success", message: "Ok logout" });
};

export const github = (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Invalid credentials" });

        const token = generateToken(req.user);
        res.cookie('coderPracticaIntegrado', token, { httpOnly: true })
           .json({ status: "success", message: "Login ok" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const passwordReset = async (req, res) => {
    const { email } = req.body;
    const resetToken = uuidv4();
    const expirationTime = Date.now() + 3600000; // Token expires in 1 hour

    try {
        const result = await passwordResetModel.updateOne(
            { email },
            { resetToken, expirationTime },
            { upsert: true } // Creates a new record if the email does not exist
        );

        await transport.sendMail({
            from: 'Coder Tests <tristan123@gmail.com>',
            to: email,
            subject: 'Reset password',
            html: `
                <div>
                    <h1>Click the link below to reset your password:</h1>
                    <p><a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a></p>
                </div>
            `,
        });

        res.json({ status: "success", message: "Password reset email sent", result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
