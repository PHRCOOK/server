import express from "express";
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contact.controllers.js";

const router = express.Router();

// Rutas de Contacto
router.get("/contacts", getContacts); // Obtener todos los contactos
router.get("/contacts/:id", getContactById); // Obtener un contacto por ID
router.post("/contacts", createContact); // Crear un nuevo contacto
router.put("/contacts/:id", updateContact); // Actualizar un contacto por ID
router.delete("/contacts/:id", deleteContact); // Eliminar un contacto por ID

export default router;
