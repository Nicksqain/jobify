import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getOutgoingResponses = async (req: Request, res: Response) => {
  const userId = req.params.userId; // Получаем идентификатор пользователя из запроса

  try {
    const outgoingResponses = await prisma.taskResponse.findMany({
      where: {
        userId: userId,
      },
      include: {
        User: true,
        order: true,
      },
    });

    res.json(outgoingResponses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Получение входящих откликов
export const getIncomingResponses = async (req: Request, res: Response) => {
  const userId = req.params.userId; // Получаем идентификатор пользователя из запроса

  try {
    const incomingResponses = await prisma.taskResponse.findMany({
      where: {
        order: {
          userId: userId,
        },
      },
      include: {
        User: true,
        order: true,
      },
    });

    res.json(incomingResponses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
