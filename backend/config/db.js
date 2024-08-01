const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'inventory',
    password: '1234567890',
    port: 5432
});

module.exports = pool;

// CREATE TABLE admins (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
// CREATE TABLE categories (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(50) UNIQUE NOT NULL,
//     description TEXT
// );
// CREATE TABLE suppliers (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     contact_info TEXT
// );
// CREATE TABLE products (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     description TEXT,
//     price DECIMAL(10, 2) NOT NULL,
//     category_id INTEGER REFERENCES categories(id),
//     supplier_id INTEGER REFERENCES suppliers(id)
// );
// CREATE TABLE inventory (
//     id SERIAL PRIMARY KEY,
//     product_id INTEGER REFERENCES products(id),
//     quantity INTEGER NOT NULL,
//     last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
// CREATE TABLE transactions (
//     id SERIAL PRIMARY KEY,
//     product_id INTEGER REFERENCES products(id),
//     quantity INTEGER NOT NULL,
//     transaction_type VARCHAR(50) NOT NULL,
//     transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
