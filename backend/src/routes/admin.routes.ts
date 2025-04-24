import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { getAllBookings } from "../controllers/admin.controller";

const router = Router();

router.get("/book", authenticate, authorize(["ADMIN"]), getAllBookings);

export default router;
