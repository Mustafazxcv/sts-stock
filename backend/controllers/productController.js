const pool = require('../config/db'); // Veritabanı bağlantısı

const addProduct = async (req, res) => {
  const { name, quantity, size, price, description, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newProduct = await pool.query(
      'INSERT INTO products (name, quantity, size, price, description, imageUrl, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, quantity, size, price, description, imageUrl, category]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error('Ürün ekleme hatası:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  const { search = '' } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE name ILIKE $1',
      [`%${search}%`]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Ürünler alınırken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getProductAnalytics = async (req, res) => {
  try {
    const totalProductsQuery = await pool.query('SELECT COUNT(*) FROM products');
    const categoryCountQuery = await pool.query('SELECT category, COUNT(*) as count, SUM(quantity) as totalQuantity FROM products GROUP BY category');
    const sizeCountQuery = await pool.query('SELECT size, COUNT(*) as count FROM products GROUP BY size');
    const productNameCountQuery = await pool.query('SELECT name, SUM(quantity) as quantity FROM products GROUP BY name');

    const totalProducts = totalProductsQuery.rows[0].count;
    const categoryCounts = categoryCountQuery.rows;
    const sizeCounts = sizeCountQuery.rows;
    const productNameCounts = productNameCountQuery.rows;

    res.status(200).json({ totalProducts, categoryCounts, sizeCounts, productNameCounts });
  } catch (error) {
    console.error('Ürün analizleri alınırken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};
const getProductsNew = async (req, res) => {
  const { page = 1, limit = 8, search = '' } = req.query;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      `SELECT * FROM products WHERE name ILIKE $1 ORDER BY id LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset]
    );
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM products WHERE name ILIKE $1`,
      [`%${search}%`]
    );
    const total = countResult.rows[0].count;

    res.status(200).json({ products: result.rows, total });
  } catch (error) {
    console.error('Ürünler alınırken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }
    res.status(200).json({ message: 'Ürün başarıyla silindi' });
  } catch (error) {
    console.error('Ürün silinirken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};
const updateProductStock = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const { operation } = req.query;

  try {
    // Mevcut ürün stoğunu kontrol edin
    const productResult = await pool.query('SELECT quantity FROM products WHERE id = $1', [id]);
    const currentQuantity = productResult.rows[0].quantity;

    // Negatif değere düşmesini önleyin
    if (operation === 'decrease' && currentQuantity - quantity < 0) {
      return res.status(400).json({ error: 'Stok miktarı negatif olamaz' });
    }

    let query;
    if (operation === 'increase') {
      query = 'UPDATE products SET quantity = quantity + $1 WHERE id = $2';
    } else if (operation === 'decrease') {
      query = 'UPDATE products SET quantity = quantity - $1 WHERE id = $2';
    } else {
      return res.status(400).json({ error: 'Invalid operation' });
    }

    await pool.query(query, [quantity, id]);
    res.status(200).json({ message: 'Stok güncellendi' });
  } catch (error) {
    console.error('Stok güncellenirken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};
const listProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id'); // Ürünleri id'ye göre sıralayarak alın
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Ürünleri alırken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductAnalytics,
  getProductsNew,
  deleteProduct,
  updateProductStock,
  listProducts,
};
