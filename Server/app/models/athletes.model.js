const query = require('../../config/query'); // Importamos la función para realizar consultas a la BD

class AthletesModel {
  // Crear un nuevo atleta
  async add(athlete) {
    const { name, lastname, age, weight, phone, sex, email, nation } = athlete;
    const sql =
      "INSERT INTO athletes (name_athlete, lastname_athlete, age_athlete, weight_athlete, phone_athlete, sex_athlete, email_athlete, nation_athlete) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [name, lastname, age, weight, phone, sex, email, nation];
    try {
      const response = await query(sql, values);
      const newAthleteId = response.insertId;
      return newAthleteId;
    } catch (error) {
      console.log("Hubo un error al crear el Atleta:", error);
      throw error;
    }
  }

  // Obtener un atleta por su ID
  async getById(id) {
    const sql = `SELECT * FROM athletes WHERE id_athlete = ?`;
    const values = [id];
    try {
      const [atleta] = await query(sql, values);
      return atleta;
    } catch (error) {
      console.log(`Hubo un error al obtener el atleta con ID ${id}:`, error);
      throw error;
    }
  }

  // Editar un Atleta (listo)
  async edit(athlete, id) {
    const { name, lastname, age, weight, phone, sex, email, nation } = athlete;
    const sql =
      "UPDATE athletes SET name_athlete = ?, lastname_athlete = ?, age_athlete = ?, weight_athlete = ?, phone_athlete = ?, sex_athlete = ?, email_athlete = ?, nation_athlete = ? WHERE id_athlete = ?";
    const values = [name, lastname, age, weight, phone, sex, email, nation, id];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(
        `No se pudo editar el Atleta ${athlete.name + " " + athlete.lastname}:`,
        error
      );
      throw error;
    }
  }

  // Eliminar un atleta por su ID
  async deleteById(id) {
    const sql = "DELETE FROM athletes WHERE id_athlete = ?";
    const values = [id];
    try {
      const response = await query(sql, values);
      if (response.affectedRows > 0) {
        return id;
      }
      return false;
    } catch (error) {
      console.log(
        `Hubo un error al eliminar el Atletas con ID ${id}:`,
        error
      );
      throw error;
    }
  }

  // Obtener todos los atletas
  async getAll() {
    const sql = "SELECT * FROM athletes";
    try {
      const athletes = await query(sql);
      return athletes;
    } catch (error) {
      console.log("Hubo un error al obtener los Atletas:", error);
      throw error;
    }
  }
}

const athletesModel = new AthletesModel();
module.exports = athletesModel;