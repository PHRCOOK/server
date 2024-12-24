// models/order.js

import { pool } from "../db.js";

const createOrdersTableQuery = `
  CREATE TABLE IF NOT EXISTS Orders (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    count INTEGER NOT NULL,
    price FLOAT NOT NULL,
    userName VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    userType VARCHAR(50) NOT NULL,
    userId INTEGER,
    address VARCHAR(255),
    dni VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
  );
`;

export const createOrdersTable = async () => {
  try {
    const client = await pool.connect();
    await client.query(createOrdersTableQuery);
    console.log("Tabla `Orders` creada (si no existía).");
    client.release();
  } catch (err) {
    console.error("Error al crear la tabla `Orders`:", err.stack);
  }
};
