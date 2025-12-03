import { Router } from "express";
import {
  getGiftsByParticipant,
  createGift,
  updateGift,
  getGiftsById,
  deleteGift
} from "../controllers/gifts.controller.js";

const router = Router();

router.get("/participant/:participantId", getGiftsByParticipant);
router.get("/:id", getGiftsById);
router.post("/", createGift);
router.put("/:id", updateGift);
router.delete("/:id", deleteGift);


export default router;
