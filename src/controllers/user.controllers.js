import bcrypt from "bcryptjs";
import { pool } from "../db.js";

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM Users");
    client.release();
    res.status(200).json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener usuarios", error: err.stack });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM Users WHERE id = $1", [
      id,
    ]);
    client.release();
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: err.stack });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { email, password, name, address, dni, role } = req.body;

  // Validación de datos
  if (!email || !password || !name || !address || !dni || !role) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
  }

  const client = await pool.connect();
  try {
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await client.query(
      "INSERT INTO Users (email, password, name, address, dni, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, hashedPassword, name, address, dni, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: err.stack });
  } finally {
    client.release();
  }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, name, address, dni, role } = req.body;

  // Validación de datos
  if (!email || !password || !name || !address || !dni || !role) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
  }

  const client = await pool.connect();
  try {
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await client.query(
      "UPDATE Users SET email = $1, password = $2, name = $3, address = $4, dni = $5, role = $6 WHERE id = $7 RETURNING *",
      [email, hashedPassword, name, address, dni, role, id]
    );
    client.release();
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar el usuario", error: err.stack });
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "DELETE FROM Users WHERE id = $1 RETURNING *",
      [id]
    );
    client.release();
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: err.stack });
  }
};
