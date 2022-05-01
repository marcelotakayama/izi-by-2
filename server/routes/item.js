const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.view)
router.post('/', itemController.find)

router.get('/additem', itemController.form)
router.post('/additem', itemController.create)

router.get('/edititem/:id', itemController.edit)
router.post('/edititem/:id', itemController.update)

router.get('/viewhistorico', itemController.viewhistorico)
router.get('/viewhistorico/:id', itemController.deleteHistorico)
router.get('/buyitem/:id', itemController.buy)

router.get('/:id', itemController.delete)


module.exports = router;