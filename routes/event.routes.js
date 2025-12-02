import express from "express";
import {
  createEvent,
  updateEvent,
  getEventById,
  getEventsByUser,
  deleteEvent
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", createEvent);
router.put("/:id", updateEvent);
router.get("/:id", getEventById);
router.get("/user/:userId", getEventsByUser);
router.delete("/:id", deleteEvent);

export default router;
