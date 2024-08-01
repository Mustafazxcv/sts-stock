const express = require('express');
const { addCategory, addSize, getCategories, getSizes, deleteCategory, deleteSize } = require('../controllers/categoryController');

const router = express.Router();

router.post('/add', addCategory);
router.post('/add-size', addSize);
router.get('/', getCategories);
router.get('/sizes', getSizes);
router.delete('/delete/:id', deleteCategory);
router.delete('/delete-size/:id', deleteSize);

module.exports = router;
