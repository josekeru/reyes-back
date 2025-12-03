// controllers/giftsController.js
import { Gift } from "../models/Gift.model.js";

// GET all gifts from a participant
export const getGiftsByParticipant = async (req, res) => {
  try {
    const { participantId } = req.params;

    const gifts = await Gift.findAll({
      where: { participant_id: participantId },
      order: [['preference', 'ASC']]
    });

    res.json(gifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching gifts" });
  }
};

// Obtener por ID
export const getGiftsById = async (req, res) => {
  const gift = await Gift.findByPk(req.params.id);
  if (!gift)
    return res.status(404).json({ msg: "Regalo no encontrado" });
  res.json(gift);
};

// CREATE gift
export const createGift = async (req, res) => {
  try {
    const newGift = await Gift.create(req.body);
    res.json({ msg: "Regalo añadido", newGift });    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating gift" });
  }
};

// UPDATE gift
export const updateGift = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Gift.update(req.body, {
      where: { id }
    });

    res.json({ message: "Gift updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating gift" });
  }
};

// DELETE gift
export const deleteGift = async (req, res) => {
  try {
    const { id } = req.params;

    await Gift.destroy({
      where: { id }
    });

    res.json({ message: "Gift deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting gift" });
  }
};
