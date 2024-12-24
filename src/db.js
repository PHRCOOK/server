import pg from "pg";

// Crear un pool de conexiones a la base de datos
export const pool = new pg.Pool({
  user: "postgres", // Usuario de la base de datos
  host: "localhost", // Dirección del servidor (en este caso es local)
  password: "P123456", // Contraseña del usuario
  database: "distriapp2", // Nombre de la base de datos
  port: 5432,
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
