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

// GET all gifts from a id
export const getGiftsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const gifts = await Gift.findAll({
      where: { user_id: userId },
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

// CREATE gift with code invitado
export const createGiftWithCode = async (req, res) => {
  try {
    let code = await generateUniqueCode();
    const newGift = await Gift.create(req.body);
    res.json({ msg: "Regalo añadido", newGift,  code: code });    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating gift" });
  }
};

async function generateUniqueCode() {
  let code = generateCode();
  let exists = await Gift.findOne({ where: { participant_id: code } });
  // Si existe, generar otro hasta que no exista
  while (exists) {
    code = generateCode();
    exists = await Gift.findOne({ where: { participant_id: code } });
  }
  return code;
}
function generateCode() {
  // return Math.random().toString(36).substring(2, 8).toUpperCase(); // Ej: "A9F3K2"
  return Math.floor(100000 + Math.random() * 900000).toString(); // Ej: "483920"
}

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
