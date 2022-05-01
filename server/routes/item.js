const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.view)
router.post('/', itemController.find)

router.get('/additem', itemController.form)
router.post('/additem', itemController.create)

router.get('/edititem/:id', itemController.edit)
router.post('/edititem/:id', itemController.update)

router.delete('/:id', itemController.delete)


module.exports = router;