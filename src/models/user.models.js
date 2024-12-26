// // models/user.js
// import { pool } from "../db.js";

// const createUsersTableQuery = `
//   CREATE TABLE IF NOT EXISTS Users (
//     id SERIAL PRIMARY KEY,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     name VARCHAR(255) NOT NULL,
//     address VARCHAR(255) NOT NULL,
//     dni VARCHAR(255) NOT NULL,
//     role VARCHAR(50) DEFAULT 'client' NOT NULL
//   );
// `;

// export const createUsersTable = async () => {
//   try {
//     const client = await pool.connect();
//     await client.query(createUsersTableQuery);
//     console.log("Tabla `Users` creada (si no existía).");
//     client.release();
//   } catch (err) {
//     console.error("Error al crear la tabla `Users`:", err.stack);
//   }
// };

import { DataTypes } from "sequelize";
import sequelize from "../db.js";

// Definir los roles de usuario
const ROLES = {
  ADMIN: "admin",
  VENDOR: "vendor",
  CLIENT: "client",
  SHIPMENT: "shipment",
};

// Definir el modelo de Usuario
export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ROLES.CLIENT, // Valor por defecto para clientes
      validate: {
        isIn: {
          args: [[ROLES.ADMIN, ROLES.VENDOR, ROLES.CLIENT, ROLES.SHIPMENT]],
          msg: "Role must be one of: admin, vendor, client, shipment",
        },
      },
    },
  },
  {
    // Opciones adicionales
    tableName: "Users",
    timestamps: false,
  }
);

export { ROLES };

// Crear la tabla si no existe
export const createUsersTable = async () => {
  try {
    // Sincronizar el modelo con la base de datos
    await User.sync({ force: false }); // 'force: false' para evitar eliminar datos si ya existen
    console.log("Tabla `Users` creada (si no existía).");
  } catch (err) {
    console.error("Error al crear la tabla `Users`:", err);
  }
};
