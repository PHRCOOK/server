// import pg from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// export const pool = new pg.Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
// });

// pool
//   .connect()
//   .then((client) => {
//     console.log("Conexión exitosa a la base de datos.");
//     client.release(); // Liberar el cliente después de la conexión
//   })
//   .catch((err) => {
//     console.error("Error al conectar a la base de datos:", err.stack);
//   });

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Configuración de la conexión a la base de datos
const connectionString =
  process.env.DATABASE_URL || // En producción, Railway usa DATABASE_URL
  `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

// Configuración del pool
const pool = new pg.Pool({
  connectionString: connectionString,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // Requerido para Railway o producción
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Conexión exitosa a la base de datos.");
    client.release(); // Liberar el cliente después de la conexión
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err.stack);
    process.exit(1); // Salir con código de error si no se puede conectar
  }
};

// Llamada para conectar
connectDB();

// Exportar pool para utilizar en otras partes del código
export { pool, connectDB };
