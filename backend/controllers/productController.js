const { createProduct } = require('../models/productModel');

const addProduct = async (req, res) => {
  const { name, quantity, size, price, description, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newProduct = await createProduct(name, quantity, size, price, description, imageUrl, category);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Ürün ekleme hatası:', error.message);  // Hata mesajını yazdır
    res.status(500).json({ error: error.message });
  }
};

const getProductAnalytics = async (req, res) => {
  try {
    const totalProductsQuery = await pool.query('SELECT COUNT(*) FROM products');
    const categoryCountQuery = await pool.query('SELECT category, COUNT(*) as count FROM products GROUP BY category');
    const sizeCountQuery = await pool.query('SELECT size, COUNT(*) as count FROM products GROUP BY size');
    const productsQuery = await pool.query('SELECT * FROM products');

    const totalProducts = totalProductsQuery.rows[0].count;
    const categoryCounts = categoryCountQuery.rows;
    const sizeCounts = sizeCountQuery.rows;
    const products = productsQuery.rows;

    res.status(200).json({ totalProducts, categoryCounts, sizeCounts, products });
  } catch (error) {
    console.error('Ürün analizleri alınırken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getProductAnalytics,
};
