// Deps
import express, { Request } from "express";

// Middlewares
import { requireSignIn } from "../middlewares";
// Express Router
const router = express.Router();

// Controllers
import {
  signup,
  signin,
  // forgotPassword,
  // resetPassword,
  // allUsers,
  getUser,
} from "../controllers/auth";

// router.get("/", (req, res) => {
//   return res.json({
//     data: "hello world from kaloraat auth API",
//   });
// });
router.post("/signup", signup);
router.post("/signin", signin);
// Auth check middleware
router.get("/auth-check", requireSignIn, (req: Request, res) => {
  res.status(200).json({ ok: true });
});
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);
// router.get("/users", allUsers);
router.get("/:userId", getUser);

export default router;
