import React, { useState } from 'react';
import Pagination from './Pagination';

const ProductList = ({ products, category }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = category === 'All'
    ? products
    : products.filter(product => product.category === category);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="product-list">
      <h2>Ürünler</h2>
      <table>
        <thead>
          <tr>
            <th>İsim</th>
            <th>Kategori</th>
            <th>Boyut</th>
            <th>Fiyat</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.size}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default ProductList;
