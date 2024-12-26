// // models/order.js

// import { pool } from "../db.js";

// const createOrdersTableQuery = `
//   CREATE TABLE IF NOT EXISTS Orders (
//     id SERIAL PRIMARY KEY,
//     date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     name VARCHAR(255) NOT NULL,
//     count INTEGER NOT NULL,
//     price FLOAT NOT NULL,
//     userName VARCHAR(255) NOT NULL,
//     userEmail VARCHAR(255) NOT NULL,
//     userType VARCHAR(50) NOT NULL,
//     userId INTEGER,
//     address VARCHAR(255),
//     dni VARCHAR(255),
//     FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
//   );
// `;

// export const createOrdersTable = async () => {
//   try {
//     const client = await pool.connect();
//     await client.query(createOrdersTableQuery);
//     console.log("Tabla `Orders` creada (si no existía).");
//     client.release();
//   } catch (err) {
//     console.error("Error al crear la tabla `Orders`:", err.stack);
//   }
// };

// models/order.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { User } from "./user.models.js"; // Importamos el modelo User para establecer la relación

// Definir el modelo de Pedido (Order)
export const Order = sequelize.define(
  "Order",
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
      references: {
        model: User, // Referencia al modelo `User`
        key: "id",
      },
      onDelete: "CASCADE", // Si un usuario se elimina, los pedidos asociados también se eliminan
    },
    address: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Orders",
    timestamps: false, // No usar timestamps, ya que la fecha ya está definida como `date`
  }
);

// Establecer la relación de "uno a muchos" entre User y Order
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// Función para crear la tabla si no existe
export const createOrdersTable = async () => {
  try {
    // Sincronizamos la base de datos (esto crea las tablas si no existen)
    await Order.sync({ force: false }); // 'force: false' asegura que no se borren datos si ya existen
    console.log("Tabla `Orders` creada (si no existía).");
  } catch (err) {
    console.error("Error al crear la tabla `Orders`:", err);
  }
};
