const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// Listar todas las reservas
router.get('/', reservaController.getAllReservations);

// Obtener reserva por ID
router.get('/:id', reservaController.getReservationById);

// Crear nueva reserva
router.post('/', reservaController.createReservation);

// Actualizar reserva existente
router.put('/:id', reservaController.updateReservation);

// Cancelar o eliminar reserva
router.delete('/:id', reservaController.deleteReservation);

router.put('/:id/status', reservaController.updateReservationStatus);

router.get('/all', reservaController.getAllReservationsAdmin);

module.exports = router;
