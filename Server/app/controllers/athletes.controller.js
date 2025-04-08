const athletesModel = require('../models/athletes.model'); // Importamos el modelo de administradores

class AthletesController {
  // Crear un nuevo atleta (Terminada)
  async add(req, res) {
    try {
      const { name, lastname, age, weight, phone, sex, email, nation } =
        req.body;

      if (Number(age) <= 0 || Number(age) >= 100) {
        return res.status(401).json({
          status: 401,
          message: "El atleta debe tener una edad entre 1 y 99 Años.",
        });
      }

      if (Number(weight) < 0) {
        return res
          .status(401)
          .json({ status: 401, message: "El atleta debe pesar mas de 0Kg" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(401).json({
          status: 401,
          message: "El atleta debe tener un correo electrónico válido",
        });
      }

      // Crear el nuevo Atleta
      const newAthlete = {
        name: name,
        lastname: lastname,
        age: Number(age),
        weight: Number(weight),
        phone: phone,
        sex: sex,
        email: email,
        nation: nation,
      };
      const athleteId = await athletesModel.add(newAthlete);
      const NewAthlete = await athletesModel.getById(athleteId);

      res.status(201).json({
        status: 201,
        message: "Atleta creado exitosamente.",
        data: NewAthlete,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al crear el Atleta: ${error.message}`,
      });
    }
  }

  // Editar un atleta (Terminada)
  async edit(req, res) {
    try {
      const { id } = req.params;
      const { name, lastname, age, weight, phone, sex, email, nation } =
        req.body;

      if (Number(age) <= 0 || Number(age) >= 100) {
        return res.status(401).json({
          status: 401,
          message: "El atleta debe tener una edad entre 1 y 99 Años.",
        });
      }

      if (Number(weight) < 0) {
        return res
          .status(401)
          .json({ status: 401, message: "El atleta debe pesar mas de 0Kg" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(401).json({
          status: 401,
          message: "El atleta debe tener un correo electrónico válido",
        });
      }

      const athlete = await athletesModel.getById(id);
      if (athlete === undefined) {
        return res.status(401).json({
          status: 401,
          message: "El atleta no existe",
        });
      }

      // Crear el nuevo Atleta
      const newAthlete = {
        name: name,
        lastname: lastname,
        age: Number(age),
        weight: Number(weight),
        phone: phone,
        sex: sex,
        email: email,
        nation: nation,
      };
      const athleteId = await athletesModel.edit(newAthlete, id);
      const newEditAthlete = await athletesModel.getById(id);

      res.status(201).json({
        status: 201,
        message: "Atleta editado exitosamente.",
        data: newEditAthlete,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Error al editado el Atleta: ${error.message}`,
      });
    }
  }

  // Eliminar un atleta (Terminado)
  async delete(req, res) {
    try {
      const { id } = req.params;

      const athlete = await athletesModel.getById(id);
      if (athlete === undefined) {
        return res.status(401).json({
          status: 401,
          message: "El atleta no existe",
        });
      }

      const athleteId = await athletesModel.deleteById(id);

      res.status(201).json({
        status: 201,
        message: "Atleta eliminado exitosamente.",
        data: athleteId,
      });
    } catch (error) {
      if (error.message == "Cannot delete or update a parent row: a foreign key constraint fails (`racemanagger_db`.`enrolled`, CONSTRAINT `athlete` FOREIGN KEY (`id_athlete`) REFERENCES `athletes` (`id_athlete`))") {
        res.status(400).json({
          status: 400,
          message: `No puedes Eliminar un Atleta que esta inscrito en una competicion`,
        }); 
      } else {
        res.status(500).json({
          status: 500,
          message: `Error al eliminar el Atleta: ${error.message}`,
        });
      }

    }
  }

    // Ver todos los atletas (Terminado)
    async all(req, res) {
      try {
        const { id } = req.params;
  
        const athletes = await athletesModel.getAll(id);
  
        res.status(201).json({
          status: 201,
          message: "Atletas Listados exitosamente.",
          data: athletes,
        });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: `Error al listar los Atleta: ${error.message}`,
        });
      }
    }
}

const athletesController = new AthletesController();
module.exports = athletesController;
