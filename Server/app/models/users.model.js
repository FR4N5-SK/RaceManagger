const query = require('../../config/query'); // Importamos la función para realizar consultas a la BD

class UsersModel {
  // Crear un nuevo usuario (listo)
  async add(user) {
    const { name_user, lastname_user, email_user, username_user, password_user, role_user = 'user', } = user;
    const sql = 'INSERT INTO users (name_user, lastname_user, email_user, username_user, password_user, role_user) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name_user, lastname_user, email_user, username_user, password_user, role_user];
    try {
      const response = await query(sql, values);
      const newUserId = response.insertId;
      return newUserId;
    } catch (error) {
      console.log('Hubo un error al crear el usuario:', error);
      throw error;
    }
  }

  // Obtener todos los administradores
  async getAll() {
    const sql = 'SELECT * FROM admins';
    try {
      const admins = await query(sql);
      return admins;
    } catch (error) {
      console.log('Hubo un error al obtener los administradores:', error);
      throw error;
    }
  }

  // Obtener un administrador por su ID
  async getById(id) {
    const sql = `SELECT * FROM admins WHERE id = ?`;
    const values = [id];
    try {
      const [admin] = await query(sql, values);
      return admin;
    } catch (error) {
      console.log(`Hubo un error al obtener el administrador con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener un usuario por su username (listo)
  async getByUsername(username) {
    const sql = `SELECT * FROM users WHERE username_user = ?`;
    const values = [username];
    try {
      const [user] = await query(sql, values);
      return user;
    } catch (error) {
      console.log(`Hubo un error al obtener el administrador con el username ${username}:`, error);
      throw error;
    }
  }

  // Recuperar contraseña de un usuario (listo)
  async updatePasswordById(username, passwrod) {
    const sql = 'UPDATE users SET password_user = ? WHERE username_user = ?';
    const values = [passwrod, username];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(`Hubo un error al recuperar la clave del usuario ${username}:`, error);
      throw error;
    }
  }

  // Eliminar un administrador por su ID
  async deleteById(id) {
    const sql = 'DELETE FROM admins WHERE id = ?';
    const values = [id];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(`Hubo un error al eliminar el administrador con ID ${id}:`, error);
      throw error;
    }
  }
}

const usersModel = new UsersModel();
module.exports = usersModel;