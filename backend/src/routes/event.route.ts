import { Router } from "express";
import { upload } from "../utils/multer";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/event.controller";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);

//Admin routes
router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  upload.single("photo"),
  createEvent
);
router.put("/:id", authenticate, authorize(["ADMIN"]), updateEvent);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteEvent);

export default router;
