const express = require('express');
const router = express.Router();
const CurriculoController = require('../controllers/curriculoController');

router.get('/', CurriculoController.list);
router.post('/', CurriculoController.create);
router.get('/:id', CurriculoController.get);
router.put('/:id', CurriculoController.update);
router.delete('/:id', CurriculoController.delete);

module.exports = router;