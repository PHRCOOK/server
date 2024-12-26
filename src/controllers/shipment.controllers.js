// import { pool } from "../db.js";

// // Obtener todos los envíos
// export const getShipments = async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT * FROM Shipments");
//     client.release();
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error al obtener envíos", error: err.stack });
//   }
// };

// // Obtener un envío por ID
// export const getShipmentById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT * FROM Shipments WHERE id = $1", [
//       id,
//     ]);
//     client.release();
//     if (result.rows.length > 0) {
//       res.status(200).json(result.rows[0]);
//     } else {
//       res.status(404).json({ message: "Envío no encontrado" });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error al obtener el envío", error: err.stack });
//   }
// };

// // Crear un nuevo envío
// export const createShipment = async (req, res) => {
//   const {
//     date,
//     name,
//     count,
//     price,
//     userName,
//     userEmail,
//     userType,
//     userId,
//     address,
//     dni,
//   } = req.body;
//   try {
//     const client = await pool.connect();
//     const result = await client.query(
//       "INSERT INTO Shipments (date, name, count, price, userName, userEmail, userType, userId, address, dni) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
//       [
//         date,
//         name,
//         count,
//         price,
//         userName,
//         userEmail,
//         userType,
//         userId,
//         address,
//         dni,
//       ]
//     );
//     client.release();
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error al crear el envío", error: err.stack });
//   }
// };

// // Actualizar un envío por ID
// export const updateShipment = async (req, res) => {
//   const { id } = req.params;
//   const {
//     date,
//     name,
//     count,
//     price,
//     userName,
//     userEmail,
//     userType,
//     userId,
//     address,
//     dni,
//   } = req.body;
//   try {
//     const client = await pool.connect();
//     const result = await client.query(
//       "UPDATE Shipments SET date = $1, name = $2, count = $3, price = $4, userName = $5, userEmail = $6, userType = $7, userId = $8, address = $9, dni = $10 WHERE id = $11 RETURNING *",
//       [
//         date,
//         name,
//         count,
//         price,
//         userName,
//         userEmail,
//         userType,
//         userId,
//         address,
//         dni,
//         id,
//       ]
//     );
//     client.release();
//     if (result.rows.length > 0) {
//       res.status(200).json(result.rows[0]);
//     } else {
//       res.status(404).json({ message: "Envío no encontrado" });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error al actualizar el envío", error: err.stack });
//   }
// };

// // Eliminar un envío por ID
// export const deleteShipment = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const client = await pool.connect();
//     const result = await client.query(
//       "DELETE FROM Shipments WHERE id = $1 RETURNING *",
//       [id]
//     );
//     client.release();
//     if (result.rows.length > 0) {
//       res.status(200).json({ message: "Envío eliminado" });
//     } else {
//       res.status(404).json({ message: "Envío no encontrado" });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error al eliminar el envío", error: err.stack });
//   }
// };

// controllers/shipmentController.js
import { Shipment } from "../models/shipment.models.js"; // Importamos el modelo Shipment

// Obtener todos los envíos
export const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.findAll(); // Usamos Sequelize para obtener todos los envíos
    res.status(200).json(shipments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener envíos", error: err.message });
  }
};

// Obtener un envío por ID
export const getShipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const shipment = await Shipment.findByPk(id); // Usamos Sequelize para encontrar el envío por ID
    if (shipment) {
      res.status(200).json(shipment);
    } else {
      res.status(404).json({ message: "Envío no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el envío", error: err.message });
  }
};

// Crear un nuevo envío
export const createShipment = async (req, res) => {
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
    const shipment = await Shipment.create({
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

    res.status(201).json(shipment); // Respondemos con el nuevo envío creado
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear el envío", error: err.message });
  }
};

// Actualizar un envío por ID
export const updateShipment = async (req, res) => {
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
    const shipment = await Shipment.findByPk(id); // Buscar el envío por ID
    if (shipment) {
      shipment.date = date;
      shipment.name = name;
      shipment.count = count;
      shipment.price = price;
      shipment.userName = userName;
      shipment.userEmail = userEmail;
      shipment.userType = userType;
      shipment.userId = userId;
      shipment.address = address;
      shipment.dni = dni;

      await shipment.save(); // Guardamos los cambios en la base de datos

      res.status(200).json(shipment); // Respondemos con el envío actualizado
    } else {
      res.status(404).json({ message: "Envío no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar el envío", error: err.message });
  }
};

// Eliminar un envío por ID
export const deleteShipment = async (req, res) => {
  const { id } = req.params;
  try {
    const shipment = await Shipment.findByPk(id); // Buscar el envío por ID
    if (shipment) {
      await shipment.destroy(); // Eliminar el envío de la base de datos
      res.status(200).json({ message: "Envío eliminado" });
    } else {
      res.status(404).json({ message: "Envío no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el envío", error: err.message });
  }
};
