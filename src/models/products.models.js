// models/product.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { User } from "./user.models.js"; // Importamos el modelo User para la relación

// Definir el modelo de Producto (Product)
export const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Aseguramos que el nombre no esté vacío
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true, // Aseguramos que el precio sea un número flotante
        min: 0, // El precio debe ser mayor o igual a 0
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // No es obligatorio
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // No es obligatorio
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true, // Aseguramos que el stock sea un número entero
        min: 0, // El stock debe ser mayor o igual a 0
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // Referencia al modelo `User`
        key: "id",
      },
      onDelete: "CASCADE", // Si un usuario se elimina, los productos asociados también se eliminan
    },
  },
  {
    tableName: "Products", // Cambié a plural para alinearlo con las convenciones
    timestamps: true, // Añadí timestamps para registrar la creación y actualización del producto
  }
);

// Establecer la relación de "uno a muchos" entre User y Product
User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

// Función para crear la tabla si no existe
export const createProductTable = async () => {
  try {
    await Product.sync({ force: false }); // 'force: false' asegura que no se borren datos si ya existen
    console.log("Tabla `Products` creada (si no existía).");
  } catch (err) {
    console.error("Error al crear la tabla `Products`:", err);
  }
};
