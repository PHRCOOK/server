// models/contact.js
import { pool } from "../db.js";

// Consulta SQL para crear la tabla `Contact`
const createContactTableQuery = `
  CREATE TABLE IF NOT EXISTS Contact (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    "userId" INTEGER,
    FOREIGN KEY ("userId") REFERENCES Users(id)
  );
`;

// Función para crear la tabla `Contact` en la base de datos
export const createContactTable = async () => {
  try {
    const client = await pool.connect();
    console.log("Conexión exitosa a la base de datos.");
    await client.query(createContactTableQuery);
    console.log("Tabla `Contact` creada (si no existía).");
    client.release();
  } catch (err) {
    console.error("Error al crear la tabla `Contact`:", err.stack);
  }
};
