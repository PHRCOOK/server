import express from "express";
import dotenv from "dotenv";

// Importar la conexión y los modelos de Sequelize
import sequelize from "./db.js"; // Conexión a la base de datos

// Importar las rutas
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import productRoutes from "./routes/products.routes.js";
import shipmentRoutes from "./routes/shipment.routes.js";
import contactRoutes from "./routes/contact.routes.js";

// Configuración de dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware CORS personalizado para permitir todos los orígenes
const corsMiddleware = (req, res, next) => {
  // Permitir todos los orígenes
  res.header("Access-Control-Allow-Origin", "*"); // Permite todos los orígenes
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Cabeceras permitidas
  res.header("Access-Control-Allow-Credentials", "true"); // Permite el uso de cookies y credenciales

  // Si la solicitud es de tipo OPTIONS (preflight), respondemos con un código 200
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Responder con un OK para las solicitudes OPTIONS (preflight request)
  }

  // Continuar con el siguiente middleware o ruta
  next();
};

// Habilitar el middleware CORS personalizado
app.use(corsMiddleware); // Usamos nuestro middleware CORS personalizado

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Inicialización de la base de datos
const initializeDatabase = async () => {
  try {
    // Sincronizar los modelos con la base de datos (esto no eliminará las tablas existentes, ya que `force: false`)
    await sequelize.sync({ force: false });
    console.log("Base de datos sincronizada correctamente.");
  } catch (err) {
    console.error("Error al sincronizar la base de datos:", err.stack);
    throw err; // Lanza el error para detener el servidor si la DB no se sincroniza correctamente
  }
};

// Rutas
app.use("/", userRoutes); // Rutas de Usuarios
app.use("/", orderRoutes); // Rutas de Pedidos
app.use("/", productRoutes); // Rutas de Productos
app.use("/", shipmentRoutes); // Rutas de Envíos
app.use("/", contactRoutes); // Rutas de Contactos

// Iniciar el servidor y la base de datos
initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error al iniciar el servidor:", err.stack);
    process.exit(1); // Salir del proceso si hay un error crítico en la base de datos
  });
