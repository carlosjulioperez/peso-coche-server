const express = require('express');
const router = express.Router();
const nuevoController = require('../controllers/nuevo.controller');

router.get('/getall/nuevo', nuevoController.getAllNuevo);
router.put('/put/nuevo', nuevoController.putNuevo);

module.exports = router;