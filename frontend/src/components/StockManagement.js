import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockManagement.css';

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/list');
      setProducts(response.data);
    } catch (error) {
      console.error('Ürünleri alırken hata oluştu:', error);
    }
  };

  const updateStock = async (id, operation) => {
    if (quantity[id] <= 0) {
      alert('Geçerli bir stok miktarı girin');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/products/update-stock/${id}?operation=${operation}`, {
        quantity: quantity[id],
      });
      fetchProducts();
    } catch (error) {
      console.error('Kardeşim - Ne Alaka Battın mı ?', error);
      alert('Kardeşim - Ne Alaka Battın mı ?');
    }
  };

  const handleQuantityChange = (id, value) => {
    setQuantity({
      ...quantity,
      [id]: value,
    });
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="stock-management">
      <h2>Stok Giriş / Çıkış Yönetimi</h2>
      <input 
        type="text" 
        placeholder="Ürün adı veya kategori ara..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="search-bar"
      />
      <table>
        <thead>
          <tr>
            <th>İsim</th>
            <th>Kategori</th>
            <th>Boyut</th>
            <th>Fiyat</th>
            <th>Adet</th>
            <th>Stok Miktarı</th>
            <th>Stok Giriş</th>
            <th>Stok Çıkış</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.size}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={quantity[product.id] || ''}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                />
              </td>
              <td>
                <button onClick={() => updateStock(product.id, 'increase')}>+</button>
              </td>
              <td>
                <button onClick={() => updateStock(product.id, 'decrease')}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockManagement;
