import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controllers.js";

const router = express.Router();

// Rutas de Pedido
router.get("/orders", getOrders); // Obtener todos los pedidos
router.get("/orders/:id", getOrderById); // Obtener un pedido por ID
router.post("/orders", createOrder); // Crear un nuevo pedido
router.put("/orders/:id", updateOrder); // Actualizar un pedido por ID
router.delete("/orders/:id", deleteOrder); // Eliminar un pedido por ID

export default router;
