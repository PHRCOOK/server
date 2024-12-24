import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";

const router = express.Router();

// Rutas de Producto
router.get("/products", getProducts); // Obtener todos los productos
router.get("/products/:id", getProductById); // Obtener un producto por ID
router.post("/products", createProduct); // Crear un nuevo producto
router.put("/products/:id", updateProduct); // Actualizar un producto por ID
router.delete("/products/:id", deleteProduct); // Eliminar un producto por ID

export default router;
