import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import AddCategory from './components/AddCategory';
import DeleteCategorySize from './components/DeleteCategorySize';
import Layout from './components/Layout';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  if (!token) {
    return (
      <Router>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl mb-4 text-center">Depo Yönetim Sistemi</h1>
            <nav className="mb-4 flex justify-center space-x-4">
              <Link to="/login">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Giriş Yap
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Kayıt Ol
                </button>
              </Link>
            </nav>
            <Routes>
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login setToken={setToken} />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/track-product" element={<h2>Ürün Takip Sayfası</h2>} />
          <Route path="/delete-category-size" element={<DeleteCategorySize />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
