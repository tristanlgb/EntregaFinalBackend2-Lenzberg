import { Router } from "express";
import { finalizePurchase } from "../controllers/cart.controller.js";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";

const router = Router();
router.use(passport.authenticate("jwt", { session: false }));

router.post("/:cid/purchase", authorization("buyer"), finalizePurchase);

export default router;
