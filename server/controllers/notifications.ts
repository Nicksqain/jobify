import { Request, Response, NextFunction } from "express";
import { Order, PrismaClient } from "@prisma/client";
import { getUserIdByRequest } from "../helpers/auth";
const prisma = new PrismaClient();

export const getNotifications = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: userId },
      // include: {
      //   user: {
      //     select: {
      //       fullname: true,
      //     },
      //   },
      // },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(notifications);
  } catch (error) {
    return res.status(400).send("Уведомлений не найдено!");
  }
};
