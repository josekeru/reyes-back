import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const Participant = db.define("Participant", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    edition_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(150), allowNull: false },
    precioTotalGastado: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
    regalosDeseados: { type: DataTypes.INTEGER },
    regalosComprados: { type: DataTypes.INTEGER },
    regalosEnviados: { type: DataTypes.INTEGER },
    regalosRecibidos: { type: DataTypes.INTEGER },
  },
  {
    tableName: "participants",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false, // porque NO tienes updated_at
  }
);

// 🔗 RELACIÓN
import { Event } from "./Event.model.js";
Event.hasMany(Participant, { foreignKey: "edition_id", onDelete: "CASCADE" });
Participant.belongsTo(Event, { foreignKey: "edition_id" });
