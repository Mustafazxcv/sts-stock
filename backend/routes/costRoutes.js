const express = require('express');
const { calculateCost, getUnits, getCostData, updateUnitPrice, addUnit, deleteCostData, } = require('../controllers/CostCalculator');

const router = express.Router();

router.post('/calculate', calculateCost);
router.get('/units', getUnits);
router.get('/cost-data', getCostData);
router.post('/update-unit-price', updateUnitPrice);
router.post('/add-unit', addUnit);
router.delete('/:id', deleteCostData);

module.exports = router;
