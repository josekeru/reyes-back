// models/Event.model.js
import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const Event = db.define("event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false,
  },
}, {
  tableName: "events",
  timestamps: false
});

// Relaciones
import { User } from "./User.model.js";
User.hasMany(Event, { foreignKey: "userId" });
Event.belongsTo(User, { foreignKey: "userId" });
