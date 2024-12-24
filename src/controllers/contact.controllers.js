import { pool } from "../db.js";

// Obtener todos los contactos
export const getContacts = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM Contact");
    client.release();
    res.status(200).json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener los contactos", error: err.stack });
  }
};

// Obtener un contacto por ID
export const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM Contact WHERE id = $1", [
      id,
    ]);
    client.release();
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Contacto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el contacto", error: err.stack });
  }
};

// Crear un nuevo contacto
export const createContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO Contact (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear el contacto", error: err.stack });
  }
};

// Actualizar un contacto por ID
export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE Contact SET name = $1, email = $2, message = $3 WHERE id = $4 RETURNING *",
      [name, email, message, id]
    );
    client.release();
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Contacto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar el contacto", error: err.stack });
  }
};

// Eliminar un contacto por ID
export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "DELETE FROM Contact WHERE id = $1 RETURNING *",
      [id]
    );
    client.release();
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Contacto eliminado" });
    } else {
      res.status(404).json({ message: "Contacto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el contacto", error: err.stack });
  }
};
