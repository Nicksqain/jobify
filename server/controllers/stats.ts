import { Order, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
export const getStats = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    // Получение сегодняшней даты
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Получение даты недели назад
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Получение даты месяца назад
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Получение даты года назад
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Получение созданных и завершенных заказов за сегодняшние сутки
    const [ordersCreatedToday, ordersCompletedToday] = await Promise.all([
      prisma.order.count({
        where: {
          userId: userId,
          createdAt: {
            gte: today,
          },
        },
      }),
      prisma.order.count({
        where: {
          userId: userId,
          completionDate: {
            gte: today,
          },
        },
      }),
    ]);

    // Получение созданных и завершенных заказов за неделю
    const [ordersCreatedThisWeek, ordersCompletedThisWeek] = await Promise.all([
      prisma.order.count({
        where: {
          userId: userId,
          createdAt: {
            gte: oneWeekAgo,
          },
        },
      }),
      prisma.order.count({
        where: {
          userId: userId,
          completionDate: {
            gte: oneWeekAgo,
          },
        },
      }),
    ]);

    // Получение созданных и завершенных заказов за месяц
    const [ordersCreatedThisMonth, ordersCompletedThisMonth] =
      await Promise.all([
        prisma.order.count({
          where: {
            userId: userId,
            createdAt: {
              gte: oneMonthAgo,
            },
          },
        }),
        prisma.order.count({
          where: {
            userId: userId,
            completionDate: {
              gte: oneMonthAgo,
            },
          },
        }),
      ]);

    // Получение созданных и завершенных заказов за год
    const [ordersCreatedThisYear, ordersCompletedThisYear] = await Promise.all([
      prisma.order.count({
        where: {
          userId: userId,
          createdAt: {
            gte: oneYearAgo,
          },
        },
      }),
      prisma.order.count({
        where: {
          userId: userId,
          completionDate: {
            gte: oneYearAgo,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);
    // СРЕДНЕЕ ВРЕМЯ ВЫПОЛНЕНИЯ ЗАДАЧ
    // Функция для расчета среднего времени выполнения задач для всех пользователей
    async function calculateAverageExecutionTimeForAllUsers(
      startDateField: string,
      completionDateField: string,
      startDate: Date,
      endDate: Date
    ) {
      const orders = await prisma.order.findMany({
        where: {
          [startDateField]: {
            gte: startDate,
            lte: endDate,
          },
          [completionDateField]: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      let totalExecutionTime = 0;
      let numberOfCompletedOrders = 0;

      orders.forEach((order: Order) => {
        if (
          order[startDateField as keyof Order] !== null &&
          order[completionDateField as keyof Order] !== null
        ) {
          const startTime = new Date(
            order[startDateField as keyof Order] as string
          ).getTime();
          const endTime = new Date(
            order[completionDateField as keyof Order] as string
          ).getTime();
          totalExecutionTime += endTime - startTime;
          numberOfCompletedOrders++;
        }
      });

      const averageExecutionTime =
        numberOfCompletedOrders > 0
          ? totalExecutionTime / numberOfCompletedOrders
          : 0;
      // Преобразование среднего времени выполнения в часах
      const averageExecutionTimeInHours = averageExecutionTime / 3600000;

      return averageExecutionTimeInHours;
    }

    // Получение среднего времени выполнения за today для всех пользователей
    const averageExecutionTimeTodayForAllUsers =
      await calculateAverageExecutionTimeForAllUsers(
        "startExecutionDate",
        "completionDate",
        today,
        new Date(today.getTime() + 24 * 60 * 60 * 1000)
      );

    // Получение среднего времени выполнения за this week для всех пользователей
    const averageExecutionTimeThisWeekForAllUsers =
      await calculateAverageExecutionTimeForAllUsers(
        "startExecutionDate",
        "completionDate",
        oneWeekAgo,
        today
      );

    // Получение среднего времени выполнения за this month для всех пользователей
    const averageExecutionTimeThisMonthForAllUsers =
      await calculateAverageExecutionTimeForAllUsers(
        "startExecutionDate",
        "completionDate",
        oneMonthAgo,
        today
      );

    // Получение среднего времени выполнения за this year для всех пользователей
    const averageExecutionTimeThisYearForAllUsers =
      await calculateAverageExecutionTimeForAllUsers(
        "startExecutionDate",
        "completionDate",
        oneYearAgo,
        today
      );
    // Добавляем среднее время выполнения в часах в объект res.json
    res.json({
      ordersCreatedToday,
      ordersCreatedThisWeek,
      ordersCreatedThisMonth,
      ordersCreatedThisYear,
      ordersCompletedToday,
      ordersCompletedThisWeek,
      ordersCompletedThisMonth,
      ordersCompletedThisYear,

      averageExecutionTimeTodayForAllUsers,
      averageExecutionTimeThisWeekForAllUsers,
      averageExecutionTimeThisMonthForAllUsers,
      averageExecutionTimeThisYearForAllUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Внутренняя ошибка сервера");
  } finally {
    await prisma.$disconnect();
  }
};
