import { Router } from "express";
import { getOrders, createOrder, resolveOrder, getOrderById } from "../controllers/orders.controller.js";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";

const router = Router();
router.use(passport.authenticate("jwt", { session: false }));

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", authorization("buyer"), createOrder);
router.post("/:id", authorization("business"), resolveOrder);

export default router;
