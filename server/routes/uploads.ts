// Deps
import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";

// Controllers
import * as uploadController from "../controllers/uploads";
import { validateUpload } from "../middlewares/validateUpload";

// Express Router
const router = express.Router();

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.params.userId;
    const userUploadsPath = path.join("uploads", "users", userId);

    // Создайте папку для пользователя, если её нет
    if (!fs.existsSync(userUploadsPath)) {
      fs.mkdirSync(userUploadsPath, { recursive: true });
    }

    cb(null, userUploadsPath);
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const extension = path.extname(originalname);
    const filename = path.basename(originalname, extension);

    // Используйте, например, timestamp для уникального имени файла
    const uniqueFilename = `avatar${extension}`;

    cb(null, uniqueFilename);
  },
});

// Multer upload
const avatarUpload = multer({ storage: avatarStorage });

router.post(
  "/avatar/:userId",
  validateUpload,
  avatarUpload.single("avatar"),
  uploadController.uploadAvatar
);

router.get("/avatar/:userId", uploadController.getAvatar);

export default router;
