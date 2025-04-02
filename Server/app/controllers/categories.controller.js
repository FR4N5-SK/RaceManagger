const categoriesModel = require('../models/categories.model');
const categorieModel = require('../models/categories.model'); // Importamos el modelo de administradores

class CategoriesController {
  // Crear una nueva categoria (Terminada)
  async add(req, res) {
    try {
      const { name } = req.body;

      const categorieView = await categorieModel.getByName(name);
      if (categorieView != undefined) {
        return res.status(401).json({
          status: 401,
          message: "La Categoria esta repetida",
        });
      }

      // Crear el nuevo Atleta
      const newCategorie = {
        name: name,
      };

      const categorieId = await categorieModel.add(newCategorie);
      const NewCategorie = await categorieModel.getByName(name);

      res.status(201).json({
        status: 201,
        message: "Categoria creada exitosamente.",
        data: NewCategorie,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al crear la categoria: ${error.message}`,
      });
    }
  }

  // Eliminar una categoria (Terminado)
  async delete(req, res) {
    try {
      const { id } = req.params;

      const categorie = await categorieModel.getById(id);
      if (categorie === undefined) {
        return res.status(401).json({
          status: 401,
          message: "La Categoria no existe",
        });
      }

      const categorieId = await categorieModel.deleteById(id);

      res.status(201).json({
        status: 201,
        message: "Categoria eliminada exitosamente.",
        data: categorieId,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al eliminar la Categoria: ${error.message}`,
      });
    }
  }

  // Ver todos las categorias (Terminado)
  async all(req, res) {
    try {
      const { id } = req.params;

      const categories = await categoriesModel.getAll(id);

      res.status(201).json({
        status: 201,
        message: "Categorias Listados exitosamente.",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al listar las Categorias: ${error.message}`,
      });
    }
  }
}

const categoriesController = new CategoriesController();
module.exports = categoriesController;
