// models/Event.model.js
import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const Event = db.define("event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false, },
  precioTotalGastadoTotal: { type: DataTypes.INTEGER },
  isOnlyList: { type: DataTypes.BOOLEAN, defaultValue: false },
}, 
  {
    tableName: "events",   // 👈 SOLUCIÓN PRINCIPAL
    freezeTableName: true,
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  });

// Relaciones
import { User } from "./User.model.js";
User.hasMany(Event, { foreignKey: "userId" });
Event.belongsTo(User, { foreignKey: "userId" });
