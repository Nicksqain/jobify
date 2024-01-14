// Deps
import express, { Request, Response } from "express";

// Express Router
const router = express.Router();

// Controllers
import * as notificationController from "../controllers/notifications";

// router.get("/", notificationController.getAllNotifications);
router.get("/:userId", notificationController.getNotifications);

export default router;
