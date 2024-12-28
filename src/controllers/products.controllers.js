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
    if (!name || !price || !stock) {
      return res
        .status(400)
        .json({ message: "Faltan campos obligatorios (name, price, stock)." });
    }

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

// Actualizar un producto por ID (permite modificar varios campos)
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, stock } = req.body;

  // Buscar el producto por ID
  try {
    const product = await Product.findByPk(id); // Buscar el producto por su ID
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Validaciones adicionales si es necesario
    if (price && (typeof price !== "number" || price <= 0)) {
      return res
        .status(400)
        .json({ message: "El precio debe ser un número positivo." });
    }

    if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
      return res
        .status(400)
        .json({ message: "El stock debe ser un número no negativo." });
    }

    // Actualizar los campos solo si están presentes
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (image) product.image = image;
    if (stock !== undefined) product.stock = stock;

    // Guardamos los cambios
    await product.save();

    res.status(200).json({
      success: true,
      message: "Producto actualizado con éxito",
      data: product,
    });
  } catch (err) {
    console.error("Error al actualizar el producto:", err.stack);
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
    console.error("Error al eliminar el producto:", err); // Agregar log detallado
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: err.message });
  }
};
