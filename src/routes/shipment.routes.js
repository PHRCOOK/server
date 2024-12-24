import express from "express";
import {
  createShipment,
  getShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
} from "../controllers/shipment.controllers.js";

const router = express.Router();

// Rutas de Envío
router.get("/shipments", getShipments); // Obtener todos los envíos
router.get("/shipments/:id", getShipmentById); // Obtener un envío por ID
router.post("/shipments", createShipment); // Crear un nuevo envío
router.put("/shipments/:id", updateShipment); // Actualizar un envío por ID
router.delete("/shipments/:id", deleteShipment); // Eliminar un envío por ID

export default router;
