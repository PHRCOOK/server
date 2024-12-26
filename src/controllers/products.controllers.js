// import { pool } from "../db.js";

// // Obtener todos los productos
// export const getProducts = async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT * FROM Product");
//     client.release();
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error al obtener productos", error: err.stack });
//   }
// };

// // Obtener un producto por ID
// export const getProductById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT * FROM Product WHERE id = $1", [
//       id,
//     ]);
//     client.release();
//     if (result.rows.length > 0) {
//       res.status(200).json(result.rows[0]);
//     } else {
//       res.status(404).json({ message: "Producto no encontrado" });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error al obtener el producto", error: err.stack });
//   }
// };

// // Crear un nuevo producto
// export const createProduct = async (req, res) => {
//   const { name, price, description, image, stock, userId } = req.body;
//   try {
//     const client = await pool.connect();
//     const result = await client.query(
//       "INSERT INTO Product (name, price, description, image, stock, userId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
//       [name, price, description, image, stock, userId]
//     );
//     client.release();
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error al crear el producto", error: err.stack });
//   }
// };

// // Actualizar un producto por ID
// export const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { name, price, description, image, stock, userId } = req.body;
//   try {
//     const client = await pool.connect();
//     const result = await client.query(
//       "UPDATE Product SET name = $1, price = $2, description = $3, image = $4, stock = $5, userId = $6 WHERE id = $7 RETURNING *",
//       [name, price, description, image, stock, userId, id]
//     );
//     client.release();
//     if (result.rows.length > 0) {
//       res.status(200).json(result.rows[0]);
//     } else {
//       res.status(404).json({ message: "Producto no encontrado" });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error al actualizar el producto", error: err.stack });
//   }
// };

// // Eliminar un producto por ID
// export const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const client = await pool.connect();
//     const result = await client.query(
//       "DELETE FROM Product WHERE id = $1 RETURNING *",
//       [id]
//     );
//     client.release();
//     if (result.rows.length > 0) {
//       res.status(200).json({ message: "Producto eliminado" });
//     } else {
//       res.status(404).json({ message: "Producto no encontrado" });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error al eliminar el producto", error: err.stack });
//   }
// };

// controllers/productController.js

import { Product } from "../models/products.models.js"; // Importamos el modelo Product

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll(); // Usamos Sequelize para obtener todos los productos
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener productos", error: err.message });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id); // Usamos Sequelize para obtener el producto por ID
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el producto", error: err.message });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  const { name, price, description, image, stock, userId } = req.body;
  try {
    const product = await Product.create({
      name,
      price,
      description,
      image,
      stock,
      userId,
    });

    res.status(201).json(product); // Respondemos con el nuevo producto creado
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear el producto", error: err.message });
  }
};

// Actualizar un producto por ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, stock, userId } = req.body;
  try {
    const product = await Product.findByPk(id); // Buscar el producto por ID
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.stock = stock;
      product.userId = userId;

      await product.save(); // Guardamos los cambios en la base de datos

      res.status(200).json(product); // Respondemos con el producto actualizado
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar el producto", error: err.message });
  }
};

// Eliminar un producto por ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id); // Buscar el producto por ID
    if (product) {
      await product.destroy(); // Eliminar el producto de la base de datos
      res.status(200).json({ message: "Producto eliminado" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: err.message });
  }
};
