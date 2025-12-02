import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

// REGISTRO
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ msg: "El email ya está registrado" });
    }
    const existsUser = await User.findOne({ where: { username } });
    if (existsUser) {
      return res.status(400).json({ msg: "El usuario ya está registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.json({
      msg: "Usuario correcto",
      user: {
        id: user.id,
        username: user.username,
      }
    });

  } catch (err) {
    res.status(500).json({ msg: "Error registrando usuario", error: err });
  }
};