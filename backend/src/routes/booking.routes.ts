import { Router } from "express";
import {
  bookEvent,
  cancelBooking,
  getUserBookings,
} from "../controllers/booking.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.post("/:eventId", authenticate, authorize(["USER"]), bookEvent);
router.get("/", authenticate, getUserBookings);
router.delete("/:id", authenticate, cancelBooking);

export default router;
