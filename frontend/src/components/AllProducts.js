import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import './AllProducts.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: { search: searchQuery }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Ürünleri alırken hata oluştu:', error);
    }
  };

  return (
    <div className="all-products">
      <div className="all-products-container">
        <h2>Tüm Ürünler</h2>
        <div>
          <input
            type="text"
            placeholder="Eklenilen İsime Göre Arama Yapmaktadır."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default AllProducts;
