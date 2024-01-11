import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
export const getUserIdByRequest = (req) => {
  const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
  return decoded._id;
};
