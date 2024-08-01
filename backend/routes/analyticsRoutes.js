const express = require('express');
const pool = require('../config/db');
const router = express.Router();

const getProductAnalytics = async (req, res) => {
  try {
    const totalProductsQuery = await pool.query('SELECT COUNT(*) FROM products');
    const categoryCountQuery = await pool.query('SELECT category, COUNT(*) as count FROM products GROUP BY category');
    const productsQuery = await pool.query('SELECT * FROM products');

    const totalProducts = totalProductsQuery.rows[0].count;
    const categoryCounts = categoryCountQuery.rows;
    const products = productsQuery.rows;

    res.status(200).json({ totalProducts, categoryCounts, products });
  } catch (error) {
    console.error('Ürün analizleri alınırken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};

router.get('/analytics', getProductAnalytics);

module.exports = router;
