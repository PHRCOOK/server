import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { User } from "./user.models.js"; // Importamos el modelo User para establecer la relación

// Definir el modelo de Contacto (Contact)
export const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // Referencia al modelo `User`
        key: "id",
      },
      allowNull: true, // userId es opcional en este caso
    },
  },
  {
    tableName: "Contact",
    timestamps: false, // No usamos timestamps, ya que la fecha no está definida explícitamente
  }
);

// Establecer la relación de "uno a muchos" entre User y Contact
User.hasMany(Contact, { foreignKey: "userId" });
Contact.belongsTo(User, { foreignKey: "userId" });
