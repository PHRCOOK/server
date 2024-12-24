import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then((client) => {
    console.log("Conexión exitosa a la base de datos.");
    client.release(); // Liberar el cliente después de la conexión
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err.stack);
  });
