import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteCategorySize = () => {
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

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
      setCategories(categories.filter(category => category.id !== id));
      toast.success('Kategori başarıyla silindi.');
    } catch (error) {
      toast.error('Kategori silinirken bir hata oluştu.');
    }
  };

  const handleDeleteSize = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/delete-size/${id}`);
      setSizes(sizes.filter(size => size.id !== id));
      toast.success('Boyut başarıyla silindi.');
    } catch (error) {
      toast.error('Boyut silinirken bir hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mb-8">
        <h2 className="text-2xl mb-4 text-center">Kategorileri Sil</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="mb-4 flex justify-between items-center">
              {category.name}
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center">Boyutları Sil</h2>
        <ul>
          {sizes.map((size) => (
            <li key={size.id} className="mb-4 flex justify-between items-center">
              {size.size}
              <button
                onClick={() => handleDeleteSize(size.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    </div>
  );
};

export default DeleteCategorySize;
