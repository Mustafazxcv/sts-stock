import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        toast.error('Kategoriler yüklenirken bir hata oluştu.');
      }
    };

    const fetchSizes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories/sizes');
        setSizes(response.data);
      } catch (error) {
        toast.error('Boyutlar yüklenirken bir hata oluştu.');
      }
    };

    fetchCategories();
    fetchSizes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('size', size);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Ürün başarıyla eklendi!');
      setName('');
      setQuantity('');
      setSize('');
      setPrice('');
      setDescription('');
      setCategory('');
      setImage(null);
    } catch (err) {
      toast.error('Ürün eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center">Ürün Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Ürün Adı</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Adet</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Boyut</label>
            <select
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
            >
              <option value="">Boyut Seçin</option>
              {sizes.map((s) => (
                <option key={s.id} value={s.size}>{s.size}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Kategori</label>
            <select
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Kategori Seçin</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fiyat</label>
            <input
              type="number"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Açıklama</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fotoğraf</label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Yükleniyor...' : 'Ürün Ekle'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddProduct;
