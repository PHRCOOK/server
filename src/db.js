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

import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Extraer la URL de la base de datos desde la variable de entorno DATABASE_URL
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("Error: La variable de entorno DATABASE_URL no está definida.");
  process.exit(1); // Termina el proceso si no se puede encontrar la URL
}

// Crear la instancia de Sequelize usando la URL de conexión
const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres", // Dialecto de la base de datos
  logging: false, // Opcional: Desactiva los logs SQL en consola
});

// Probar la conexión
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos.");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

export default sequelize;
