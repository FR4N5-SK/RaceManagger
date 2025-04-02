const query = require('../../config/query'); // Importamos la función para realizar consultas a la BD

class CategoriesModel {
  // Crear un nuevo atleta
  async add(categorie) {
    const { name } = categorie;
    const sql =
      "INSERT INTO categories (name_categorie) VALUES (?)";
    const values = [name];
    try {
      const response = await query(sql, values);
      const newCategorieId = response.insertId;
      return newCategorieId;
    } catch (error) {
      console.log("Hubo un error al crear la Categoria:", error);
      throw error;
    }
  }

  // Obtener una categoria su ID
  async getByName(name) {
    const sql = `SELECT * FROM categories WHERE name_categorie = ?`;
    const values = [name];
    try {
      const [categoria] = await query(sql, values);
      return categoria;
    } catch (error) {
      console.log(`Hubo un error al obtener la Categoria con el nombre ${name}:`, error);
      throw error;
    }
  }

    // Obtener una categoria su ID
    async getById(id) {
      const sql = `SELECT * FROM categories WHERE id_categorie = ?`;
      const values = [id];
      try {
        const [categoria] = await query(sql, values);
        return categoria;
      } catch (error) {
        console.log(
          `Hubo un error al obtener la Categoria con el id ${id}:`,
          error
        );
        throw error;
      }
    }

  // Eliminar una categoria por su Nombre
  async deleteById(id) {
    const sql = "DELETE FROM categories WHERE id_categorie = ?";
    const values = [id];
    try {
      const response = await query(sql, values);
      if (response.affectedRows > 0) {
        return id;
      }
      return false;
    } catch (error) {
      console.log(
        `Hubo un error al eliminar la categoría con ID ${id}:`,
        error
      );
      throw error;
    }
  }

  // Obtener todos las categorias
  async getAll() {
    const sql = "SELECT * FROM categories";
    try {
      const athletes = await query(sql);
      return athletes;
    } catch (error) {
      console.log("Hubo un error al obtener las categorias:", error);
      throw error;
    }
  }
}

const categoriesModel = new CategoriesModel();
module.exports = categoriesModel;