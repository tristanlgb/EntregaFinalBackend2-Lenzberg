import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import passport from "passport";

const router = Router();

router.post("/register", passport.authenticate("register", { session: false }), register);
router.post("/login", passport.authenticate("login", { session: false }), login);
router.get("/logout", logout);

export default router;
