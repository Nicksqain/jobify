// Deps
import express, { Request, Response } from "express";

// Express Router
const usersRouter = express.Router();

// Controllers
import * as usersController from "../controllers/users";

// router.get("/", notificationController.getAllNotifications);
usersRouter.get("/:userId", usersController.getUserInfo);

export default usersRouter;
