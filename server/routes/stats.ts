// Deps
import express, { Request, Response } from "express";

// Middlewares
import { requireSignIn } from "../middlewares";
// Express Router
const router = express.Router();

// Controllers
import { getStats } from "../controllers/stats";

router.get("/", getStats);

// Auth check middleware
// router.get("/auth-check", requireSignIn, (req: Request, res: Response) => {
//   res.status(500).json({ ok: true });
// });

export default router;
