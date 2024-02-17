import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAvatar = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      return res.json(user.avatar);
    }
    res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const uploadAvatar = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  let imagePath: string | null = null;
  try {
    if (req.file) {
      if (process.env.UPLOADS_URL) {
        imagePath =
          process.env.UPLOADS_URL +
          `/users/${userId}/` +
          (req.file?.filename || "");
      } else {
        console.error("UPLOADS_URL is not defined in process.env");
        return res
          .status(500)
          .json({ error: "UPLOADS_URL is not defined in process.env" });
      }
    } else {
      return res
        .status(500)
        .json({ error: "req.file is not defined in request body" });
    }
    console.log(imagePath);
    const savedAvatar = await prisma.user.update({
      where: { id: userId },
      data: {
        avatar: imagePath,
      },
    });

    if (savedAvatar) {
      res.json(imagePath);
    } else {
      res.status(500).json({ error: "Avatar Saving Error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
