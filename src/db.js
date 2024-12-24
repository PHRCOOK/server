import pg from "pg";
import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear un pool de conexiones a la base de datos utilizando las variables de entorno
export const pool = new pg.Pool({
  user: process.env.DB_USER, // Usuario de la base de datos
  host: process.env.DB_HOST, // Dirección del servidor
  password: process.env.DB_PASSWORD, // Contraseña del usuario
  database: process.env.DB_DATABASE, // Nombre de la base de datos
  port: process.env.DB_PORT, // Puerto de la base de datos
});

// Probar la conexión
pool
  .connect()
  .then((client) => {
    console.log("Conexión exitosa a la base de datos.");
    client.release(); // Importante liberar el cliente después de la conexión
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err.stack);
  });
