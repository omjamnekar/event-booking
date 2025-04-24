import { Request, response, Response } from "express";
import {
  createEventService,
  deleteEventService,
  getAllEventService,
  getEventByIdService,
  updateEventService,
} from "../services/event.service";

export const getAllEvents = async (req: Request, res: Response) => {
  const events = await getAllEventService(req.query);
  res.json(events);
};

export const getEventById = async (req: Request, res: Response) => {
  const event = await getEventByIdService(Number(req.params.id));
  res.json(event);
};

export const createEvent = async (req: Request, res: Response) => {
  const photo = req.file?.filename ?? "";
  const { title, description, tickets, date } = req.body;

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    res.status(400).json({ error: "Invalid date format" });
    return;
  }

  const newEvent = await createEventService({
    title,
    description,
    tickets: Number(tickets),
    date: parsedDate, // ✅ valid Date object
    photo,
  });

  res.status(201).json(newEvent);
};

export const updateEvent = async (req: Request, res: Response) => {
  const updated = await updateEventService(Number(req.params.id), req.body);
  res.json(updated);
};

export const deleteEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deleted = await deleteEventService(id);
    res.json({ message: "Event deleted", deleted });
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
