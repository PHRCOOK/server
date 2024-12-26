import bcrypt from "bcryptjs";
import { User, ROLES } from "../models/user.models.js";

// Función para iniciar sesión (login)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validación de los campos de entrada
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos." });
  }

  try {
    // Buscar el usuario por su email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Comparar la contraseña proporcionada con la encriptada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    // Devolver la respuesta con los datos del usuario (sin token)
    res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        dni: user.dni,
        role: user.role, // El rol del usuario
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error al intentar iniciar sesión",
      error: err.message,
    });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener usuarios", error: err.message });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: err.message });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { email, password, name, address, dni, role } = req.body;

  if (!email || !password || !name || !address || !dni || !role) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
  }

  if (!Object.values(ROLES).includes(role)) {
    return res.status(400).json({
      message:
        "El rol debe ser uno de los siguientes: admin, vendor, client, shipment.",
    });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      address,
      dni,
      role,
    });

    res.status(201).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: err.message });
  }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, name, address, dni, role } = req.body;

  if (!email || !password || !name || !address || !dni || !role) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
  }

  if (!Object.values(ROLES).includes(role)) {
    return res.status(400).json({
      message:
        "El rol debe ser uno de los siguientes: admin, vendor, client, shipment.",
    });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const existingUser = await User.findOne({
      where: { email, id: { [Op.ne]: id } },
    });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.email = email;
    user.password = hashedPassword;
    user.name = name;
    user.address = address;
    user.dni = dni;
    user.role = role;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar el usuario", error: err.message });
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: err.message });
  }
};
