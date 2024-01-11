// Deps
import express, { Request, Response } from "express";

// Middlewares
import { requireSignIn } from "../middlewares";
// Express Router
const router = express.Router();

// Controllers
import * as orderController from "../controllers/orders";

router.get("/", orderController.getAllOrders);
router.get("/:userId", orderController.getOrders);
router.post("/", orderController.createOrder);
router.patch("/:orderId/status", orderController.updateOrderStatus);

// Auth check middleware
// router.get("/auth-check", requireSignIn, (req: Request, res: Response) => {
//   res.status(500).json({ ok: true });
// });

export default router;
