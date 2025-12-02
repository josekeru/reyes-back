import { Router } from "express";
import {
  createParticipant,
  updateParticipant,
  getParticipantById,
  getParticipantsByEdition,
  deleteParticipant,
} from "../controllers/participants.controller.js";

const router = Router();

router.post("/", createParticipant);
router.put("/:id", updateParticipant);
router.get("/:id", getParticipantById);
router.get("/edition/:editionId", getParticipantsByEdition);
router.delete("/:id", deleteParticipant);

export default router;
