import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEventService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = query.search?.toLowerCase();

  return await prisma.event.findMany({
    where: search
      ? {
          title: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {},
    skip,
    take: limit,
    orderBy: {
      date: "asc",
    },
  });
};

export const getEventByIdService = (id: number) =>
  prisma.event.findUnique({ where: { id } });

export const createEventService = (data: {
  title: string;
  description: string;
  date: Date;
  tickets: number;
  photo: string;
}) => prisma.event.create({ data });

export const updateEventService = (id: number, data: any) =>
  prisma.event.update({ where: { id }, data });

export const deleteEventService = async (id: number) => {
  const existing = await prisma.event.findUnique({ where: { id } });

  if (!existing) {
    throw new Error("Event not found");
  }

  return prisma.event.delete({ where: { id } });
};
