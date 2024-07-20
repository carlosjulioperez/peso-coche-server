const express = require('express');
const router = express.Router();
const taraController = require('../controllers/tara.controller');

router.get('/getall/tara', taraController.getAllTara);
router.put('/put/tara', taraController.putTara);

module.exports = router;