import { Contact } from "../models/contact.models.js"; // Importamos el modelo Contact

// Obtener todos los contactos
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll(); // Usamos Sequelize para obtener todos los contactos
    res.status(200).json(contacts); // Respondemos con los contactos
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener los contactos", error: err.message });
  }
};

// Obtener un contacto por ID
export const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByPk(id); // Usamos Sequelize para obtener el contacto por ID
    if (contact) {
      res.status(200).json(contact); // Respondemos con el contacto encontrado
    } else {
      res.status(404).json({ message: "Contacto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el contacto", error: err.message });
  }
};

// Crear un nuevo contacto
export const createContact = async (req, res) => {
  const { nombre, correo, mensaje } = req.body; // Recibimos los datos desde el frontend

  // Validación simple de los datos
  if (!nombre || !correo || !mensaje) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const contact = await Contact.create({
      nombre, // Nombre del contacto
      correo, // Correo del contacto
      mensaje, // Mensaje del contacto
    });

    res.status(201).json(contact); // Respondemos con el contacto recién creado
  } catch (err) {
    console.error("Error al crear el contacto:", err);
    res
      .status(500)
      .json({ message: "Error al crear el contacto", error: err.message });
  }
};

// Actualizar un contacto por ID
export const updateContact = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del contacto a actualizar
  const { nombre, correo, mensaje } = req.body; // Nuevos valores para actualizar

  try {
    const contact = await Contact.findByPk(id); // Buscamos el contacto por ID
    if (contact) {
      // Actualizamos los campos del contacto
      contact.nombre = nombre || contact.nombre;
      contact.correo = correo || contact.correo;
      contact.mensaje = mensaje || contact.mensaje;

      // Guardamos los cambios en la base de datos
      await contact.save();

      res.status(200).json(contact); // Respondemos con el contacto actualizado
    } else {
      res.status(404).json({ message: "Contacto no encontrado" });
    }
  } catch (err) {
    console.error("Error al actualizar el contacto:", err);
    res
      .status(500)
      .json({ message: "Error al actualizar el contacto", error: err.message });
  }
};

// Eliminar un contacto por ID
export const deleteContact = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del contacto a eliminar

  try {
    const contact = await Contact.findByPk(id); // Buscamos el contacto por ID
    if (contact) {
      // Eliminamos el contacto de la base de datos
      await contact.destroy();
      res.status(200).json({ message: "Contacto eliminado" }); // Respondemos con éxito
    } else {
      res.status(404).json({ message: "Contacto no encontrado" });
    }
  } catch (err) {
    console.error("Error al eliminar el contacto:", err);
    res
      .status(500)
      .json({ message: "Error al eliminar el contacto", error: err.message });
  }
};
