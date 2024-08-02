const express = require('express');
const { addProduct, getProducts, getProductAnalytics, getProductsNew, deleteProduct, updateProductStock,listProducts } = require('../controllers/productController');
const upload = require('../config/multer');

const router = express.Router();

router.post('/add', upload.single('image'), addProduct);
router.get('/', getProducts);
router.get('/productsnew', getProductsNew);
router.get('/analytics', getProductAnalytics);
router.get('/products', getProducts);
router.delete('/:id', deleteProduct);
router.put('/update-stock/:id', updateProductStock);
router.get('/list', listProducts);

module.exports = router;
