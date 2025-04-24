import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

interface AuthData {
  name?: string;
  email: string;
  password: string;
  role: Role;
}

export const registerUser = async ({
  name,
  email,
  password,
  role,
}: AuthData) => {
  if (!email) throw new Error("Email is required");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name || "",
      email,
      password: hashedPassword,
      role: role || "USER",
    },
  });

  const token = generateToken(user.id, user.role);

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

export const loginUser = async ({ email, password }: AuthData) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user.id, user.role);
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};
