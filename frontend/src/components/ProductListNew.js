import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const ProductListNew = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/productsnew', {
        params: { page, limit, search }
      });
      setProducts(response.data.products);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Ürünler alınırken hata oluştu:', error.message);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl mb-4 text-center font-bold text-blue-700">Ürünler</h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Ürün ara..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map(product => (
            <div key={product.id} className="p-4 border border-gray-300 rounded">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-700">Fiyat: {product.price} TL</p>
              <p className="text-gray-700">Kategori: {product.category}</p>
              <p className="text-gray-700">Stok: {product.quantity}</p>
            </div>
          ))}
        </div>
        <Pagination
          total={total}
          limit={limit}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default ProductListNew;
