// Deps
import express, { Request, Response } from "express";

// Express Router
const router = express.Router();

// Controllers
import * as projectController from "../controllers/projects";

router.get("/", projectController.getProjects);
router.get("/:userId", projectController.getUserProjects);
router.post("/", projectController.createProject);

export default router;
