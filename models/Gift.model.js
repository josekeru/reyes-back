import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import { Participant } from "./Participant.model.js";
import { User } from "./User.model.js";

export const Gift = db.define(
  "Gift",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    participant_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    preference: { type: DataTypes.INTEGER, defaultValue: 99 },
    name: { type: DataTypes.STRING(255), allowNull: false },
    siteGift: { type: DataTypes.STRING(1000) },
    link: { type: DataTypes.STRING(500) },
    price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
    status: {
      type: DataTypes.ENUM("lista", "envio", "recibido", "comprado"),
      defaultValue: "lista",
    },
    statusActual: {
      type: DataTypes.ENUM("lista", "envio", "recibido", "comprado"),
      defaultValue: "lista",
    },
    isOnlyList: { type: DataTypes.BOOLEAN, defaultValue: false },
    date_bought: { type: DataTypes.DATE, allowNull: true },
    date_sent: { type: DataTypes.DATE, allowNull: true },
    date_received: { type: DataTypes.DATE, allowNull: true },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "gifts",   // 👈 SOLUCIÓN PRINCIPAL
    freezeTableName: true,
    timestamps: false
  }
);

// RELACIONES
Participant.hasMany(Gift, {
  foreignKey: "participant_id",
  onDelete: "CASCADE"
});
Gift.belongsTo(Participant, { foreignKey: "participant_id" });

User.hasMany(Gift, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});
Gift.belongsTo(User, { foreignKey: "user_id" });