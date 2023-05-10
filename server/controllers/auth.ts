import { hashPassword, comparePassword } from "../helpers/auth";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import nanoid from "nanoid";

// sendgrid
// require("dotenv").config();
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_KEY);

export const signup = async (req: Request, res: Response) => {
  console.log("HIT SIGNUP");
  try {
    // validation
    const { name, email, password, status } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    console.log(req.body);
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!status) {
      return res.json({
        error: "Status is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const exist = await prisma.user.findUnique({ where: { email: email } });

    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    try {
      // Mongo

      // const user = await new User({
      //   name,
      //   email,
      //   password: hashedPassword,
      //   status,
      // }).save();

      // Postgres

      const user = await prisma.user.create({
        data: {
          email,
          fullname: name,
          password: hashedPassword,
          status: status,
        },
      });

      // create signed token
      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      //   console.log(user);
      const { password, ...rest } = user;
      return res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return res.status(400).send({
        error: "No user founds",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    user.password = undefined!;
    // user.secret = undefined!;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   // find user by email
//   const user = await User.findOne({ email });
//   console.log("USER ===> ", user);
//   if (!user) {
//     return res.json({ error: "User not found" });
//   }
//   // generate code
//   const resetCode = nanoid(5).toUpperCase();
//   // save to db
//   user.resetCode = resetCode;
//   user.save();
//   // prepare email
//   const emailData = {
//     from: process.env.EMAIL_FROM,
//     to: user.email,
//     subject: "Password reset code",
//     html: "<h1>Your password  reset code is: {resetCode}</h1>",
//   };
//   // send email
//   try {
//     const data = await sgMail.send(emailData);
//     console.log(data);
//     res.json({ ok: true });
//   } catch (err) {
//     console.log(err);
//     res.json({ ok: false });
//   }
// };

// export const resetPassword = async (req, res) => {
//   try {
//     const { email, password, resetCode } = req.body;
//     // find user based on email and resetCode
//     const user = await User.findOne({ email, resetCode });
//     // if user not found
//     if (!user) {
//       return res.json({ error: "Email or reset code is invalid" });
//     }
//     // if password is short
//     if (!password || password.length < 6) {
//       return res.json({
//         error: "Password is required and should be 6 characters long",
//       });
//     }
//     // hash password
//     const hashedPassword = await hashPassword(password);
//     user.password = hashedPassword;
//     user.resetCode = "";
//     user.save();
//     return res.json({ ok: true });
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const getUser = async (req, res) => {
//   try {
//     const userId = req.query.userId;
//     const username = req.query.username;

//     const user = userId
//       ? await User.findById(userId)
//       : await User.findOne({ name: username });

//     const { password, updatedAt, ...other } = user._doc;

//     return res.json(other);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// export const allUsers = async (req, res) => {
//   try {
//     // const { email, password, resetCode } = req.body;
//     // get all users
//     const users = await User.find({}).select("-password");
//     // if user not found
//     return res.json(users);
//   } catch (err) {
//     console.log(err);
//   }
// };
