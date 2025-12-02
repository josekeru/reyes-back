import { db } from "../config/db.js";
import bcrypt from "bcryptjs";  // para encriptar contraseña, opcional pero recomendable

export const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    // Verificar si el usuario ya existe
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ msg: "Usuario ya registrado" });
    }

    // Encriptar password (opcional, muy recomendable)
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Insertar usuario
    const [result] = await db.query(
      "INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, phone]
    );

    res.status(201).json({ 
      msg: "Usuario registrado con éxito", 
      userId: result.insertId 
    });
  } catch (error) {
    console.error("Error registrando usuario:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};
