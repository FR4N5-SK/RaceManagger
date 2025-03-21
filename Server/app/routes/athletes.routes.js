const router = require('express').Router();

// Importar el controlador de atletas
const athletesController = require('../controllers/athletes.controller');

router.post('/add', athletesController.add); // Ruta para crear un nuevo atleta
router.put('/edit/:id', athletesController.edit); // Ruta para editar un atleta
router.delete('/delete/:id', athletesController.delete); // Ruta para editar un atleta
router.get('/all', athletesController.all); // Ruta para editar un atleta

module.exports = router;