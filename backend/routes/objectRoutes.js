const express = require('express');
const router = express.Router();
const { addObject, getObjects, updateObject, deleteObject } = require('../controllers/objectController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes protégées par JWT
router.post('/', authMiddleware, addObject);
router.get('/', authMiddleware, getObjects);
router.put('/:id', authMiddleware, updateObject);
router.delete('/:id', authMiddleware, deleteObject);

module.exports = router;
