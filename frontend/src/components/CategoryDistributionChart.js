import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryDistributionChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Kategori Dağılımı',
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      }
    ]
  });

  useEffect(() => {
    fetchCategoryDistribution();
  }, []);

  const fetchCategoryDistribution = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories/distribution');
      const data = response.data;

      const labels = data.map(item => item.category);
      const counts = data.map(item => item.count);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Kategori Dağılımı',
            data: counts,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          }
        ]
      });
    } catch (error) {
      console.error('Kategori dağılımı alınırken hata oluştu:', error.message);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl mb-4 text-center font-bold text-blue-700">Kategori Dağılımı</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default CategoryDistributionChart;
