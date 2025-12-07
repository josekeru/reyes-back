import { Event } from "../models/Event.model.js";
import { Gift } from "../models/Gift.model.js";

// Crear evento
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    let code = null;
    if (req.body.isOnlyList) {
      code = await generateUniqueCode();
    }
    res.json({ msg: "Evento creado", event,  code: code });
  } catch (error) {
    res.status(500).json({ msg: "Error creando evento", error });
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

// Editar evento
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ msg: "Evento no encontrado" });

    await event.update(req.body);
    res.json({ msg: "Evento actualizado", event });
  } catch (error) {
    res.status(500).json({ msg: "Error actualizando evento", error });
  }
};

// Obtener por id
export const getEventById = async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ msg: "Evento no encontrado" });
  res.json(event);
};

// Obtener eventos por usuario
export const getEventsByUser = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { userId: req.params.userId },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ msg: "Error recuperando evento", error });
  }
};

// Eliminar
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ msg: "Evento no encontrado" });

    await event.destroy();
    res.json({ msg: "Evento eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error eliminando evento", error });
  }
};
