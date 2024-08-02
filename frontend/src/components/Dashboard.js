import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import CategoryChart from './CategoryChart';
import SizeChart from './SizeChart';
import ProductList from './ProductList';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState({ categoryCounts: [], sizeCounts: [] });

  useEffect(() => {
    fetchProducts();
    fetchAnalytics();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Ürünleri alırken hata oluştu:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Analiz verilerini alırken hata oluştu:', error);
      setAnalytics({ categoryCounts: [], sizeCounts: [] });
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>İş Yönetim Sistemi</h1>
      </header>
      <section className="analytics">
        <CategoryChart categoryCounts={analytics.categoryCounts} />
        <SizeChart sizeCounts={analytics.sizeCounts} />
      </section>
      <section className="products">
        <ProductList products={products} />
      </section>
    </div>
  );
};

export default Dashboard;
