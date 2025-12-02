import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "passRoot14.",
  database: process.env.DB_NAME || "lista_evento",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const connectDB = async () => {
  try {
    const connection = await db.getConnection();
    console.log("MySQL conectado correctamente");
    connection.release();
  } catch (error) {
    console.error("Error conectando a MySQL:", error);
    process.exit(1);
  }
};
