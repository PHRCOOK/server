import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

// Rutas de Usuario
router.get("/users", getUsers); // Obtener todos los usuarios
router.get("/users/:id", getUserById); // Obtener un usuario por ID
router.post("/users", createUser); // Crear un nuevo usuario
router.put("/users/:id", updateUser); // Actualizar un usuario por ID
router.delete("/users/:id", deleteUser); // Eliminar un usuario por ID

export default router;
