const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

// Listar todos los usuarios → solo admin
router.get('/', verificarToken, soloAdmin, usersController.getUsers);

// Obtener usuario por ID → solo admin
router.get('/:id', verificarToken, soloAdmin, usersController.getUserById);

// Crear nuevo usuario → solo admin
router.post('/', verificarToken, soloAdmin, usersController.createUser);

// Actualizar usuario existente → solo admin
router.put('/:id', verificarToken, soloAdmin, usersController.updateUser);

// Eliminar usuario → solo admin
router.delete('/:id', verificarToken, soloAdmin, usersController.deleteUser);

module.exports = router;
