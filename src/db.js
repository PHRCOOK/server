// import pg from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// // Configuración de la conexión a la base de datos
// const connectionString =
//   process.env.DATABASE_URL || // En producción, Railway usa DATABASE_URL
//   `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

// // Configuración del pool
// const pool = new pg.Pool({
//   connectionString: connectionString,
//   ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // Requerido para Railway o producción
// });

// const connectDB = async () => {
//   try {
//     const client = await pool.connect();
//     console.log("Conexión exitosa a la base de datos.");
//     client.release(); // Liberar el cliente después de la conexión
//   } catch (err) {
//     console.error("Error al conectar a la base de datos:", err.stack);
//     process.exit(1); // Salir con código de error si no se puede conectar
//   }
// };

// // Llamada para conectar
// connectDB();

// // Exportar pool para utilizar en otras partes del código
// export { pool, connectDB };

// import Sequelize from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// // Crear la instancia de Sequelize
// const sequelize = new Sequelize(
//   process.env.DB_DATABASE, // Nombre de la base de datos
//   process.env.DB_USER, // Usuario
//   process.env.DB_PASSWORD, // Contraseña
//   {
//     host: process.env.DB_HOST, // Host
//     port: process.env.DB_PORT, // Puerto
//     dialect: "postgres", // Dialecto de la base de datos
//     logging: false, // Opcional: Desactiva los logs SQL en consola
//   }
// );

// // Probar la conexión
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Conexión exitosa a la base de datos.");
//   })
//   .catch((err) => {
//     console.error("Error al conectar a la base de datos:", err);
//   });

// export default sequelize;

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Configuración de la conexión a la base de datos
const connectionString =
  process.env.DATABASE_URL || // En producción, Railway usa DATABASE_URL
  `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

// Configuración de Sequelize
const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  protocol: "postgres",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // Requerido para Railway o producción
  logging: false, // Si quieres desactivar los logs de las consultas SQL
});

// Función para verificar la conexión
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la base de datos.");
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1); // Salir con código de error si no se puede conectar
  }
};

// Llamada para conectar
connectDB();

// Exportar sequelize para utilizar en otras partes del código
export default sequelize; // Cambiado a exportación por defecto
