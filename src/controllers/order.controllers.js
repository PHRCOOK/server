import { pool } from "../db.js";

// Obtener todas las órdenes
export const getOrders = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM Orders");
    client.release();
    res.status(200).json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener órdenes", error: err.stack });
  }
};

// Obtener una orden por ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM Orders WHERE id = $1", [
      id,
    ]);
    client.release();
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener la orden", error: err.stack });
  }
};

// Crear una nueva orden
export const createOrder = async (req, res) => {
  const {
    date,
    name,
    count,
    price,
    userName,
    userEmail,
    userType,
    userId,
    address,
    dni,
  } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO Orders (date, name, count, price, userName, userEmail, userType, userId, address, dni) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        date,
        name,
        count,
        price,
        userName,
        userEmail,
        userType,
        userId,
        address,
        dni,
      ]
    );
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear la orden", error: err.stack });
  }
};

// Actualizar una orden por ID
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    date,
    name,
    count,
    price,
    userName,
    userEmail,
    userType,
    userId,
    address,
    dni,
  } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE Orders SET date = $1, name = $2, count = $3, price = $4, userName = $5, userEmail = $6, userType = $7, userId = $8, address = $9, dni = $10 WHERE id = $11 RETURNING *",
      [
        date,
        name,
        count,
        price,
        userName,
        userEmail,
        userType,
        userId,
        address,
        dni,
        id,
      ]
    );
    client.release();
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar la orden", error: err.stack });
  }
};

// Eliminar una orden por ID
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "DELETE FROM Orders WHERE id = $1 RETURNING *",
      [id]
    );
    client.release();
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Orden eliminada" });
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar la orden", error: err.stack });
  }
};
