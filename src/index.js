import express from "express";
import cors from "cors"; // Importar el middleware CORS
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

// Configuración de CORS
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://miapp.com" // Reemplaza con tu dominio de producción
      : "http://localhost:5173", // Origen para desarrollo
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};

// Configurar CORS con las opciones personalizadas
app.use(cors(corsOptions)); // Esto habilita CORS solo para el origen especificado
app.use(express.json()); // Middleware para parsear JSON

// Inicializar la base de datos
const initializeDatabase = async () => {
  try {
    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ force: false }); // `force: false` evitará eliminar las tablas existentes
    console.log("Base de datos sincronizada correctamente.");
  } catch (err) {
    console.error("Error al sincronizar la base de datos:", err.stack);
    throw err; // Lanza el error para detener el servidor si la DB no se sincroniza correctamente
  }
};

// Rutas
app.use("/api", userRoutes); // Rutas de Usuarios
app.use("/api", orderRoutes); // Rutas de Pedidos
app.use("/api", productRoutes); // Rutas de Productos
app.use("/api", shipmentRoutes); // Rutas de Envíos
app.use("/api", contactRoutes); // Rutas de Contactos

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
