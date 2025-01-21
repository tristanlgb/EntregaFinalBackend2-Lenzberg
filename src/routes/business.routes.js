import { Router } from "express";
import { getBusiness, getBusinessById, addProduct } from "../controllers/business.controller.js";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";

const router = Router();
router.use(passport.authenticate("jwt", { session: false }));

router.get("/", authorization("buyer"), getBusiness);
router.get("/:id", authorization("buyer"), getBusinessById);
router.post("/:id/product", authorization("business"), addProduct);

export default router;
