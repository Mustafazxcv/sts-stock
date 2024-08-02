import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        <div className="flex-1 p-10">
          <button
            onClick={toggleMenu}
            className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded z-50"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <Outlet />
        </div>
        <div
          className={`fixed top-0 right-0 w-64 bg-gray-800 text-white h-full shadow-md transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 z-40`}
        >
          <nav className="mt-4">
            <ul>
              <li className="p-4 border-b border-gray-700">
                <Link to="/" className="hover:text-gray-300" onClick={toggleMenu}>Ana Sayfa</Link>
              </li>
              <li className="p-4 border-b border-gray-700">
                <Link to="/add-product" className="hover:text-gray-300" onClick={toggleMenu}>Ürün Ekle</Link>
              </li>
              <li className="p-4 border-b border-gray-700">
                <Link to="/add-category" className="hover:text-gray-300" onClick={toggleMenu}>Kategori Ekle</Link>
              </li>
              <li className="p-4 border-b border-gray-700">
                <Link to="/delete-category-size" className="hover:text-gray-300" onClick={toggleMenu}>Kategori ve Boyut Sil</Link>
              </li>
              <li className="p-4 border-b border-gray-700">
                <Link to="/cost-calculator" className="hover:text-gray-300" onClick={toggleMenu}>Maliyet Hesapla</Link>
              </li>
              <li className="p-4 border-b border-gray-700">
                <Link to="/delete-product" className="hover:text-gray-300" onClick={toggleMenu}>Ürün Sil</Link>
              </li>
              <li className="p-4 border-b border-gray-700">
                <Link to="/stock-management" className="hover:text-gray-300" onClick={toggleMenu}>Stok Yönetimi</Link>
              </li>
              <li className="p-4 border-b border-gray-700">
                <Link to="/all-products" className="hover:text-gray-300" onClick={toggleMenu}>Tüm Ürünler</Link>
              </li>
              <li className="p-4 border-b border-gray-700">
                <button className="hover:text-gray-300" onClick={handleLogout}>Çıkış Yap</button>
              </li>
              <br></br>
              <center>
              <footer className="p-4 border-b border-gray-700">
        &copy; 2024 Ömer Faruk Seçer. Tüm hakları saklıdır.
      </footer>
              </center>
            </ul>
          </nav>
        </div>
      </div>
      <footer className="mt-4 text-center text-gray-500 p-4 bg-gray-100 w-full">
        &copy; 2024 Ömer Faruk Seçer. Tüm hakları saklıdır.
      </footer>
    </div>
  );
};

export default Layout;
