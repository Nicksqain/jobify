import { Request, Response, NextFunction } from "express";
import { Order, PrismaClient } from "@prisma/client";
import { getUserIdByRequest } from "../helpers/auth";
import { MyIo } from "socket";
const prisma = new PrismaClient();

enum OrderStatus {
  PENDING_APPROVAL = "pending_approval",
  // CREATED = "created",
  PUBLISHED = "published",
  INPROGRESS = "inprogress",
  COMPLETED = "completed",
}
enum PlaceOfService {
  AT_MY_PLACE = "myPlace",
  FREELANCER_PLACE = "freelancerPlace",
  DONT_MATTER = "dontMatter",
}
interface OrderData {
  orderName: string;
  category: string;
  placeOfService: PlaceOfService;
  description: string;
  budgetMin: number;
  budgetMax: number;
  userId: string;
  agreedBudget?: number;
  status?: OrderStatus | undefined;
  completionDate?: Date;
  plannedCompletionDate?: Date;
}
export const createOrder = async (req: Request, res: Response) => {
  console.log("HIT create order");
  try {
    const userId = await getUserIdByRequest(req);
    // validation
    const {
      orderName,
      category,
      placeOfService,
      description,
      budgetMin,
      budgetMax,
      agreedBudget,
      status,
      completionDate,
      plannedCompletionDate,
    }: OrderData = req.body;
    req.body.userId = userId;
    console.log(req.body);
    try {
      const user = await prisma.user.findFirst({ where: { id: userId } });
      if (!user) {
        return res.status(400).send("User is not found!");
      }
      if (!placeOfService) {
        return res.status(400).send("Place of service is not defined!");
      }
      const order = await prisma.order.create({
        data: {
          orderName,
          userId: userId,
          category,
          placeOfService,
          description,
          budgetMin,
          budgetMax,
          agreedBudget,
          status,
          completionDate,
          plannedCompletionDate,
        },
      });

      // Если приходящий диапазон бюджета не соответствует
      if (process.env.BUDGET_MIN && process.env.BUDGET_MAX) {
        const minBudget = parseInt(process.env.BUDGET_MIN, 10);
        const maxBudget = parseInt(process.env.BUDGET_MAX, 10);
        if (
          order.budgetMin < minBudget ||
          order.budgetMin > maxBudget ||
          order.budgetMax < minBudget ||
          order.budgetMax > maxBudget
        ) {
          return res.status(400).send({ error: "Range is incorrect!" });
        }
      }

      return res.json(order);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: err });
    }
  } catch (err) {
    return res.status(400).send({ error: err });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const orders = await prisma.order.findMany({
      where: { status: (status as OrderStatus) ?? "published" },
      include: {
        user: {
          select: {
            fullname: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(orders);
  } catch (error) {
    return res.status(400).send("Заказов не найдено!");
  }
};
export const getOrders = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const orders = await prisma.order.findMany({
      where: { userId: userId },
      include: {
        user: {
          select: {
            fullname: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(orders);
  } catch (error) {
    return res.status(400).send("Заказов не найдено!");
  }
};

// Изменение статуса заказа
export const updateOrderStatus = async (
  req: Request,
  res: Response,
  io: MyIo
) => {
  try {
    // Получение данных заказа
    const { orderId } = req.params;
    const { status, reason, commentType } = req.body;

    const moderationComment = commentType === "Moder" ? reason : null;
    if (!status) {
      return res.status(400).json({ error: "Не введен изменяемый статус" });
    }

    // Обновление статуса заказа
    await prisma.order.update({
      where: { id: parseInt(orderId, 10) },
      data: {
        status,
        updatedAt: new Date(),
      },
    });

    // Получение айди юзера изменяемого заказа
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      select: { userId: true }, // Выбираем только userId
    });

    const userId = order?.userId;
    // Создание уведомления

    if (reason) {
      const notification = await prisma.notification.create({
        data: {
          message: `Ваш статус заказа был изменен на ${status}, по причине: ${reason}`,
          reason,
          object: orderId,
          source: moderationComment ? "moderation" : null,
          type: "task_rejected",
          user: {
            connect: { id: userId },
          },
        },
      });
      io.to(userId as string).emit("notification", notification);
    }

    return res.status(200).json({ message: "Статус заказа успешно обновлен." });
  } catch (error) {
    console.error("Ошибка при обновлении статуса заказа:", error);
    return res.status(500).json({ error: "Произошла ошибка сервера." });
  }
};
