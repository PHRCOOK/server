// // models/shipment.js
// import { pool } from "../db.js";

// const createShipmentTableQuery = `
//   CREATE TABLE IF NOT EXISTS Shipment (
//     id SERIAL PRIMARY KEY,
//     date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     name VARCHAR(255) NOT NULL,
//     count INTEGER NOT NULL,
//     price FLOAT NOT NULL,
//     userName VARCHAR(255) NOT NULL,
//     userEmail VARCHAR(255) NOT NULL,
//     userType VARCHAR(50) NOT NULL,
//     userId INTEGER NOT NULL,
//     address VARCHAR(255),
//     dni VARCHAR(255),
//     FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
//   );
// `;

// export const createShipmentTable = async () => {
//   try {
//     const client = await pool.connect();
//     await client.query(createShipmentTableQuery);
//     console.log("Tabla `Shipment` creada (si no existía).");
//     client.release();
//   } catch (err) {
//     console.error("Error al crear la tabla `Shipment`:", err.stack);
//   }
// };

// models/shipment.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { User } from "./user.models.js"; // Importamos el modelo User para establecer la relación

// Definir el modelo de Envío (Shipment)
export const Shipment = sequelize.define(
  "Shipment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Referencia al modelo `User`
        key: "id",
      },
      onDelete: "CASCADE", // Si un usuario se elimina, los envíos asociados también se eliminan
    },
    address: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Shipment",
    timestamps: false, // No usar timestamps, ya que la fecha ya está definida como `date`
  }
);

// Establecer la relación de "uno a muchos" entre User y Shipment
User.hasMany(Shipment, { foreignKey: "userId" });
Shipment.belongsTo(User, { foreignKey: "userId" });

// Función para crear la tabla si no existe
export const createShipmentTable = async () => {
  try {
    // Sincronizamos la base de datos (esto crea las tablas si no existen)
    await Shipment.sync({ force: false }); // 'force: false' asegura que no se borren datos si ya existen
    console.log("Tabla `Shipment` creada (si no existía).");
  } catch (err) {
    console.error("Error al crear la tabla `Shipment`:", err);
  }
};
