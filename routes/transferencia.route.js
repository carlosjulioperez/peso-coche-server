const express = require('express');
const router = express.Router();
const transferenciaController = require('../controllers/transferencia.controller');

router.get('/getall/transferencia', transferenciaController.getAllTransferencia);
router.put('/put/transferencia', transferenciaController.trx);

module.exports = router;