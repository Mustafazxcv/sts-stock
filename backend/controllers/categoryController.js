const pool = require('../config/db');

const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Kategori adı gereklidir.' });
  }

  try {
    const result = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Kategori ekleme hatası:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const addSize = async (req, res) => {
  const { size } = req.body;

  if (!size) {
    return res.status(400).json({ error: 'Boyut adı gereklidir.' });
  }

  try {
    const result = await pool.query('INSERT INTO sizes (size) VALUES ($1) RETURNING *', [size]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Boyut ekleme hatası:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Kategoriler alınırken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getSizes = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM sizes');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Boyutlar alınırken hata oluştu:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  const deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      await pool.query('DELETE FROM categories WHERE id = $1', [id]);
      res.status(200).json({ message: 'Kategori başarıyla silindi.' });
    } catch (error) {
      console.error('Kategori silme hatası:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteSize = async (req, res) => {
    const { id } = req.params;
  
    try {
      await pool.query('DELETE FROM sizes WHERE id = $1', [id]);
      res.status(200).json({ message: 'Boyut başarıyla silindi.' });
    } catch (error) {
      console.error('Boyut silme hatası:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  const getCategoryDistribution = async (req, res) => {
    try {
      const result = await pool.query('SELECT category, COUNT(*) as count FROM products GROUP BY category');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Kategori dağılımı alınırken hata oluştu:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
module.exports = {
  addCategory,
  addSize,
  getCategories,
  getSizes,
  deleteCategory,
  deleteSize,
  getCategoryDistribution,
};
