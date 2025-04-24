import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllBookings = async (req: Request, res: Response) => {
  const bookings = await prisma.booking.findMany({
    include: { event: true, user: true },
  });

  res.json(bookings);
};
