const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

// Listar todos los servicios
router.get('/', servicioController.getAllServices);

// Obtener servicio por ID
router.get('/:id', servicioController.getServiceById);

// Crear nuevo servicio
router.post('/', servicioController.createService);

// Actualizar servicio existente
router.put('/:id', servicioController.updateService);

// Eliminar servicio
router.delete('/:id', servicioController.deleteService);

module.exports = router;
