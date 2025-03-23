const bcrypt = require("bcrypt"); // Definimos la constante bcrypt para encriptar
const usersModel = require('../models/users.model'); // Importamos el modelo de administradores
const jwt = require('jsonwebtoken');

class UsersController {
  // Crear un nuevo usuario (Terminada)
  async add(req, res) {
    try {
      const { name, lastname, email, username, password } = req.body;

      // Verificar si el usuario ya existe en la base de datos
      const userExisting = await usersModel.getByUsername(username);
      if (userExisting)
        return res
          .status(400)
          .json({ status: 400, message: "El usuario ya existe." });

      // Hasheo de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo usuario
      const newUser = {
        name_user: name,
        lastname_user: lastname,
        email_user: email,
        username_user: username,
        password_user: hashedPassword,
      };
      const newUserId = await usersModel.add(newUser);

      res.status(201).json({
        status: 201,
        message: "Usuario creado exitosamente.",
        data: { id: newUserId },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al crear el usuario: ${error.message}`,
      });
    }
  }

  // Iniciar sesión
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Verificar si el usuario existe en la base de datos
      const user = await usersModel.getByUsername(username);
      if (!user)
        return res
          .status(401)
          .json({ status: 401, message: "Credenciales inválidas." });

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_user
      );
      if (!isPasswordValid)
        return res
          .status(401)
          .json({ status: 401, message: "Credenciales inválidas." });

      // Generar el token de autenticación
      const token = jwt.sign(
        { id: user.id_user, usernmae: username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        status: 200,
        message: "Inicio de sesión exitoso.",
        result: {
          username: user.username_user,
          name: user.name_user,
          lastname: user.lastname_user,
          role: user.role_user,
          email: user.email_user,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al iniciar sesión: ${error.message}`,
      });
    }
  }

  // Recuperar Contraseña
  async repairPassword(req, res) {
    try {
      const { username, password, codeAdmin } = req.body;

      // Verificar si el usuario existe en la base de datos
      const user = await usersModel.getByUsername(username);
      if (!user)
        return res
          .status(401)
          .json({ status: 401, message: "El usuario no existe." });

      // Verificar el codigo administrador para recuperar contraseña
      if (codeAdmin != process.env.ADMIN_CODE_SECRET)
        return res.status(401).json({
          status: 401,
          message: "El código administrador no es correcto.",
        });

      // Hasheo de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Actualizamos la contraseña en la base de datos
      const userUpdate = await usersModel.updatePasswordById(
        username,
        hashedPassword
      );

      res
        .status(200)
        .json({ status: 200, message: "Contraseña recuperada exitosamente." });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al recuperar la contraseña: ${error.message}`,
      });
    }
  }

  // Ver todos los usuarios (Terminado)
  async all(req, res) {
    try {
      const users = await usersModel.getAll();

      res.status(201).json({
        status: 201,
        message: "Usuarios Listados exitosamente.",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al listar los Usuarios: ${error.message}`,
      });
    }
  }

  // Eliminar un Usuario (Terminado)
  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await usersModel.getById(id);
      if (user === undefined) {
        return res.status(401).json({
          status: 401,
          message: "El Usuario no existe",
        });
      }

      const userId = await usersModel.deleteById(id);

      res.status(201).json({
        status: 201,
        message: "Usuario eliminado exitosamente.",
        data: userId,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al eliminar el Usuario: ${error.message}`,
      });
    }
  }
}

const usersController = new UsersController();
module.exports = usersController;
