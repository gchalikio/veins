const express = require('express');
const router = express.Router();
const mongo_controller = require('../controllers/mongo.controller');

router.post('/create',        mongo_controller.create);
router.get('/',               mongo_controller.read);
router.get('/:id',            mongo_controller.readOne);
router.put('/:id/update',     mongo_controller.update);
router.delete('/:id/delete',  mongo_controller.delete);

module.exports = router;