import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserIdByRequest } from "../helpers/auth";
const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        orders: true,
      },
    });
    return res.json(projects);
  } catch (error) {
    return res.status(500).send("Server error!");
  }
};
export const getUserProjects = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
      include: {
        orders: true,
      },
    });
    return res.json(projects);
  } catch (error) {
    return res.status(500).send("Server error!");
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, shortDescription, orderIds } = req.body;
    const creatorId = await getUserIdByRequest(req);
    const projects = await prisma.project.create({
      data: {
        name,
        shortDescription,
        orders: {
          connect: orderIds.map((orderId: number) => ({ id: orderId })),
        },
        userId: creatorId,
      },
      include: {
        orders: true,
      },
    });
    return res.json({ projects, ok: true });
  } catch (error) {
    return res.status(500).send("Server error!");
  }
};
