import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const CategoryChart = ({ categoryCounts = [] }) => {
  if (!categoryCounts || categoryCounts.length === 0) {
    return <div>Veri bulunamadı.</div>;
  }

  const data = {
    labels: categoryCounts.map(category => `${category.category} (${category.totalquantity})`),
    datasets: [{
      data: categoryCounts.map(category => category.totalquantity),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6347', '#36EB7D']
    }]
  };

  return (
    <div className="chart-container">
      <h2>Kategori Dağılımı</h2>
      <Pie data={data} />
    </div>
  );
};

export default CategoryChart;
