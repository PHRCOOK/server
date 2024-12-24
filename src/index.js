import express from "express";
import dotenv from "dotenv";
import { createUsersTable } from "./models/user.models.js"; // Función para crear la tabla Users
import { createContactTable } from "./models/contact.models.js"; // Función para crear la tabla Contact
import { createOrdersTable } from "./models/order.models.js"; // Función para crear la tabla Orders
import { createProductTable } from "./models/products.models.js"; // Función para crear la tabla Product
import { createShipmentTable } from "./models/shipment.models.js"; // Función para crear la tabla Shipment

// Importar rutas
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import productRoutes from "./routes/products.routes.js";
import shipmentRoutes from "./routes/shipment.routes.js";
import contactRoutes from "./routes/contact.routes.js";

// Configuración de dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware para parsear JSON
app.use(express.json());

// Inicializar la base de datos
const initializeDatabase = async () => {
  try {
    await createUsersTable();
    await createContactTable();
    await createOrdersTable();
    await createProductTable();
    await createShipmentTable();
    console.log("Base de datos inicializada correctamente.");
  } catch (err) {
    console.error("Error al inicializar la base de datos:", err.stack);
    throw err; // Lanza el error para detener el servidor si la DB no se inicializa correctamente
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
