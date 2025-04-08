const competitionsModel = require("../models/competitons.model"); // Importamos el modelo de administradores
const categoriesModel = require('../models/categories.model');
const athletesModel = require('../models/athletes.model'); // Importamos el modelo de administradores

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
        participants,
        enrolled = 0,
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
        !participants
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
        participants: Number(participants),
        status: "Sin empezar",
        enrolled: enrolled,
      };

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
        participants,
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
        !participants
      ) {
        return res.status(401).json({
          status: 401,
          message: "Faltan propiedades escenciales para editar la competición.",
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
        name: name,
        type: type,
        discipline: discipline,
        dateStart: dateStart,
        dateEnd: dateEnd,
        location: location,
        description: description,
        participants: Number(participants),
      };

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
  // Editar status de una Competición (Terminada)
  async editStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(401).json({
          status: 401,
          message: "Faltan propiedades escenciales para editar la competición.",
        });
      }

      if (
        status != "Sin empezar" &&
        status != "En juego" &&
        status != "Finalizado"
      ) {
        return res.status(401).json({
          status: 401,
          message: "El status no es permitido",
        });
      }

      const competition = await competitionsModel.getById(id);
      if (competition === undefined) {
        return res.status(401).json({
          status: 401,
          message: "La Competición no existe",
        });
      }

      const competitionId = await competitionsModel.editStatus(
        status,
        id
      );
      const NewEditCompetition = await competitionsModel.getById(id);

      res.status(201).json({
        status: 201,
        message: "Competición cambiada de Estado exitosamente a " + status,
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

  // Agregar un Atleta a una Competición (Terminado)
  async addAthleteInCompetition(req, res) {
    try {
      const { athlete, competition } = req.params;

      const result = await competitionsModel.getById(competition);
      if (result === undefined) {
        return res.status(401).json({
          status: 401,
          message: "La Competición no existe",
        });
      }

      const result2 = await athletesModel.getById(athlete);
      if (result2 === undefined) {
        return res.status(401).json({
          status: 401,
          message: "El Atleta no existe",
        });
      }

      if (result.enrolled_competition >= result.participants_competition) {
        return res.status(401).json({
          status: 401,
          message:
            "Ya la competición tiene todos los cupos llenos para atletas",
        });
      }

      let registerAthlete = {
        id_atleta: athlete,
        id_competicion: competition,
        enrolled_competition: Number(result.enrolled_competition) + 1,
      };

      const verifyRegister = await competitionsModel.verifyRegister(
        registerAthlete
      );
      if (verifyRegister) {
        return res.status(401).json({
          status: 401,
          message: "El atleta ya esta registrado a la competición",
        });
      }

      const response = await competitionsModel.registerAthlete(registerAthlete);
      const response2 = await competitionsModel.allRegistrados(competition);

      res.status(201).json({
        status: 201,
        message: "Se agrego el Atleta a la Competición.",
        data: response2,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al Registrar el Atleta a la Competición: ${error.message}`,
      });
    }
  }

  // Agregar el tiempo realizado de un Atleta en una Competición (Terminado)
  async addTimeResult(req, res) {
    try {
      const { athlete, competition } = req.params;
      const { time_result } = req.body;

      if (!time_result) {
        return res.status(401).json({
          status: 401,
          message: "Faltan propiedades escenciales para crear la competición.",
        });
      }

      const result = await competitionsModel.getById(competition);
      if (result === undefined) {
        return res.status(401).json({
          status: 401,
          message: "La Competición no existe",
        });
      }

      if (result.status_competition != "En juego") {
        return res.status(401).json({
          status: 401,
          message: "La Competición actualmente no esta en juego",
        });
      }

      const result2 = await athletesModel.getById(athlete);
      if (result2 === undefined) {
        return res.status(401).json({
          status: 401,
          message: "El Atleta no existe",
        });
      }

      let timeResult = {
        id_atleta: athlete,
        id_competicion: competition,
        time_result: time_result,
      };

      const verifyTimes = await competitionsModel.verifyResult(timeResult);
      if (verifyTimes) {
        return res.status(401).json({
          status: 401,
          message:
            "El atleta ya tiene registrado un tiempo final en la competición",
        });
      }

      const response = await competitionsModel.addTime(timeResult);
      const response2 = await competitionsModel.allTimes(competition);

      res.status(201).json({
        status: 201,
        message: "Se agrego el tiempo del atleta a la Competición.",
        data: {
          time: time_result
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al Registrar el Atleta a la Competición: ${error.message}`,
      });
    }
  }

  // Ver todos los atletas de una competición (Terminado)
  async allAthletesInCompetitions(req, res) {
    try {
      const { competition } = req.params;

      const result = await competitionsModel.getById(competition);
      if (result === undefined) {
        return res.status(401).json({
          status: 401,
          message: "La Competición no existe",
        });
      }

      const registers = await competitionsModel.allRegistrados(competition);

      res.status(201).json({
        status: 201,
        message: "Atletas de la competición listados exitosamente.",
        data: registers,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al listar las atletas de la competición: ${error.message}`,
      });
    }
  }

  // Ver todos los tiempos de atletas de una competición (Terminado)
  async allTimesInCompetition(req, res) {
    try {
      const { competition } = req.params;

      const result = await competitionsModel.getById(competition);
      if (result === undefined) {
        return res.status(401).json({
          status: 401,
          message: "La Competición no existe",
        });
      }

      const times = await competitionsModel.allTimes(competition);

      res.status(201).json({
        status: 201,
        message:
          "Tiempos de los Atletas de la competición listados exitosamente.",
        data: times,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al listar los tiempos de los atletas de la competición: ${error.message}`,
      });
    }
  }
}

const competitionsController = new CompetitionsController();
module.exports = competitionsController;
