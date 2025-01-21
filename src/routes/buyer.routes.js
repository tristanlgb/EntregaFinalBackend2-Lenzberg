import { Router } from "express";
import { getBuyers, getBuyerById } from "../controllers/buyer.controller.js";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";

const router = Router();
router.use(passport.authenticate("jwt", { session: false }));

router.get("/", authorization("business"), getBuyers);
router.get("/:id", authorization("business"), getBuyerById);

export default router;
