// Deps
import express from "express";

// Express Router
const router = express.Router();

// Controllers
import * as responseController from "../controllers/responses";

// Маршруты для исходящих откликов
router.get("/outgoing/:userId", responseController.getOutgoingResponses);

// Маршруты для входящих откликов
router.get("/incoming/:userId", responseController.getIncomingResponses);

export default router;
