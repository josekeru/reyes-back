import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const db = new Sequelize(
  process.env.DB_NAME || "lista_evento",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "passRoot14.",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306, // parsea a número si existe
    dialect: "mysql",
    logging: false, // puedes cambiar a true para ver queries en consola
  }
);

export const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("MySQL conectado correctamente con Sequelize");
    await db.sync(); // crea tablas si no existen, puedes quitar si no quieres que sincronice automático
  } catch (err) {
    console.error("Error conectando a MySQL con Sequelize:", err);
    process.exit(1);
  }
};
