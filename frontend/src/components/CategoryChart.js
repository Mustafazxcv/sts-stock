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

const CategoryChart = ({ categoryCounts }) => {
  const data = {
    labels: categoryCounts.map(category => category.name),
    datasets: [{
      data: categoryCounts.map(category => category.count),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
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
