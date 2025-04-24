import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const bookEventService = async (userId: number, eventId: number) => {
  const event = await prisma.event.findUnique({ where: { id: eventId } });

  if (!event) throw new Error("Event");
  if (event.tickets <= 0) throw new Error("No tickets available");

  await prisma.event.update({
    where: { id: eventId },
    data: { tickets: event.tickets - 1 },
  });

  return prisma.booking.create({
    data: { userId, eventId },
  });
};
