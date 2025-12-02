import { Participant } from "../models/Participant.model.js";

// Crear participant
export const createParticipant = async (req, res) => {
  try {
    const participant = await Participant.create(req.body);
    res.json({ msg: "Participante creado", participant });
  } catch (error) {
    res.status(500).json({ msg: "Error creando participante", error });
  }
};

// Editar participant
export const updateParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (!participant)
      return res.status(404).json({ msg: "Participante no encontrado" });

    await participant.update(req.body);
    res.json({ msg: "Participante actualizado", participant });
  } catch (error) {
    res.status(500).json({ msg: "Error actualizando participante", error });
  }
};

// Obtener por ID
export const getParticipantById = async (req, res) => {
  const participant = await Participant.findByPk(req.params.id);
  if (!participant)
    return res.status(404).json({ msg: "Participante no encontrado" });
  res.json(participant);
};

// Obtener por edición
export const getParticipantsByEdition = async (req, res) => {
  const participants = await Participant.findAll({
    where: { edition_id: req.params.editionId },
  });
  res.json(participants);
};

// Eliminar
export const deleteParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (!participant)
      return res.status(404).json({ msg: "Participante no encontrado" });

    await participant.destroy();
    res.json({ msg: "Participante eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error eliminando participante", error });
  }
};
