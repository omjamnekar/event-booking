import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersercet";

export const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
