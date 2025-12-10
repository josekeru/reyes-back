import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const User = db.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: "users",   // 👈 SOLUCIÓN PRINCIPAL
  freezeTableName: true // 👈 Evita que Sequelize lo pluralice
});
