const query = require('../../config/query'); // Importamos la función para realizar consultas a la BD

class CompetitionsModel {
  // Crear una nueva competición (listo)
  async add(competition) {
    const {
      categorie,
      eliminated,
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
      results,
    } = competition;
    const sql =
      "INSERT INTO competitions (categorie_competition, eliminated_competition, name_competition, type_competition, discipline_competition, dateStart_competition, dateEnd_competition, location_competition, description_competition, mode_competition, participants_competition, rounds_competition, results_competition) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      categorie,
      eliminated,
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
      results,
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
      eliminated,
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
    } = competition;
    const sql =
      "UPDATE competitions SET categorie_competition = ?, eliminated_competition = ?, name_competition = ?, type_competition = ?, discipline_competition = ?, dateStart_competition = ?, dateEnd_competition = ?, location_competition = ?, description_competition = ?, mode_competition = ?, participants_competition = ?, rounds_competition = ? WHERE id_competition = ?";
    const values = [
      categorie,
      eliminated,
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