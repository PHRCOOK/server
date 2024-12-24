// models/user.js
import { pool } from "../db.js";

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    dni VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'client' NOT NULL
  );
`;

export const createUsersTable = async () => {
  try {
    const client = await pool.connect();
    await client.query(createUsersTableQuery);
    console.log("Tabla `Users` creada (si no existía).");
    client.release();
  } catch (err) {
    console.error("Error al crear la tabla `Users`:", err.stack);
  }
};
