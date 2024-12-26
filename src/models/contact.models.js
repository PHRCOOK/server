// // models/contact.js
// import { pool } from "../db.js";

// // Consulta SQL para crear la tabla `Contact`
// const createContactTableQuery = `
//   CREATE TABLE IF NOT EXISTS Contact (
//     id SERIAL PRIMARY KEY,
//     nombre VARCHAR(255) NOT NULL,
//     correo VARCHAR(255) NOT NULL,
//     mensaje TEXT NOT NULL,
//     "userId" INTEGER,
//     FOREIGN KEY ("userId") REFERENCES Users(id)
//   );
// `;

// // Función para crear la tabla `Contact` en la base de datos
// export const createContactTable = async () => {
//   try {
//     const client = await pool.connect();
//     console.log("Conexión exitosa a la base de datos.");
//     await client.query(createContactTableQuery);
//     console.log("Tabla `Contact` creada (si no existía).");
//     client.release();
//   } catch (err) {
//     console.error("Error al crear la tabla `Contact`:", err.stack);
//   }
// };

// models/contact.js
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

// Función para crear la tabla si no existe
export const createContactTable = async () => {
  try {
    // Sincronizamos la base de datos (esto crea las tablas si no existen)
    await Contact.sync({ force: false }); // 'force: false' asegura que no se borren datos si ya existen
    console.log("Tabla `Contact` creada (si no existía).");
  } catch (err) {
    console.error("Error al crear la tabla `Contact`:", err);
  }
};
