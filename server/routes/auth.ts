// Deps
import express from "express";

// Middlewares
import { requireSignIn } from "../middlewares";
// Express Router
const router = express.Router();

// Controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  allUsers,
  getUser,
} = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({
    data: "hello world from kaloraat auth API",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/users", allUsers);
router.get("/user", getUser);

// Auth check middleware
router.get("/auth-check", requireSignIn, (req, res) => {
  res.json({ ok: true });
});

export default router;
