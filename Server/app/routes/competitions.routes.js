const router = require('express').Router();

// Importar el controlador de competiciones
const competitionsController = require('../controllers/competitions.controller');

router.post('/add', competitionsController.add); // Ruta para crear una nueva competición
router.put('/edit/:id', competitionsController.edit); // Ruta para editar una competición
router.delete('/delete/:id', competitionsController.delete); // Ruta para editar una competición
router.get('/all', competitionsController.all); // Ruta para ver todas las competiciones
router.get('/all/tournament', competitionsController.allTournament); // Ruta para ver todas las competiciones
router.get('/all/competition', competitionsController.allCompetitions); // Ruta para ver todas las competiciones
router.post('/register/competition-athlete/:athlete/:competition', competitionsController.addAthleteInCompetition);
router.get('/all/competition-athlete/:competition', competitionsController.allAthletesInCompetitions);
router.post('/register/result-athlete/:athlete/:competition', competitionsController.addTimeResult);
router.get('/all/result-athlete/:competition', competitionsController.allTimesInCompetition);
router.put('/edit/status/:id', competitionsController.editStatus);

module.exports = router;