const express = require('express');
const router = express.Router();
const fbase_controller = require('../controllers/fbase.controller');

router.post('/create',        fbase_controller.create);
router.get('/',               fbase_controller.read);
router.get('/:id',            fbase_controller.readOne);
router.post('/:id/update',    fbase_controller.update);
router.delete('/:id/delete',  fbase_controller.delete);

module.exports = router;