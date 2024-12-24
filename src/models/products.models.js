// models/product.js
import { pool } from "../db.js";

const createProductTableQuery = `
  CREATE TABLE IF NOT EXISTS Product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    description VARCHAR(255),
    image VARCHAR(255),
    stock INTEGER NOT NULL,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
  );
`;

export const createProductTable = async () => {
  try {
    const client = await pool.connect();
    await client.query(createProductTableQuery);
    console.log("Tabla `Product` creada (si no existía).");
    client.release();
  } catch (err) {
    console.error("Error al crear la tabla `Product`:", err.stack);
  }
};
