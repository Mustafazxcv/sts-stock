const pool = require('../config/db');

const createProduct = async (name, quantity, size, price, description, imageUrl, category) => {
  const result = await pool.query(
    'INSERT INTO products (name, quantity, size, price, description, image_url, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [name, quantity, size, price, description, imageUrl, category]
  );
  return result.rows[0];
};

module.exports = {
  createProduct,
};
