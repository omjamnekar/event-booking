import { Request, Response } from "express";
import { bookEventService } from "../services/booking.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const bookEvent = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const eventId = Number(req.params.eventId);

  const booking = await bookEventService(userId, eventId);

  res.status(201).json(booking);
};

export const getUserBookings = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: { event: true },
  });
  res.json(bookings);
};
export const cancelBooking = async (req: Request, res: Response) => {
  const bookingId = Number(req.params.id);
  const userId = (req as any).user.id;

  console.log("Attempting to cancel booking", { bookingId, userId });

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  console.log("Booking found?", booking);

  if (!booking || booking.userId !== userId) {
    console.log("Unauthorized or not found.");
    res.status(404).json({ error: "Booking not found or unauthorized" });
    return;
  }

  await prisma.booking.delete({ where: { id: bookingId } });
  res.json({ message: "Booking cancelled" });
};
