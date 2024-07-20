const express = require('express');
const router = express.Router();
const salidaLimpiezaController = require('../controllers/salida_limpieza.controller');

router.get('/getall/salidalimpieza', salidaLimpiezaController.getAllSalidaLimpieza);
router.put('/put/salidalimpieza', salidaLimpiezaController.trx);

module.exports = router;