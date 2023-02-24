import express from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
var bodyParser = require("body-parser");
const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});
app.get("/feed", async (req, res) => {
  const posts = await prisma.user.findMany();
  res.json(posts);
});
app.post("/feed", async (req: Request, res: Response, next: NextFunction) => {
  const { fullname, email, password, role, status } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        fullname,
        password,
        role,
        status,
      },
    });
    res.status(200).json(user);

    console.log(req.body);
  } catch (error) {
    console.log(req.body);
    next(error);
  }
});
app.listen(8000, () => {
  console.log("Application started on port 3000!");
});
