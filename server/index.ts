import express from "express";
import cors from "cors";
import http from "http";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth";
import ordersRoutes from "./routes/orders";
import projectsRoutes from "./routes/projects";
import responsesRoutes from "./routes/responses";
import uploadsRoutes from "./routes/uploads";
import statsRoutes from "./routes/stats";
import notificationsRoutes from "./routes/notifications";
import usersRoutes from "./routes/users";
import morgan from "morgan";
import initSocket from "./socket";
var bodyParser = require("body-parser");
const prisma = new PrismaClient();
const app = express();

const server = http.createServer(app);
app.use(cors());
const io = initSocket(server);
const setSecurityHeaders = (_: Request, res: Response, next: NextFunction) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Добавлен OPTIONS
    "Access-Control-Allow-Headers": "Content-Type", // Добавлено для разрешения Content-Type
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Cross-Origin-Resource-Policy": "same-site",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Referrer-Policy": "no-referrer",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Expect-CT": "enforce, max-age=86400",
    "Content-Security-Policy": `object-src 'none'; script-src 'self'; img-src 'self'; frame-ancestors 'self'; require-trusted-types-for 'script'; block-all-mixed-content; upgrade-insecure-requests`,
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=()",
  });
  next();
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.disable("x-powered-by");
app.use(setSecurityHeaders);

app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));

// // Добавьте эту строку, чтобы Express раздавал статику из папки /uploads
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);

app.use("/notifications", notificationsRoutes);
app.use("/users", usersRoutes);
app.use("/projects", projectsRoutes);
app.use("/uploads", uploadsRoutes);
app.use("/responses", responsesRoutes);
app.use("/orders", ordersRoutes(io));
app.use("/stats", statsRoutes);

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

server.listen(8000, () => console.log("Server running on port 8000"));
