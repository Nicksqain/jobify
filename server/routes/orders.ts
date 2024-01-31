// Deps
import express, { Request, Response } from "express";

// Middlewares
import { requireSignIn } from "../middlewares";
// Express Router
const router = express.Router();

// Controllers
import * as orderController from "../controllers/orders";
import { MyIo } from "socket";

// Auth check middleware
// router.get("/auth-check", requireSignIn, (req: Request, res: Response) => {
//   res.status(500).json({ ok: true });
// });

export default function createOrdersRouter(io: MyIo) {
  router.get("/", orderController.getAllOrders);
  router.get("/:userId", orderController.getOrders);
  router.post("/", orderController.createOrder);
  router.post("/:orderId/response", orderController.createTaskResponse);
  router.patch("/:orderId/status", (req: Request, res: Response) => {
    orderController.updateOrderStatus(req, res, io);
  });

  return router;
}
