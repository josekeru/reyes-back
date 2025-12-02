import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { registerUser } from "./controllers/registerUsers.controller.js";
import { loginUser } from "./controllers/loginUsers.controller.js";
import eventRoutes from "./routes/event.routes.js";
import participantRoutes from "./routes/participants.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

async function main() {
  try {
    await connectDB();
    console.log("Conectado a la DB");

    // Montar rutas
    app.use("/register", registerUser);
    app.use("/login", loginUser);
    app.use("/events", eventRoutes);
    app.use("/participants", participantRoutes);

    app.get("/", (req, res) => res.send("Servidor activo"));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Servidor funcionando en puerto ${PORT}`));
  } catch (error) {
    console.error("Error iniciando servidor:", error);
  }
}

main();
