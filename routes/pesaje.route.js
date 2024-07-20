const express = require('express');
const router = express.Router();
const pesajeController = require('../controllers/pesaje.controller');

router.get('/getall/pesaje', pesajeController.getAllPesaje);
router.put('/put/pesaje', pesajeController.trx);

module.exports = router;