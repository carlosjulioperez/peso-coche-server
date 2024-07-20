const express = require('express');
const router = express.Router();
const asignacionController = require('../controllers/asignacion.controller');

router.get('/getall/asignacion', asignacionController.getAllAsignacion);
router.put('/put/asignacion', asignacionController.trx);

module.exports = router;