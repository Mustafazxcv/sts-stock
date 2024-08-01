import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      toast.success('Giriş başarılı, yönlendiriliyorsunuz...');
      setTimeout(() => {
        navigate('/'); // Başarılı girişten sonra dashboard sayfasına yönlendirme
      }, 3000); // 3 saniye sonra dashboard sayfasına yönlendir
    } catch (err) {
      toast.error('Giriş başarısız. Lütfen e-posta ve şifrenizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center">Admin Giriş</h2>
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
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Yükleniyor...' : 'Giriş Yap'}
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

export default Login;
