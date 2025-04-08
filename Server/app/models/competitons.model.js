const query = require('../../config/query'); // Importamos la función para realizar consultas a la BD

class CompetitionsModel {
  // Crear una nueva competición (listo)
  async add(competition) {
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
      status,
      enrolled,
    } = competition;
    const sql =
      "INSERT INTO competitions (categorie_competition, status_competition, name_competition, type_competition, discipline_competition, dateStart_competition, dateEnd_competition, location_competition, description_competition, participants_competition, enrolled_competition) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      categorie,
      status,
      name,
      type,
      discipline,
      dateStart,
      dateEnd,
      location,
      description,
      participants,
      enrolled,
    ];
    try {
      const response = await query(sql, values);
      const newCompetitionId = response.insertId;
      return newCompetitionId;
    } catch (error) {
      console.log("Hubo un error al crear la Competición:", error);
      throw error;
    }
  }

  // Registrar atleta a una competicion (listo)
  async registerAthlete(data) {
    const { id_atleta, id_competicion, enrolled_competition } = data;
    console.log(enrolled_competition);
    const sql =
      "INSERT INTO enrolled (id_enrolled, id_athlete, id_competition) VALUES (NULL, ?, ?)";
    const sql2 =
      "UPDATE competitions SET enrolled_competition = ? WHERE id_competition = ?";
    const values = [id_atleta, id_competicion];
    const values2 = [enrolled_competition, id_competicion];
    try {
      const response = await query(sql, values);
      const response2 = await query(sql2, values2);
      const newRelacionId = response.insertId;
      return newRelacionId;
    } catch (error) {
      console.log(
        "Hubo un error al crear la Inscripción del Atleta a la Competición:",
        error
      );
      throw error;
    }
  }

  // Verificar si ya esta inscrito el atleta (listo)
  async verifyRegister(data) {
    const { id_atleta, id_competicion } = data;
    const sql = `SELECT * FROM enrolled WHERE id_athlete = ? AND id_competition = ?`;
    const values = [id_atleta, id_competicion];
    try {
      const [result] = await query(sql, values);
      return result;
    } catch (error) {
      console.log(
        "Hubo un error al crear la Inscripción del Atleta a la Competición:",
        error
      );
      throw error;
    }
  }

  // Verificar si ya esta inscrito el atleta (listo)
  async verifyResult(data) {
    const { id_atleta, id_competicion } = data;
    const sql = `SELECT * FROM results WHERE id_athlete = ? AND id_competition = ?`;
    const values = [id_atleta, id_competicion];
    try {
      const [result] = await query(sql, values);
      return result;
    } catch (error) {
      console.log(
        "Hubo un error al verificar si esta registrado ya un tiempo de este usuario:",
        error
      );
      throw error;
    }
  }

  // agregar un tiempo realizado (listo)
  async addTime(data) {
    const { id_atleta, id_competicion, time_result } = data;
    const sql = `INSERT INTO results (id_athlete, id_competition, time_result) VALUES (?, ?, ?)`;
    const values = [id_atleta, id_competicion, time_result];
    try {
      const response = await query(sql, values);
      const newResultId = response.insertId;
      return newResultId;
    } catch (error) {
      console.log(
        "Hubo un error al registrar el tiempo del competidor:",
        error
      );
      throw error;
    }
  }

  async allRegistrados(idCompeticion) {
    const sql = `SELECT A.id_enrolled, b.id_athlete, B.name_athlete, B.lastname_athlete, B.nation_athlete FROM enrolled A JOIN athletes B ON A.id_athlete = B.id_athlete WHERE id_competition = ?`;
    const values = [idCompeticion];
    try {
      const result = await query(sql, values);
      return result;
    } catch (error) {
      console.log(
        "Hubo un error al listar los atletas registrados de cada competición:",
        error
      );
      throw error;
    }
  }

  async allTimes(idCompeticion) {
    const sql = `SELECT A.id_result, b.id_athlete, B.name_athlete, B.lastname_athlete, B.nation_athlete, A.time_result, A.id_competition FROM results A JOIN athletes B ON A.id_athlete = B.id_athlete WHERE id_competition = ?`;
    const values = [idCompeticion];
    try {
      const result = await query(sql, values);
      return result;
    } catch (error) {
      console.log(
        "Hubo un error al listar los timpos realizados por los atletas en la competicion:",
        error
      );
      throw error;
    }
  }

  // Obtener una Competición por su ID (listo)
  async getById(id) {
    const sql = `SELECT * FROM competitions WHERE id_competition = ?`;
    const values = [id];
    try {
      const [competition] = await query(sql, values);
      return competition;
    } catch (error) {
      console.log(
        `Hubo un error al obtener la Competición con ID ${id}:`,
        error
      );
      throw error;
    }
  }

  // Editar una Competición (listo)
  async edit(competition, id) {
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
    } = competition;
    const sql =
      "UPDATE competitions SET categorie_competition = ?, name_competition = ?, type_competition = ?, discipline_competition = ?, dateStart_competition = ?, dateEnd_competition = ?, location_competition = ?, description_competition = ?, participants_competition = ? WHERE id_competition = ?";
    const values = [
      categorie,
      name,
      type,
      discipline,
      dateStart,
      dateEnd,
      location,
      description,
      participants,
      id,
    ];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(`No se pudo editar la competicion ${name}:`, error);
      throw error;
    }
  }

    // Editar Status de una competicion (listo)
  async editStatus(status, id) {
    const sql =
      "UPDATE competitions SET status_competition = ? WHERE id_competition = ?";
    const values = [status, id];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(`No se pudo editar la competicion`, error);
      throw error;
    }
  }

  // Eliminar un atleta por su ID
  async deleteById(id) {
    const sql = "DELETE FROM competitions WHERE id_competition = ?";
    const values = [id];
    try {
      const response = await query(sql, values);
      if (response.affectedRows > 0) {
        return id;
      }
      return false;
    } catch (error) {
      console.log(`Hubo un error al eliminar el Atletas con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener todas las competiciones
  async getAll() {
    const sql = "SELECT * FROM competitions";
    try {
      const competitions = await query(sql);
      return competitions;
    } catch (error) {
      console.log("Hubo un error al obtener las competiciones:", error);
      throw error;
    }
  }

  // Obtener todas las competiciones
  async getAllType(type) {
    const sql = "SELECT * FROM competitions WHERE type_competition = ?";
    const values = [type];
    try {
      const competitions = await query(sql, values);
      return competitions;
    } catch (error) {
      console.log("Hubo un error al obtener las competiciones:", error);
      throw error;
    }
  }
}

const competitionsModel = new CompetitionsModel();
module.exports = competitionsModel;