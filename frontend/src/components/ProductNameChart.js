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

const ProductNameChart = ({ productNameCounts = [] }) => {
  const data = {
    labels: productNameCounts.map(product => product.name),
    datasets: [{
      data: productNameCounts.map(product => product.quantity),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6347', '#36EB7D']
    }]
  };

  return (
    <div className="chart-container">
      <h2>Ürün İsimlerine Göre Dağılım</h2>
      <Pie data={data} />
    </div>
  );
};

export default ProductNameChart;
