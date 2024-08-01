import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/categories/add', { name: categoryName });
      toast.success('Kategori başarıyla eklendi!');
      setCategoryName('');
    } catch (err) {
      toast.error('Kategori eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSizeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/categories/add-size', { size });
      toast.success('Boyut başarıyla eklendi!');
      setSize('');
    } catch (err) {
      toast.error('Boyut eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mb-8">
        <h2 className="text-2xl mb-4 text-center">Kategori Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Kategori Adı</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Yükleniyor...' : 'Kategori Ekle'}
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center">Boyut Ekle</h2>
        <form onSubmit={handleSizeSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Boyut</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Yükleniyor...' : 'Boyut Ekle'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddCategory;
