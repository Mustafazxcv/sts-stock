const express = require('express');
const { addProduct } = require('../controllers/productController');
const upload = require('../config/multer');

const router = express.Router();

router.post('/add', upload.single('image'), addProduct);

module.exports = router;
