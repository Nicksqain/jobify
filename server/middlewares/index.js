import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

// import Task from "../models/task";
// import User from "../models/user";

const prisma = new PrismaClient();
export const requireSignIn = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await prisma.user.findFirst({
      where: { id: decoded._id },
    });
    if (!user) {
      return res.status(401).json("Session was been expired!");
    }
    req.user = decoded;
    next();
  } catch (error) {
    if (error) {
      console.log(error);
    }
    if (error.name == "TokenExpiredError") {
      // return { payload: jwt.decode(token), expired: true };
    }

    return res.status(403).json(error);
  }
};
// export const canChangeTask = async (req, res, next) => {
//   try {
//     const task = await Task.findById(req.params.taskId);
//     const user = await User.findById(req.user._id);
//     console.log(user);
//     if (user.role === "Admin") {
//       next();
//     } else if (task.postedBy._id.toString() !== req.user._id.toString()) {
//       return res.status(401).send("Unauthorized");
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json(error);
//   }
// };
