import React, { useState } from 'react';
import Pagination from './Pagination';
import './ProductList.css';

const ProductList = ({ products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const itemsPerPage = 5;

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const getTotalQuantity = (category) => {
    return products
      .filter(product => category === 'All' ? true : product.category === category)
      .reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <div className="product-list">
      <div className="filter">
        <label>Kategoriye Göre Filtrele:</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map(category => (
            <option key={category} value={category}>
              {category} ({getTotalQuantity(category)})
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Fotoğraf</th>
            <th>İsim</th>
            <th>Kategori</th>
            <th>Boyut</th>
            <th>Fiyat</th>
            <th>Adet</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(product => (
            <tr key={product.id}>
              <td>
                <img src={`http://localhost:5000${product.imageurl}`} alt={product.name} className="product-image" />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.size}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default ProductList;
