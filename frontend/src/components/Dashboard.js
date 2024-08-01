import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryChart from './CategoryChart';
import SizeChart from './SizeChart';
import ProductList from './ProductList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [sizeCounts, setSizeCounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('All');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/analytics');
        setTotalProducts(response.data.totalProducts);
        setCategoryCounts(response.data.categoryCounts || []);
        setSizeCounts(response.data.sizeCounts || []);
      } catch (error) {
        toast.error("Veri alınırken bir hata oluştu.");
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        toast.error("Ürünler alınırken bir hata oluştu.");
      }
    };

    fetchAnalytics();
    fetchProducts();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="analytics">
        <CategoryChart categoryCounts={categoryCounts} />
        <SizeChart sizeCounts={sizeCounts} />
      </div>
      <ProductList products={products} category={currentCategory} />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
