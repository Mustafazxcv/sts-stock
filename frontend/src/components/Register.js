import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Şifreler uyuşmuyor!');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/admin/register', {
        email,
        password,
        phone
      });
      toast.success('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3 saniye sonra giriş sayfasına yönlendir
    } catch (err) {
      toast.error('Kayıt başarısız. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center">Admin Kayıt</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">E-posta</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Şifre</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Şifreyi Onaylayın</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Telefon Numarası</label>
            <input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Yükleniyor...' : 'Kayıt Ol'}
          </button>
        </form>
        <ToastContainer />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <footer className="mt-4 text-center text-gray-500">
        &copy; 2024 Ömer Faruk Seçer. Tüm hakları saklıdır.
      </footer>
    </div>
  );
};

export default Register;
