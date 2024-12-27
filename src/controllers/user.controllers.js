import bcrypt from "bcryptjs";
import { User, ROLES } from "../models/user.models.js";
import { Op } from "sequelize";

// Función para registrar un nuevo usuario
export const createUser = async (req, res) => {
  const { email, password, name, address, dni, role } = req.body;

  // Verificar que todos los campos sean proporcionados
  if (!email || !password || !name || !address || !dni || !role) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  // Validar el rol
  if (!Object.values(ROLES).includes(role)) {
    return res.status(400).json({
      message:
        "El rol debe ser uno de los siguientes: admin, vendor, client, shipment.",
    });
  }

  try {
    // Verificar si el email ya existe en la base de datos
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado." });
    }

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      address,
      dni,
      role,
    });

    // Responder con el usuario creado
    res.status(201).json({
      message: "Usuario creado exitosamente.",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        address: newUser.address,
        dni: newUser.dni,
        role: newUser.role,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: err.message });
  }
};

// Función para iniciar sesión (login)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Verificar que los campos de email y password estén presentes
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos." });
  }

  try {
    // Buscar al usuario por su correo electrónico
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    // Responder con los datos del usuario si la autenticación es exitosa
    res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        dni: user.dni,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error al intentar iniciar sesión",
      error: err.message,
    });
  }
};

// Función para actualizar un usuario por ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, name, address, dni, role } = req.body;

  // Verificar que los campos obligatorios estén presentes
  if (!email || !name || !address || !dni || !role) {
    return res.status(400).json({
      message: "Todos los campos son requeridos excepto la contraseña.",
    });
  }

  // Validar que el rol sea uno de los permitidos
  if (!Object.values(ROLES).includes(role)) {
    return res.status(400).json({
      message:
        "El rol debe ser uno de los siguientes: admin, vendor, client, shipment.",
    });
  }

  try {
    // Buscar al usuario por ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar que no haya otro usuario con el mismo email, pero diferente ID
    const existingUser = await User.findOne({
      where: { email, id: { [Op.ne]: id } },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado." });
    }

    // Actualizar los campos del usuario
    user.email = email;
    user.name = name;
    user.address = address;
    user.dni = dni;
    user.role = role;

    // Si se proporciona una nueva contraseña, actualizarla
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // Guardar los cambios en la base de datos
    await user.save();

    // Responder con los datos del usuario actualizado
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar el usuario", error: err.message });
  }
};

// Función para eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar al usuario por ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar el usuario
    await user.destroy();

    // Responder con un mensaje de éxito
    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: err.message });
  }
};

// Función para obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const users = await User.findAll();

    // Responder con la lista de usuarios
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: err.message });
  }
};

// Función para obtener un usuario por su ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar al usuario por ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Responder con los datos del usuario
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: err.message });
  }
};
