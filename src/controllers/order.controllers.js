import { Order } from "../models/order.models.js"; // Importamos el modelo Order

// Obtener todas las órdenes
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener órdenes", error: err.message });
  }
};

// Obtener una orden por ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener la orden", error: err.message });
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
    const order = await Order.create({
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
    });

    res.status(201).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear la orden", error: err.message });
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
    const order = await Order.findByPk(id);
    if (order) {
      order.date = date;
      order.name = name;
      order.count = count;
      order.price = price;
      order.userName = userName;
      order.userEmail = userEmail;
      order.userType = userType;
      order.userId = userId;
      order.address = address;
      order.dni = dni;

      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar la orden", error: err.message });
  }
};

// Eliminar una orden por ID
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      await order.destroy();
      res.status(200).json({ message: "Orden eliminada" });
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar la orden", error: err.message });
  }
};
