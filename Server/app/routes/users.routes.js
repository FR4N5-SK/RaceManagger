const router = require('express').Router();

// Importar el controlador de administradores
const usersController = require('../controllers/users.controller');

router.post('/register', usersController.add); // Ruta para crear un nuevo usuario
router.post('/login', usersController.login); // Ruta para iniciar sesión
router.post('/repair-password', usersController.repairPassword); // Recuperar Contraseña de un usuario

module.exports = router;