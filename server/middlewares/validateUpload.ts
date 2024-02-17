import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { isImageFile } from "../helpers/file";
const prisma = new PrismaClient();

export const validateUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  next();
};
