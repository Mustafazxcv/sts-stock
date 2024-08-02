import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteProduct.css';

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Ürünleri alırken hata oluştu:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setMessage('Ürün başarıyla silindi.');
      fetchProducts(); // Silme işlemi sonrası ürün listesini güncelle
    } catch (error) {
      console.error('Ürün silinirken hata oluştu:', error);
      setMessage('Ürün silinirken hata oluştu.');
    }
  };

  return (
    <div className="delete-product">
      <h2>Ürün Sil</h2>
      {message && <p>{message}</p>}
      <table className="product-table">
        <thead>
          <tr>
            <th>İsim</th>
            <th>Kategori</th>
            <th>Boyut</th>
            <th>Fiyat</th>
            <th>Adet</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.size}</td>
              <td>{product.price} TL</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteProduct;
