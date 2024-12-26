//
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
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "Product",
    timestamps: false, // No usar timestamps ya que no son necesarios en este caso
  }
);

// Establecer la relación de "uno a muchos" entre User y Product
User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

// Función para crear la tabla si no existe
export const createProductTable = async () => {
  try {
    // Sincronizamos la base de datos (esto crea las tablas si no existen)
    await Product.sync({ force: false }); // 'force: false' asegura que no se borren datos si ya existen
    console.log("Tabla `Product` creada (si no existía).");
  } catch (err) {
    console.error("Error al crear la tabla `Product`:", err);
  }
};
