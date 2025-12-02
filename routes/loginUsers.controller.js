import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar por username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login correcto",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      }
    });

  } catch (err) {
    res.status(500).json({ msg: "Error en login", error: err });
  }
};
