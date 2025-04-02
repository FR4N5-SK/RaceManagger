const competitionsModel = require("../models/competitons.model"); // Importamos el modelo de administradores
const categoriesModel = require('../models/categories.model');

class CompetitionsController {
  // Crear un nueva Competition (Terminada)
  async add(req, res) {
    try {
      const {
        categorie,
        name,
        type,
        discipline,
        dateStart,
        dateEnd,
        location,
        description,
        mode,
        participants,
        rounds,
        eliminated,
        results = {
          podio: "No definido",
        },
      } = req.body;

      if (
        !categorie ||
        !eliminated ||
        !name ||
        !type ||
        !discipline ||
        !dateStart ||
        !dateEnd ||
        !location ||
        !description ||
        !mode ||
        !participants ||
        !rounds ||
        !results
      ) {
        return res.status(401).json({
          status: 401,
          message: "Faltan propiedades escenciales para crear la competición.",
        });
      }

      const categorieView = await categoriesModel.getByName(categorie);
      if (categorieView === undefined) {
        return res.status(401).json({
          status: 401,
          message: "La Categoria no existe",
        });
      }

      if (type != "Torneo" && type != "Competición") {
        return res.status(401).json({
          status: 401,
          message:
            "El tipo de competeción solo permite: (Tonero y Competición).",
        });
      }

      if (
        discipline != "Atletismo" &&
        discipline != "Aguas Abiertas" &&
        discipline != "Natación" &&
        discipline != "Acuatlón" &&
        discipline != "Triatlón"
      ) {
        return res.status(401).json({
          status: 401,
          message:
            "En discplina solo permite: (Atletismo, Aguas Abiertas, Natación, Acuatlón y Triatlón).",
        });
      }

      if (mode != "Liga" && mode != "Eliminación Directa" && mode != "Final") {
        return res.status(401).json({
          status: 401,
          message:
            "En el Modo de competicion solo permite: (Liga, Eliminación Directa y Final).",
        });
      }

      // Creamos la nueva competicion:
      let newCompetition = {
        categorie: categorie,
        name: name,
        type: type,
        discipline: discipline,
        dateStart: dateStart,
        dateEnd: dateEnd,
        location: location,
        description: description,
        mode: mode,
        participants: Number(participants),
        eliminated: Number(eliminated),
        rounds: Number(rounds),
        results: JSON.stringify(results),
      };

      
      if (mode == "Liga" || mode == "Final") {
        newCompetition.eliminated = 0
      }

      const competitionId = await competitionsModel.add(newCompetition);
      const NewCompetition = await competitionsModel.getById(competitionId);

      res.status(201).json({
        status: 201,
        message: "Competición creada exitosamente.",
        data: NewCompetition,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al crear la competición: ${error.message}`,
      });
    }
  }

  // Editar una Competición (Terminada)
  async edit(req, res) {
    try {
      const { id } = req.params;
      const {
        categorie,
        name,
        type,
        discipline,
        dateStart,
        dateEnd,
        location,
        description,
        mode,
        eliminated,
        participants,
        rounds,
      } = req.body;

      if (
        !categorie ||
        !name ||
        !type ||
        !discipline ||
        !dateStart ||
        !dateEnd ||
        !location ||
        !description ||
        !mode ||
        !participants ||
        !rounds
      ) {
        return res.status(401).json({
          status: 401,
          message: "Faltan propiedades escenciales para editar la competición.",
        });
      }
      console.log(req.body)

      const categorieView = await categoriesModel.getByName(categorie);
      if (categorieView === undefined) {
        return res.status(401).json({
          status: 401,
          message: "La Categoria no existe",
        });
      }


      if (type != "Torneo" && type != "Competición") {
        return res.status(401).json({
          status: 401,
          message:
            "El tipo de competeción solo permite: (Tonero y Competición).",
        });
      }

      if (
        discipline != "Atletismo" &&
        discipline != "Aguas Abiertas" &&
        discipline != "Natación" &&
        discipline != "Acuatlón" &&
        discipline != "Triatlón"
      ) {
        return res.status(401).json({
          status: 401,
          message:
            "En discplina solo permite: (Atletismo, Aguas Abiertas, Natación, Acuatlón y Triatlón).",
        });
      }

      if (mode != "Liga" && mode != "Eliminación Directa" && mode != "Final") {
        return res.status(401).json({
          status: 401,
          message:
            "En el Modo de competicion solo permite: (Liga, Eliminación Directa y Final).",
        });
      }

      const competition = await competitionsModel.getById(id);
      if (competition === undefined) {
        return res.status(401).json({
          status: 401,
          message: "La Competición no existe",
        });
      }

      // Creamos la nueva competicion editada:
      let newCompetitionEdit = {
        categorie: categorie,
        eliminated: Number(eliminated),
        name: name,
        type: type,
        discipline: discipline,
        dateStart: dateStart,
        dateEnd: dateEnd,
        location: location,
        description: description,
        mode: mode,
        participants: Number(participants),
        rounds: Number(rounds),
      };

      if (mode == "Liga" || mode == "Final") {
        newCompetitionEdit.eliminated = 0
      }

      const competitionId = await competitionsModel.edit(
        newCompetitionEdit,
        id
      );
      const NewEditCompetition = await competitionsModel.getById(id);

      res.status(201).json({
        status: 201,
        message: "Competición editada exitosamente.",
        data: NewEditCompetition,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al editar la Competición: ${error.message}`,
      });
    }
  }

  // Eliminar una Competición (Terminado)
  async delete(req, res) {
    try {
      const { id } = req.params;

      const competition = await competitionsModel.getById(id);
      if (competition === undefined) {
        return res.status(401).json({
          status: 401,
          message: "La Competición no existe",
        });
      }

      const competitionId = await competitionsModel.deleteById(id);

      res.status(201).json({
        status: 201,
        message: "Competición eliminada exitosamente.",
        data: competitionId,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al eliminar la Competición: ${error.message}`,
      });
    }
  }

  // Ver todas las competiciones (Terminado)
  async all(req, res) {
    try {
      const competitions = await competitionsModel.getAll();

      res.status(201).json({
        status: 201,
        message: "Competiciones y Torneos Listadas exitosamente.",
        data: competitions,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al listar las Competiciones: ${error.message}`,
      });
    }
  }

  // Ver todas las competiciones específicamente Torneos (Terminado)
  async allTournament(req, res) {
    try {
      const type = "Torneo";

      const competitions = await competitionsModel.getAllType(type);

      res.status(201).json({
        status: 201,
        message: "Torneos Listadas exitosamente.",
        data: competitions,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al listar las Competiciones: ${error.message}`,
      });
    }
  }

  // Ver todas las competiciones específicamente Torneos (Terminado)
  async allCompetitions(req, res) {
    try {
      const type = "Competición";

      const competitions = await competitionsModel.getAllType(type);

      res.status(201).json({
        status: 201,
        message: "Competiciones Listadas exitosamente.",
        data: competitions,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al listar las Competiciones: ${error.message}`,
      });
    }
  }
}

const competitionsController = new CompetitionsController();
module.exports = competitionsController;
