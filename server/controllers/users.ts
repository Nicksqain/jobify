import { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";
import { excludeKeys } from "../helpers/exclude";
const prisma = new PrismaClient();

export const getUserInfo = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const userInfo = await prisma.user.findUnique({
      where: { id: userId },
    });
    const userInfoWithoutFields = excludeKeys(userInfo, [
      "password",
      "email",
    ] as (keyof User)[]);
    return res.json(userInfoWithoutFields);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Пользователь не найден!");
  }
};
