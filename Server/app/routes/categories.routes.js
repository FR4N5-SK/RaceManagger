const router = require('express').Router();

// Importar el controlador de competiciones
const categoriesController = require('../controllers/categories.controller');

router.post('/add', categoriesController.add); // Ruta para crear una nueva competición
router.delete('/delete/:id', categoriesController.delete); // Ruta para editar una competición
router.get('/all', categoriesController.all); // Ruta para ver todas las competiciones

module.exports = router;